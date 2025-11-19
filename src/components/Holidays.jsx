import { useQuery } from "@tanstack/react-query";
import { fetchSingleEmployee } from "../services/http";
import { useNavigate } from "react-router-dom";
import Error from "../pages/Error";
import { getCurrentUserId, getCurrentUser } from "../services/authService";
import { calculateAvailableDays } from "../services/holidayService";
import HolidayStatusGroup from "./Holidays/HolidayStatusGroup";

function Holidays() {
  const navigate = useNavigate();
  const userId = getCurrentUserId();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employees", userId],
    queryFn: ({ signal, queryKey }) =>
      fetchSingleEmployee({ id: queryKey[1], signal }),
    enabled: !!userId,
  });

  const handleBookHoliday = () => {
    const username = getCurrentUser();
    navigate(`/${username}/book-holiday`);
  };

  if (isLoading) {
    return (
      <div className="container p-4">
        <div className="text-center">
          <h3>Loading your holiday information...</h3>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container p-4">
        <Error
          title="An error occurred"
          message={error?.info?.message || "Failed to fetch holiday information."}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container p-4">
        <p>No data available.</p>
      </div>
    );
  }

  const totalDays = data.daysOfHolidays || 28;
  const availableDays = calculateAvailableDays(totalDays, data.holidays);
  const usedDays = totalDays - availableDays;

  const holidays = Array.isArray(data.holidays) ? data.holidays : [];
  const requestedHolidays = holidays.filter(
    (h) => (h.status || "requested") === "requested"
  );
  const acceptedHolidays = holidays.filter((h) => h.status === "accepted");
  const declinedHolidays = holidays.filter((h) => h.status === "declined");

  return (
    <div className="container p-4">
      {/* Header Card */}
      <div className="card shadow mb-4">
        <div className="card-body d-flex flex-row justify-content-between align-items-center p-4">
          <div>
            <h2 className="mb-1">
              {data.name} {data.surname}
            </h2>
            {data.department && (
              <p className="text-muted mb-0">{data.department}</p>
            )}
          </div>
          <button
            className="btn btn-primary rounded-pill px-4 py-2"
            onClick={handleBookHoliday}
          >
            <i className="bi bi-plus-circle me-2"></i>Book Holiday
          </button>
        </div>
      </div>

      {/* Available Days Card */}
      <div className="card shadow mb-4">
        <div className="card-body p-4">
          <h4 className="mb-4">Available Holiday Days</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                >
                  {availableDays}
                </div>
                <div>
                  <p className="mb-0 text-muted small">Available</p>
                  <h5 className="mb-0">
                    {availableDays} / {totalDays} days
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div
                  className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                >
                  {usedDays}
                </div>
                <div>
                  <p className="mb-0 text-muted small">Used</p>
                  <h5 className="mb-0">{usedDays} days</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holiday Groups */}
      <HolidayStatusGroup
        title="Requested Holidays"
        holidays={requestedHolidays}
        bgColor="bg-warning"
        textColor="text-dark"
      />
      <HolidayStatusGroup
        title="Accepted Holidays"
        holidays={acceptedHolidays}
        bgColor="bg-success"
      />
      <HolidayStatusGroup
        title="Declined Holidays"
        holidays={declinedHolidays}
        bgColor="bg-danger"
      />

      {/* No Holidays Message */}
      {holidays.length === 0 && (
        <div className="card shadow">
          <div className="card-body p-5 text-center">
            <h4 className="text-muted">No holiday requests yet</h4>
            <p className="text-muted">
              Click the "Book Holiday" button to request your first holiday.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Holidays;
