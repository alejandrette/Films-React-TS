import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./views/IndexPage";
import { Layoyt } from "./layout/Layoyt";
import { Favorites } from "./views/Favorites";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layoyt />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
