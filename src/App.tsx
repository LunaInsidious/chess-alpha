import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Error404 } from "@/components/pages/Error404";
import { Game } from "@/components/pages/Game";
import { Home } from "@/components/pages/Home";
import { AlertProvider } from "@/components/providers/AlertProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { appURL } from "@/config/url";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route path={appURL.error} element={<Error404 />} />
      <Route path={appURL.home} element={<Home />} />
      <Route path={appURL.game} element={<Game />} />
    </Route>,
  ),
);

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
