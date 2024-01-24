import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import DoctorsDetails from "./pages/Doctors/DoctorsDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Protected from "./layout/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { 
        path: "/",
        element: <Home/>
      },
      { 
        path: "/home",
        element: <Home/>
      },
      { path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      { 
        path: '/register',
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      { 
        path: '/doctors',
        element: (
          <Protected authentication>
            <DoctorsDetails/>
          </Protected>
        )
      },
      { 
        path: '/services',
        element: <Services/>
      },
      { 
        path: '/contact',
        element: <Contact/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider  router={router}>
          <ToastContainer
            theme="dark"
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover={false}
            />
          <App />
        </RouterProvider>
    </Provider>
  </React.StrictMode>
);
