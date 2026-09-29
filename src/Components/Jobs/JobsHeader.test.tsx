import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobsHeader from "@/Components/Jobs/JobsHeader";
import { customRender } from "@/__tests__/utils/render";

describe("Тесты по поиску вакансий", () => {
  it("При нажатии по кнопке 'Найти' должен происходить поиск", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsHeader />);

    const input = screen.getByPlaceholderText(
      "Должность или название компании",
    );
    await user.type(input, "KataCorp");
    await user.click(screen.getByText("Найти"));

    await waitFor(() => {
      expect(store.getState().jobsReducer.searchQuery).toBe("KataCorp");
    });
  });

  it("При вводе названия вакансии должны выдаваться соответствующие результаты", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsHeader />);

    const input = screen.getByPlaceholderText(
      "Должность или название компании",
    );
    await user.type(input, "React Developer");
    await user.click(screen.getByText("Найти"));

    await waitFor(() => {
      expect(store.getState().jobsReducer.searchQuery).toBe("React Developer");
    });
  });

  it("Пустая строка должна приниматься как значение при нажатии кнопки с пустым инпутом", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsHeader />);

    await user.click(screen.getByText("Найти"));

    await waitFor(() => {
      expect(store.getState().jobsReducer.searchQuery).toBe("");
    });
  });

  it("Поисковой запрос должен очищаться при пустом поиске", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsHeader />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: "React",
          skills: [],
          city: "Все города",
          isLoading: false,
          error: null,
        },
      },
    });

    const input = screen.getByPlaceholderText(
      "Должность или название компании",
    ) as HTMLInputElement;
    await user.clear(input);
    await user.click(screen.getByText("Найти"));

    await waitFor(() => {
      expect(store.getState().jobsReducer.searchQuery).toBe("");
    });
  });
});
