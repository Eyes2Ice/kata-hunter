import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobsFilters from "@/Components/Jobs/JobsFilters";
import { customRender } from "@/__tests__/utils/render";

describe("Тесты добавления и удаление навыков", () => {
  it("Рендер исходных навыков", async () => {
    const { store } = customRender(<JobsFilters />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: ["JavaScript", "React", "Redux", "Python"],
          city: "Все города",
          isLoading: false,
          error: null,
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Redux")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
    });
    expect(store.getState().jobsReducer.skills).toHaveLength(4);
  });

  it("Навык из инпута должен добавляться по кнопке", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsFilters />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: [],
          city: "Все города",
          isLoading: false,
          error: null,
        },
      },
    });

    const input = screen.getByPlaceholderText("Навык");
    await user.type(input, "TypeScript");
    const addBtn = screen.getByRole("button");
    await user.click(addBtn);

    await waitFor(() => {
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });
    expect(store.getState().jobsReducer.skills).toContain("TypeScript");
  });

  it("Навык должен добавляться по нажатию Enter", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsFilters />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: [],
          city: "Все города",
          isLoading: false,
          error: null,
        },
      },
    });

    const input = screen.getByPlaceholderText("Навык") as HTMLInputElement;
    await user.type(input, "Redux{enter}");

    await waitFor(() => {
      expect(screen.getByText("Redux")).toBeInTheDocument();
    });
    expect(store.getState().jobsReducer.skills).toContain("Redux");
  });

  it("Пустой ввод не должен приводить к изменению состояния", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsFilters />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: ["React"],
          city: "Все города",
          isLoading: false,
          error: null,
        },
      },
    });

    const input = screen.getByPlaceholderText("Навык") as HTMLInputElement;
    const initialState = store.getState().jobsReducer.skills;

    await user.clear(input);
    await user.type(input, "   ");
    await user.click(screen.getByRole("button"));

    const finalState = store.getState().jobsReducer.skills;
    expect(finalState).toEqual(initialState);
  });

  it("Нажатие по кнопке удаления должно приводить к удалению навыка", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsFilters />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: ["JavaScript", "React", "Redux"],
          city: "Все города",
          isLoading: false,
          error: null,
        },
      },
    });

    const reactPill = screen.getByText("React");
    const pillElement = reactPill.closest("li");
    if (pillElement) {
      const removeBtn = pillElement.querySelector("button");
      if (removeBtn) {
        await user.click(removeBtn);
      }
    }

    await waitFor(() => {
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });
    expect(store.getState().jobsReducer.skills).not.toContain("React");
    expect(store.getState().jobsReducer.skills).toContain("JavaScript");
    expect(store.getState().jobsReducer.skills).toContain("Redux");
  });
});

describe("Тесты фильтрации по локации", () => {
  it("Изменение города в селекте должно повлечь изменение соответствующего значения в сторе", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsFilters />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: [],
          city: "Все города",
          isLoading: false,
          error: null,
        },
      },
    });

    const selectTrigger = screen.getByRole("combobox");
    await user.click(selectTrigger);

    await waitFor(() => {
      expect(screen.getByText("Москва")).toBeInTheDocument();
    });
    await user.click(screen.getByText("Москва"));

    await waitFor(() => {
      expect(store.getState().jobsReducer.city).toBe("Москва");
    });
  });

  it("При выборе селекта 'Все города', значение в сторе должно соответствовать", async () => {
    const user = userEvent.setup();
    const { store } = customRender(<JobsFilters />, {
      preloadedState: {
        jobsReducer: {
          jobsList: [],
          searchQuery: null,
          skills: [],
          city: "Москва",
          isLoading: false,
          error: null,
        },
      },
    });

    const selectTrigger = screen.getByRole("combobox");
    await user.click(selectTrigger);

    await waitFor(() => {
      expect(screen.getByText("Все города")).toBeInTheDocument();
    });
    await user.click(screen.getByText("Все города"));

    await waitFor(() => {
      expect(store.getState().jobsReducer.city).toBe("Все города");
    });
  });
});
