import "./App.css";
import Layout from "./Components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SingleJobPage from "./pages/single-job";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path=":id" element={<SingleJobPage />} />
      </Route>
    </Routes>
  );
}

export default App;
