import { describe, expect, it } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/__tests__/utils/render";

function getSearchParams(search: string) {
  return new URLSearchParams(search);
}

describe("Фильтрация вакансий", () => {
  describe("Поиск", () => {
    it("фильтрует список по компании и сохраняет запрос в URL", async () => {
      const user = userEvent.setup();
      const { router } = renderApp("/vacancies/moscow");

      await screen.findByText("Junior Frontend Developer");

      const searchInput = screen.getByPlaceholderText(
        "Должность или название компании",
      );

      await user.type(searchInput, "KataCorp");
      await user.click(screen.getByRole("button", { name: "Найти" }));

      await waitFor(() => {
        expect(
          screen.getByText("Junior Frontend Developer"),
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Senior Python Developer"),
        ).not.toBeInTheDocument();
        expect(
          getSearchParams(router.state.location.search).get("searchQuery"),
        ).toBe("KataCorp");
      });
    });

    it("очистка поиска возвращает полный список и убирает параметр", async () => {
      const user = userEvent.setup();
      const { router } = renderApp(
        "/vacancies/moscow?searchQuery=KataCorp",
      );

      await screen.findByText("Junior Frontend Developer");

      const searchInput = screen.getByPlaceholderText(
        "Должность или название компании",
      );

      await waitFor(() => expect(searchInput).toHaveValue("KataCorp"));

      await user.clear(searchInput);
      await user.click(screen.getByRole("button", { name: "Найти" }));

      await waitFor(() => {
        expect(
          screen.getByText("Senior Python Developer"),
        ).toBeInTheDocument();
        expect(
          getSearchParams(router.state.location.search).get("searchQuery"),
        ).toBeNull();
      });
    });
  });

  describe("Навыки", () => {
    it("показывает навыки по умолчанию и не добавляет город в URL", async () => {
      const { router } = renderApp("/vacancies/moscow");

      await screen.findByText("Junior Frontend Developer");

      await waitFor(() => {
        const params = getSearchParams(router.state.location.search);

        expect(params.getAll("skills")).toEqual([
          "JavaScript",
          "React",
          "Redux",
          "Python",
        ]);
        expect(params.has("city")).toBe(false);
      });

      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Redux")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
    });

    it("добавляет навык по кнопке, фильтрует список и обновляет URL", async () => {
      const user = userEvent.setup();
      const { router } = renderApp("/vacancies/moscow?skills=React");

      await screen.findByText("Junior Frontend Developer");
      expect(
        screen.queryByText("Senior Python Developer"),
      ).not.toBeInTheDocument();

      await user.type(screen.getByPlaceholderText("Навык"), "TypeScript");
      await user.click(
        screen.getByRole("button", { name: "Добавить навык" }),
      );

      await waitFor(() => {
        const params = getSearchParams(router.state.location.search);
        const skills = params.getAll("skills");

        expect(
          screen.getByText("Senior Python Developer"),
        ).toBeInTheDocument();
        expect(skills).toContain("React");
        expect(skills).toContain("TypeScript");
      });
    });

    it("добавляет навык по Enter с обрезкой пробелов и без дублей", async () => {
      const user = userEvent.setup();
      const { router } = renderApp("/vacancies/moscow?skills=React");

      await screen.findByText("Junior Frontend Developer");

      const skillInput = screen.getByPlaceholderText("Навык");

      await user.type(skillInput, "  TypeScript  {enter}");

      await waitFor(() => {
        const skills = getSearchParams(
          router.state.location.search,
        ).getAll("skills");

        expect(skills).toEqual(["React", "TypeScript"]);
      });

      await user.type(skillInput, "TypeScript{enter}");

      await waitFor(() => {
        const skills = getSearchParams(
          router.state.location.search,
        ).getAll("skills");

        expect(skills).toEqual(["React", "TypeScript"]);
      });
    });

    it("не добавляет пустой навык", async () => {
      const user = userEvent.setup();
      const { router } = renderApp("/vacancies/moscow?skills=React");

      await screen.findByText("Junior Frontend Developer");

      await user.type(screen.getByPlaceholderText("Навык"), "   ");
      await user.click(
        screen.getByRole("button", { name: "Добавить навык" }),
      );

      await waitFor(() => {
        const skills = getSearchParams(
          router.state.location.search,
        ).getAll("skills");

        expect(skills).toEqual(["React"]);
      });
    });

    it("удаляет навык, обновляет список и URL", async () => {
      const user = userEvent.setup();
      const { router } = renderApp("/vacancies/moscow?skills=React");

      await screen.findByText("Junior Frontend Developer");
      expect(
        screen.queryByText("Senior Python Developer"),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: "Удалить навык React" }),
      );

      await waitFor(() => {
        const params = getSearchParams(router.state.location.search);

        expect(
          screen.getByText("Senior Python Developer"),
        ).toBeInTheDocument();
        expect(params.has("skills")).toBe(false);
      });
    });
  });

  describe("Города", () => {
    it("переключает город, фильтрует список и сохраняет фильтры", async () => {
      const user = userEvent.setup();
      const { router } = renderApp(
        "/vacancies/moscow?searchQuery=Developer&skills=React",
      );

      await screen.findByText("Junior Frontend Developer");

      const moscowTab = screen.getByRole("tab", { name: "Москва" });
      const petersburgTab = screen.getByRole("tab", {
        name: "Санкт-Петербург",
      });

      expect(moscowTab).toHaveAttribute("aria-selected", "true");
      expect(petersburgTab).toHaveAttribute("aria-selected", "false");
      expect(
        screen.queryByText("Middle React Developer"),
      ).not.toBeInTheDocument();

      await user.click(petersburgTab);

      await waitFor(() => {
        expect(router.state.location.pathname).toBe("/vacancies/petersburg");
        expect(
          screen.getByText("Middle React Developer"),
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Junior Frontend Developer"),
        ).not.toBeInTheDocument();
      });

      expect(petersburgTab).toHaveAttribute("aria-selected", "true");
      expect(moscowTab).toHaveAttribute("aria-selected", "false");

      const params = getSearchParams(router.state.location.search);
      expect(params.get("searchQuery")).toBe("Developer");
      expect(params.getAll("skills")).toEqual(["React"]);
      expect(params.has("city")).toBe(false);
    });

    it("показывает город из прямого URL", async () => {
      renderApp("/vacancies/petersburg");

      const job = await screen.findByText("Middle React Developer");
      const card = job.closest("li");

      expect(card).not.toBeNull();
      expect(within(card as HTMLElement).getByText("Санкт-Петербург")).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: "Санкт-Петербург" }),
      ).toHaveAttribute("aria-selected", "true");
      expect(
        screen.queryByText("Junior Frontend Developer"),
      ).not.toBeInTheDocument();
    });
  });
});
