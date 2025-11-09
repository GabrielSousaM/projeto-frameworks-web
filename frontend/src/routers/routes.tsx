import { BrowserRouter, Route, Routes } from "react-router";
import { RegisterMoviePage } from "../pages/RegisterMoviePage";
import { MovieListPage } from "../pages/MovieListPage";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterMoviePage />} />
        <Route path="/list/" element={<MovieListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
