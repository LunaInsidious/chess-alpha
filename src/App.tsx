import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { AlertProvider } from "@/components/providers/AlertProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { appURL } from "@/config/url";
import { LoginPage } from "@/pages/Login";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route path={appURL.login} element={<LoginPage />} />
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
