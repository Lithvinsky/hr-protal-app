import DateFormatter from "../UI/DateFormatter";
import StatusBadge from "../UI/StatusBadge";

/**
 * Holiday Card Component
 */
function HolidayCard({ holiday, index = 0 }) {
  const status = holiday.status || "requested";

  return (
    <div className={`list-group-item ${index > 0 ? "mt-2" : ""}`}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-2">
            <strong className="me-2">
              <DateFormatter dateString={holiday.startDate} />
            </strong>
            <span className="text-muted">to</span>
            <strong className="ms-2">
              <DateFormatter dateString={holiday.endDate} />
            </strong>
          </div>
          <div className="mb-1">
            <span className="badge bg-secondary me-2">
              {holiday.daysUsed} days
            </span>
            {holiday.reason && (
              <span className="text-muted small">
                <i className="bi bi-info-circle"></i> {holiday.reason}
              </span>
            )}
          </div>
          {holiday.requestedDate && (
            <p className="text-muted small mb-0">
              Requested: <DateFormatter dateString={holiday.requestedDate} />
            </p>
          )}
          {holiday.declineReason && status === "declined" && (
            <p className="text-danger small mb-0 mt-1">
              <strong>Reason:</strong> {holiday.declineReason}
            </p>
          )}
        </div>
        <StatusBadge status={status} className="rounded-pill px-3 py-2 ms-3" />
      </div>
    </div>
  );
}

export default HolidayCard;

