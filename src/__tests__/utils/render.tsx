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
import type { ReactElement } from "react";

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

function TestWrapper({
  children,
  store,
  preloadedState,
}: {
  children: React.ReactNode;
  store?: AppStore;
  preloadedState?: Partial<RootState>;
}) {
  const testStore = store || setupStore(preloadedState ?? {});

  return (
    <Provider store={testStore}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </Provider>
  );
}

export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {},
): RenderResult & { store: AppStore } {
  const store = options.store || setupStore(options.preloadedState ?? {});

  const result = render(ui, {
    wrapper: ({ children }) => (
      <TestWrapper store={store} preloadedState={options.preloadedState}>
        {children}
      </TestWrapper>
    ),
    ...options,
  });

  return { ...result, store };
}

export * from "@testing-library/react";
