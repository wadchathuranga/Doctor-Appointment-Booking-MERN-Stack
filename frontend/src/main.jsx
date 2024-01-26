import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import DoctorsDetails from "./pages/Doctors/DoctorsDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Protected from "./layout/AuthLayout.jsx";
import MyAccount from "./dashboard/user_dashboard/MyAccount.jsx";
import Dashboard from "./dashboard/doctor_dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/register",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/doctors",
        element: (
          <Protected authentication>
            <DoctorsDetails />
          </Protected>
        ),
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/users/profile/me",
        element: (
          <Protected authentication>
            <MyAccount />
          </Protected>
        ),
      },
      {
        path: "doctors/profile/me",
        element: (
          <Protected authentication>
            <Dashboard />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
       
    </Provider>
  </React.StrictMode>
);
