import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/__tests__/utils/render";

describe("Маршрутизация приложения", () => {
  it("перенаправляет с корневого маршрута на вакансии Москвы", async () => {
    const { router } = renderApp("/");

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/vacancies/moscow");
    });

    expect(screen.getByText(".FrontEnd")).toBeInTheDocument();
    expect(screen.getByText(/Список вакансий/)).toBeInTheDocument();
    expect(screen.getByText("Ключевые навыки")).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Москва" }),
    ).toHaveAttribute("aria-selected", "true");

    expect(
      await screen.findByText("Junior Frontend Developer"),
    ).toBeInTheDocument();
  });

  it("показывает 404 и возвращает на главную", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/unknown");

    expect(
      screen.getByRole("heading", { name: /Упс!/ }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "На главную" }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/vacancies/moscow");
    });

    expect(screen.getByText(".FrontEnd")).toBeInTheDocument();
    expect(
      await screen.findByText("Junior Frontend Developer"),
    ).toBeInTheDocument();
  });
});
