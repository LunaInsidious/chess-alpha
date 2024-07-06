import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RecoilRoot } from "recoil";

import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Error404 } from "@/components/pages/Error404";
import { Game } from "@/components/pages/Game";
import { Home } from "@/components/pages/Home";
import { PlayerRole } from "@/components/pages/PlayerRole";
import { Setup } from "@/components/pages/Setup";
import { WsChat } from "@/components/pages/WsChat";
import { AlertProvider } from "@/components/providers/AlertProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { appURL } from "@/config/url";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route path={appURL.error} element={<Error404 />} />
      <Route path={appURL.home} element={<Home />} />
      <Route path={appURL.game} element={<Game />} />
      <Route path={appURL.playerSetup} element={<Setup />} />
      <Route path={appURL.playerRole} element={<PlayerRole />} />
      <Route path={appURL.wsChat} element={<WsChat />} />
    </Route>,
  ),
);

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
