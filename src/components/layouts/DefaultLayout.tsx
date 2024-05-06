import { Outlet, ScrollRestoration } from "react-router-dom";

import { DefaultAlert } from "@/components/layouts/DefaultAlert";
import { Header } from "@/components/layouts/Header";

export function DefaultLayout() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main className="w-full text-gray-600">
        <Outlet />
        <DefaultAlert />
      </main>
    </>
  );
}
