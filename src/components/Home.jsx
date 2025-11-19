import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchSingleEmployee, fetchEmployees } from "../services/http";
import {
  getCurrentUser,
  getCurrentUserId,
  getCurrentUserRole,
} from "../services/authService";
import { calculateAvailableDays } from "../services/holidayService";
import Error from "../pages/Error";
import WelcomeCard from "./Home/WelcomeCard";
import UserQuickOverview from "./Home/UserQuickOverview";
import AdminDashboard from "./Home/AdminDashboard";

function Home() {
  const userId = getCurrentUserId();
  const userRole = getCurrentUserRole();
  const username = getCurrentUser();
  const isAdmin = userRole === "admin";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employees", userId],
    queryFn: ({ signal, queryKey }) =>
      fetchSingleEmployee({ id: queryKey[1], signal }),
    enabled: !!userId,
  });

  const { data: allEmployees } = useQuery({
    queryKey: ["employees", "admin-dashboard"],
    queryFn: fetchEmployees,
    enabled: isAdmin,
  });

  let userInfo = null;
  if (data) {
    const totalDays = data.daysOfHolidays || 28;
    const availableDays = calculateAvailableDays(totalDays, data.holidays);
    userInfo = { ...data, availableDays, totalDays };
  }

  // Calculate admin statistics
  let adminStats = null;
  if (isAdmin && allEmployees) {
    const totalEmployees = allEmployees.length;
    const totalHolidayRequests = allEmployees.reduce((count, emp) => {
      if (emp.holidays && Array.isArray(emp.holidays)) {
        return (
          count +
          emp.holidays.filter((h) => (h.status || "requested") === "requested")
            .length
        );
      }
      return count;
    }, 0);
    const totalAcceptedHolidays = allEmployees.reduce((count, emp) => {
      if (emp.holidays && Array.isArray(emp.holidays)) {
        return (
          count + emp.holidays.filter((h) => h.status === "accepted").length
        );
      }
      return count;
    }, 0);
    const departments = [
      ...new Set(allEmployees.map((emp) => emp.department).filter(Boolean)),
    ];

    adminStats = {
      totalEmployees,
      totalHolidayRequests,
      totalAcceptedHolidays,
      departments: departments.length,
    };
  }

  return (
    <>
      <WelcomeCard username={username} userInfo={userInfo} />

      {isLoading && (
        <div className="container p-3 mt-4 card shadow">
          <h5>Loading your information...</h5>
        </div>
      )}

      {isError && (
        <div className="container p-3 mt-4">
          <Error
            title="An error occurred"
            message={error?.info?.message || "Failed to load user information."}
          />
        </div>
      )}

      {userInfo && <UserQuickOverview userInfo={userInfo} />}

      {isAdmin && adminStats ? (
        <AdminDashboard adminStats={adminStats} username={username} />
      ) : (
        <div className="container p-4 mt-4 card shadow">
          <div className="card-body">
            <h5 className="mb-3">
              <i className="bi bi-question-circle me-2"></i>
              Need Help?
            </h5>
            <p>We are here to help you.</p>
            <p>If you have any questions, please contact us.</p>
            <Link to={`/${username}/holidays`} className="btn btn-primary mt-2">
              <i className="bi bi-calendar-plus me-2"></i>
              Book a Holiday
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
