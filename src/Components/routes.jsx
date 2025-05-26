import { createBrowserRouter } from "react-router";
import Register from "./Register";
import Login from "./Login";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
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
      
    ],
  },
]);

export default router;