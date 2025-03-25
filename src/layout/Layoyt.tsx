import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Notification from "../components/Notification";

export function Layoyt() {
  return (
    <>
      <Header />
      <Outlet />
      <Notification />
    </>
  )
}
