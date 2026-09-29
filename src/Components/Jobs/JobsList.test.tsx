import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import JobsList from "@/Components/Jobs/JobsList";
import { customRender } from "@/__tests__/utils/render";
import * as JobsThunk from "@/reducers/JobsThunk";

describe("Тесты списка вакансий", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Во время запроса вакансий к api должен рендерится лоадер", () => {
    customRender(<JobsList />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: [],
          city: "Все города",
          isLoading: true,
          error: null,
        },
      },
    });

    const loader = document.querySelector(".mantine-Loader-root");
    expect(loader).toBeInTheDocument();
  });

  it("При успешном получении данных из аpi должен рендериться список вакансий", async () => {
    const mockJobs = [
      {
        id: 1,
        companyName: "KataCorp",
        name: "Junior Frontend Developer",
        city: "Москва",
        salary: 80000,
        publishedAt: "2024-01-10",
        shortDescription: "Работа над внутренними проектами",
        space: "office",
        skills: ["JavaScript", "React"],
        experience: "Без опыта",
      },
      {
        id: 2,
        companyName: "WebStudio",
        name: "Middle React Developer",
        city: "Санкт-петербург",
        salary: 180000,
        publishedAt: "2024-01-12",
        shortDescription: "Разработка SPA приложений",
        space: "hybrid",
        skills: ["React", "TypeScript", "Redux"],
        experience: "От 2 лет",
      },
    ];

    vi.spyOn(JobsThunk, "fetchJobs").mockImplementation(() => {
      return {
        type: "jobs/fetchJobs/fulfilled",
        payload: mockJobs,
      } as any;
    });

    customRender(<JobsList />);

    await waitFor(() => {
      expect(screen.getByText("Junior Frontend Developer")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Middle React Developer")).toBeInTheDocument();
    });
  });
});
