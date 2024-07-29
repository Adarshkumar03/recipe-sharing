import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

export default function Layout() {
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <div>
        <Header />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
