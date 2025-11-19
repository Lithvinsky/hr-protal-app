import DateFormatter from "../UI/DateFormatter";
import StatusBadge from "../UI/StatusBadge";

/**
 * Professional Information Component
 */
function ProfessionalInfo({ data }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body p-4">
        <h4 className="mb-4">Professional Information</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Department:</strong>
              <span>{data.department || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Hire Date:</strong>
              <span>
                <DateFormatter dateString={data.hireDate} format="long" />
              </span>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Employee ID:</strong>
              <span className="badge bg-secondary">{data.id || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Role:</strong>
              <StatusBadge status={data.role} type="role" />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Days of Holidays:</strong>
              <span>{data.daysOfHolidays || 28}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalInfo;

