import {
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Jobs from "./Components/Jobs/Jobs";
import SingleJobPage from "./pages/single-job";
import Pagenotfound from "./pages/404";

export const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<Layout />}
    errorElement={<h1>Something goes wrong!</h1>}
  >
    <Route index element={<Navigate to="/vacancies/moscow" replace />} />
    <Route path="vacancies/moscow" element={<Jobs city="Москва" />} />
    <Route
      path="vacancies/petersburg"
      element={<Jobs city="Санкт-Петербург" />}
    />
    <Route path="vacancies/:id" element={<SingleJobPage />} />
    <Route path="*" element={<Pagenotfound />} />
  </Route>,
);
