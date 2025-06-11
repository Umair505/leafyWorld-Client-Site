import { createBrowserRouter } from "react-router";
import Register from "./Register";
import Login from "./Login";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import ForgotPassword from "./ForgotPassword";
import ExploreGardeners from "./ExploreGardeners";
import ShareGardenTips from "./ShareGardenTips";
import BrowseTips from "../pages/BrowseTips";
import TipDetails from "../pages/TipDetails";
import MyTips from "../pages/MyTips";

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
      {
        path: '/gardener',
        element: <ExploreGardeners/>,
      },
      {
        path: '/garden-tips',
        element: <ShareGardenTips/>,
      },
      {

        path: '/tips',
        element: <BrowseTips/>,
      },
      {

        path: '/tips/:id',
        element: <TipDetails/>,
      },
      {

        path: '/my-tips',
        element: <MyTips/>,
      },
      
    ],
  },
]);

export default router;