import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/__tests__/utils/render";

describe("Страница «Обо мне»", () => {
  it("отображает информацию о разработчике по маршруту /about", () => {
    renderApp("/about");

    expect(
      screen.getByRole("heading", { name: "Руслан Денисов" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Frontend-разработчик/)).toBeInTheDocument();
    expect(
      screen.getByText(/Пишу приложения на React \+ TypeScript/),
    ).toBeInTheDocument();
  });

  it("открывается по ссылке «Обо мне» в шапке", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/vacancies/moscow");

    await user.click(screen.getByRole("link", { name: "Обо мне" }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/about");
    });

    expect(
      await screen.findByRole("heading", { name: "Руслан Денисов" }),
    ).toBeInTheDocument();
  });
});
