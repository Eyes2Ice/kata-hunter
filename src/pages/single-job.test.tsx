import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { renderApp } from "@/__tests__/utils/render";
import { API_URL } from "@/__tests__/mocks/handlers";
import { moscowJob } from "@/__tests__/mocks/fixtures";
import { server } from "@/__tests__/mocks/server";

describe("Страница вакансии", () => {
  it("показывает лоадер и данные выбранной вакансии", async () => {
    server.use(
      http.get(`${API_URL}/jobs/1`, async () => {
        await delay(50);
        return HttpResponse.json({ job: moscowJob });
      }),
    );

    renderApp("/vacancies/1");

    expect(document.querySelector(".loader")).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Junior Frontend Developer",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("KataCorp")).toBeInTheDocument();
    expect(screen.getByText("Без опыта")).toBeInTheDocument();
    expect(screen.getByText("ОФИС")).toBeInTheDocument();
    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Компания" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Компания, которая делает удобные сервисы."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "О вакансии:" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Разработка интерфейсов на React."),
    ).toBeInTheDocument();
  });
});
