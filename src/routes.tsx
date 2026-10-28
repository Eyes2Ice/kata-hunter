import { createRoutesFromElements, Navigate, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Jobs from "./Components/Jobs/Jobs";
import SingleJobPage from "./pages/single-job";
import Pagenotfound from "./pages/404";
import About from "./pages/about";

export const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<Layout />}
    errorElement={<h1>Something goes wrong!</h1>}
  >
    <Route index element={<Navigate to="/vacancies/moscow" replace />} />
    <Route path="vacancies">
      <Route index element={<Navigate to="/vacancies/moscow" replace />} />
      <Route path="moscow" element={<Jobs city="Москва" />} />
      <Route
        path="petersburg"
        element={<Jobs city="Санкт-Петербург" />}
      />
      <Route path=":id" element={<SingleJobPage />} />
    </Route>
    <Route path="about" element={<About />} />
    <Route path="*" element={<Pagenotfound />} />
  </Route>,
);
