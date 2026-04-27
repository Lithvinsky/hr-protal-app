import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Home from "./components/Home";
import Profiles from "./components/Profiles";
import Profile from "./components/Profile";
import AddProfile from "./components/AddProfile";
import Holidays from "./components/Holidays";
import BookHoliday from "./components/BookHoliday";
import AdminHolidays from "./components/AdminHolidays";
import { queryClient } from "./services/http";
import { getCurrentUser } from "./services/authService";

// Component to handle index route redirect
function IndexRedirect() {
  const { username } = useParams();
  const currentUser = getCurrentUser();
  const targetUser = username || currentUser || "user";
  return <Navigate to={`/${targetUser}/home`} replace />;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/:username",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <IndexRedirect />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "profiles",
          element: (
            <ProtectedRoute>
              <Profiles />
            </ProtectedRoute>
          ),
        },
        {
          path: "profiles/new",
          element: (
            <ProtectedRoute>
              <AddProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile/:userId",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "holidays",
          element: (
            <ProtectedRoute>
              <Holidays />
            </ProtectedRoute>
          ),
        },
        {
          path: "book-holiday",
          element: (
            <ProtectedRoute>
              <BookHoliday />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin-holidays",
          element: (
            <ProtectedRoute>
              <AdminHolidays />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
