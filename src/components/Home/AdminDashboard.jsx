import { Link } from "react-router-dom";

/**
 * Admin Dashboard Component
 */
function AdminDashboard({ adminStats, username }) {
  if (!adminStats) return null;

  return (
    <div className="container p-4 mt-4 card shadow">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Dashboard
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-people-fill fs-1 me-3"></i>
                  <div>
                    <h6 className="mb-0">Total Employees</h6>
                    <h2 className="mb-0">{adminStats.totalEmployees}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-dark h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock-history fs-1 me-3"></i>
                  <div>
                    <h6 className="mb-0">Pending Requests</h6>
                    <h2 className="mb-0">{adminStats.totalHolidayRequests}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill fs-1 me-3"></i>
                  <div>
                    <h6 className="mb-0">Approved Holidays</h6>
                    <h2 className="mb-0">{adminStats.totalAcceptedHolidays}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-building fs-1 me-3"></i>
                  <div>
                    <h6 className="mb-0">Departments</h6>
                    <h2 className="mb-0">{adminStats.departments}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <div className="card border-primary h-100">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="bi bi-clipboard-check me-2"></i>
                  Quick Actions
                </h6>
                <div className="d-grid gap-2">
                  <Link
                    to={`/${username}/admin-holidays`}
                    className="btn btn-warning"
                  >
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Review Pending Requests ({adminStats.totalHolidayRequests})
                  </Link>
                  <Link
                    to={`/${username}/profiles`}
                    className="btn btn-outline-primary"
                  >
                    <i className="bi bi-people me-2"></i>
                    View All Employees
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-success h-100">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="bi bi-info-circle me-2"></i>
                  System Overview
                </h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    <strong>{adminStats.totalEmployees}</strong> active employees
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-calendar-check text-primary me-2"></i>
                    <strong>{adminStats.totalAcceptedHolidays}</strong> approved holidays
                  </li>
                  <li className="mb-0">
                    <i className="bi bi-building text-info me-2"></i>
                    <strong>{adminStats.departments}</strong> departments
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

