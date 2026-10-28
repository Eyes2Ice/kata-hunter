import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import { Provider } from "react-redux";
import type { AppStore, RootState } from "@/store/store";
import { setupStore } from "@/store/store";
import "@mantine/core/styles.css";
import "@/styles/reset.css";
import "@/styles/global.css";
import { MantineProvider, createTheme } from "@mantine/core";
import type { ReactElement, ReactNode } from "react";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "@/routes";

const theme = createTheme({
  fontFamily: `Open Sans, sans-serif`,
  colors: {
    shemeColor: [
      "#edf2ff",
      "#dbe4ff",
      "#bac8ff",
      "#91a7ff",
      "#748ffc",
      "#5c7cfa",
      "#4c6ef5",
      "#4263eb",
      "#3b5bdb",
      "#364fc7",
    ],
  },
});

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

interface RouterRenderOptions extends CustomRenderOptions {
  route?: string;
}

function TestWrapper({
  children,
  store,
}: {
  children: ReactNode;
  store: AppStore;
}) {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </Provider>
  );
}

export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {},
): RenderResult & { store: AppStore } {
  const { preloadedState, store: providedStore, ...renderOptions } = options;
  const store = providedStore || setupStore(preloadedState ?? {});

  const result = render(ui, {
    wrapper: ({ children }) => <TestWrapper store={store}>{children}</TestWrapper>,
    ...renderOptions,
  });

  return { ...result, store };
}

export function renderWithRouter(
  ui: ReactElement,
  options: RouterRenderOptions = {},
): RenderResult & { store: AppStore } {
  const { route = "/vacancies/moscow", ...renderOptions } = options;

  return customRender(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>,
    renderOptions,
  );
}

export function renderApp(
  initialEntries: string | string[] = "/vacancies/moscow",
): RenderResult & {
  store: AppStore;
  router: ReturnType<typeof createMemoryRouter>;
} {
  const entries = Array.isArray(initialEntries)
    ? initialEntries
    : [initialEntries];
  const store = setupStore();
  const router = createMemoryRouter(routes, { initialEntries: entries });

  const result = render(
    <TestWrapper store={store}>
      <RouterProvider router={router} />
    </TestWrapper>,
  );

  return { ...result, store, router };
}

export * from "@testing-library/react";
