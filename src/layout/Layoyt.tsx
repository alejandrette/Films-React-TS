import { Outlet } from "react-router-dom";
import { Header } from "../views/components/Header";

export function Layoyt() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
