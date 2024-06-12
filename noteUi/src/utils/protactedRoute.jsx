import {  Outlet } from "react-router-dom";
import { isUserLoggedIn } from "./auth";
import { useNavigate } from "react-router-dom";

export const ProtactedRoute = () => {
  const navigate = useNavigate();
  const { isTokenExpired } = isUserLoggedIn();
  const loggedin = isTokenExpired;
  if (loggedin) return navigate("login");
  return <Outlet />;
};
