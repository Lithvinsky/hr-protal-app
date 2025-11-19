import { Outlet } from "react-router-dom";
import { getCurrentUserRole } from "../services/authService";

import Navigation from "../components/Navigation";
import AdminNavigation from "../components/AdminNavigation";
import Footer from "../components/Footer";

function RootLayout() {
  const userRole = getCurrentUserRole();

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-between body-hero-img ">
      <div>
        {userRole === "admin" ? <AdminNavigation /> : <Navigation />}

        <main className="container flex-grow mb-3">
          <Outlet />
        </main>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default RootLayout;
