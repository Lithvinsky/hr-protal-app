import DateFormatter from "../UI/DateFormatter";

/**
 * Decline Modal Component
 */
function DeclineModal({
  holiday,
  declineReason,
  isProcessing,
  onReasonChange,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Decline Holiday Request</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Employee:</strong> {holiday.employeeName}
            </p>
            <p>
              <strong>Period:</strong>{" "}
              <DateFormatter dateString={holiday.startDate} /> to{" "}
              <DateFormatter dateString={holiday.endDate} />
            </p>
            <div className="mb-3">
              <label htmlFor="declineReason" className="form-label">
                Reason for decline (optional):
              </label>
              <textarea
                className="form-control"
                id="declineReason"
                rows="3"
                value={declineReason || ""}
                onChange={(e) => onReasonChange(e.target.value)}
                placeholder="Enter reason for declining this holiday request..."
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Decline"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeclineModal;

