import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@/styles/reset.css";
import "@/styles/global.css";
import App from "./App.tsx";
import {
  type MantineColorsTuple,
  createTheme,
  MantineProvider,
  DEFAULT_THEME,
} from "@mantine/core";

const shemeColor: MantineColorsTuple = [
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
];

const theme = createTheme({
  fontFamily: `Open Sans, sans-serif, ${DEFAULT_THEME.fontFamily}`,
  colors: {
    shemeColor,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
