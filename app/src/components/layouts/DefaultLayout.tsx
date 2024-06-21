import { Outlet, ScrollRestoration } from "react-router-dom";

import { DefaultAlert } from "@/components/layouts/DefaultAlert";

export function DefaultLayout() {
  return (
    <>
      <ScrollRestoration />
      <main className="w-full">
        <Outlet />
        <DefaultAlert />
      </main>
    </>
  );
}
