import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { renderApp } from "@/__tests__/utils/render";
import { API_URL } from "@/__tests__/mocks/handlers";
import { server } from "@/__tests__/mocks/server";
import type { ServerJob } from "./Jobs.types";

const PAGE_SIZE = 10;

function createJobs(count: number): ServerJob[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    company_name: `Company ${index + 1}`,
    name: `Frontend Developer ${index + 1}`,
    city: "Москва",
    salary: String(80000 + index),
    published_at: "2024-01-10",
    short_description: "Разработка интерфейсов",
    space: "office",
    skills: "React, TypeScript",
    experience: "Без опыта",
  }));
}

function createPaginatedHandler(jobs: ServerJob[], requests: string[] = []) {
  return http.get(`${API_URL}/jobs`, ({ request }) => {
    requests.push(request.url);

    const url = new URL(request.url);
    const page = Math.max(Number(url.searchParams.get("page")) || 1, 1);
    const limit = Math.max(
      Number(url.searchParams.get("limit")) || PAGE_SIZE,
      1,
    );
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalItems = jobs.length;
    const totalPages = Math.ceil(totalItems / limit);

    return HttpResponse.json({
      success: true,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: endIndex < totalItems,
        hasPrevPage: startIndex > 0,
      },
      jobs: jobs.slice(startIndex, endIndex),
    });
  });
}

describe("Пагинация вакансий", () => {
  it("загружает вторую страницу и сохраняет её в URL", async () => {
    const user = userEvent.setup();
    server.use(createPaginatedHandler(createJobs(12)));

    const { router } = renderApp("/vacancies/moscow?skills=React");

    expect(
      await screen.findByText("Frontend Developer 1"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Frontend Developer 11"),
    ).not.toBeInTheDocument();

    await user.click(await screen.findByRole("button", { name: "2" }));

    await waitFor(() => {
      const params = new URLSearchParams(router.state.location.search);
      expect(params.get("page")).toBe("2");
    });

    expect(
      await screen.findByText("Frontend Developer 11"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Frontend Developer 1"),
    ).not.toBeInTheDocument();
  });

  it("сбрасывает страницу и перезапрашивает данные при смене навыков", async () => {
    const user = userEvent.setup();
    const requests: string[] = [];
    server.use(createPaginatedHandler(createJobs(12), requests));

    const { router } = renderApp(
      "/vacancies/moscow?skills=React&page=2",
    );

    expect(
      await screen.findByText("Frontend Developer 11"),
    ).toBeInTheDocument();

    await user.type(
      screen.getByPlaceholderText("Навык"),
      "TypeScript{enter}",
    );

    await waitFor(() => {
      const params = new URLSearchParams(router.state.location.search);

      expect(params.has("page")).toBe(false);
      expect(params.getAll("skills")).toEqual(["React", "TypeScript"]);
      expect(
        requests.some((requestUrl) => {
          const params = new URL(requestUrl).searchParams;
          return (
            params.get("page") === "1" &&
            params.get("skills") === "React,TypeScript"
          );
        }),
      ).toBe(true);
    });

    expect(
      await screen.findByText("Frontend Developer 1"),
    ).toBeInTheDocument();
  });

  it("сбрасывает страницу и перезапрашивает данные при смене города", async () => {
    const user = userEvent.setup();
    const requests: string[] = [];
    server.use(createPaginatedHandler(createJobs(12), requests));

    const { router } = renderApp(
      "/vacancies/moscow?skills=React&page=2",
    );

    await screen.findByText("Frontend Developer 11");

    await user.click(
      screen.getByRole("tab", { name: "Санкт-Петербург" }),
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/vacancies/petersburg");

      const params = new URLSearchParams(router.state.location.search);
      expect(params.has("page")).toBe(false);
      expect(
        requests.some((requestUrl) => {
          const params = new URL(requestUrl).searchParams;
          return (
            params.get("page") === "1" &&
            params.get("city") === "Санкт-Петербург"
          );
        }),
      ).toBe(true);
    });
  });
});
