import DateFormatter from "../UI/DateFormatter";

/**
 * Holiday Request Card Component
 */
function HolidayRequestCard({
  holiday,
  isProcessing,
  processingStatus,
  onAccept,
  onDecline,
}) {
  return (
    <div className="list-group-item mb-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="flex-grow-1">
              <h5 className="card-title mb-2">
                {holiday.employeeName}
                {holiday.employeeDepartment && (
                  <span className="badge bg-secondary ms-2">
                    {holiday.employeeDepartment}
                  </span>
                )}
              </h5>
              <p className="text-muted small mb-2">{holiday.employeeEmail}</p>

              <div className="mb-2">
                <strong>Holiday Period:</strong>{" "}
                <DateFormatter dateString={holiday.startDate} /> to{" "}
                <DateFormatter dateString={holiday.endDate} />
              </div>

              <div className="mb-2">
                <span className="badge bg-info me-2">
                  {holiday.daysUsed} days
                </span>
                {holiday.reason && (
                  <span className="text-muted">
                    <i className="bi bi-info-circle"></i> {holiday.reason}
                  </span>
                )}
              </div>

              {holiday.requestedDate && (
                <p className="text-muted small mb-0">
                  Requested: <DateFormatter dateString={holiday.requestedDate} />
                </p>
              )}
            </div>

            <div className="d-flex flex-column gap-2 ms-3">
              <button
                className="btn btn-success btn-sm"
                onClick={onAccept}
                disabled={isProcessing}
              >
                {isProcessing && processingStatus === "accepted"
                  ? "Processing..."
                  : "Accept"}
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={onDecline}
                disabled={isProcessing}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HolidayRequestCard;

