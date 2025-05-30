import { createBrowserRouter } from "react-router";
import Register from "./Register";
import Login from "./Login";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import ForgotPassword from "./ForgotPassword";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      
    ],
  },
]);

export default router;