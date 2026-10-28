import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import JobsList from "@/Components/Jobs/JobsList";
import { renderWithRouter } from "@/__tests__/utils/render";
import { API_URL } from "@/__tests__/mocks/handlers";
import { serverJobs } from "@/__tests__/mocks/fixtures";
import { server } from "@/__tests__/mocks/server";

describe("Список вакансий", () => {
  it("показывает лоадер во время запроса", async () => {
    server.use(
      http.get(`${API_URL}/jobs`, async () => {
        await delay(50);
        return HttpResponse.json({ jobs: serverJobs });
      }),
    );

    renderWithRouter(<JobsList city="Москва" />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: [],
          isLoading: true,
          error: null,
        },
      },
    });

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    expect(
      await screen.findByText("Junior Frontend Developer"),
    ).toBeInTheDocument();
  });

  it("рендерит данные вакансии и ссылку на страницу", async () => {
    renderWithRouter(<JobsList city="Москва" />);

    const job = await screen.findByText("Junior Frontend Developer");
    const card = job.closest("li") as HTMLElement;

    const cardQueries = within(card);
    expect(cardQueries.getByText("KataCorp")).toBeInTheDocument();
    expect(cardQueries.getByText(/80\s*000/)).toBeInTheDocument();
    expect(cardQueries.getByText("Без опыта")).toBeInTheDocument();
    expect(cardQueries.getByText("ОФИС")).toBeInTheDocument();
    expect(cardQueries.getByText("Москва")).toBeInTheDocument();
    expect(
      cardQueries.getByRole("link", { name: "Смотреть вакансию" }),
    ).toHaveAttribute("href", "/vacancies/1");

    const remoteJob = await screen.findByText("Senior Python Developer");
    const remoteCard = within(remoteJob.closest("li") as HTMLElement);

    expect(remoteCard.getByText("DataLab")).toBeInTheDocument();
    expect(remoteCard.getByText("Опыт: От 3 лет")).toBeInTheDocument();
    expect(remoteCard.getByText("МОЖНО УДАЛЁННО")).toBeInTheDocument();
    expect(
      screen.queryByText("Middle React Developer"),
    ).not.toBeInTheDocument();
  });
});
