import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import App from "@/App";
import { customRender } from "@/__tests__/utils/render";

describe("App", () => {
  it("Приложение должно полностью рендериться", () => {
    customRender(<App />);

    expect(screen.getByText(".FrontEnd")).toBeInTheDocument();
    expect(screen.getByText(/список вакансий/i)).toBeInTheDocument();
    expect(screen.getByText("Ключевые навыки")).toBeInTheDocument();
  });
});
