import StatusBadge from "../UI/StatusBadge";
import HrLogo from "../brand/HrLogo.jsx";

/**
 * Welcome Card Component
 */
function WelcomeCard({ username, userInfo }) {
  return (
    <div className="container p-4 mt-4 card shadow">
      <div className="d-flex flex-row align-items-center flex-wrap gap-3">
        <div
          className="rounded-4 bg-light border d-flex flex-column align-items-center justify-content-center px-4 py-3 shadow-sm me-md-2 flex-shrink-0"
          style={{ minWidth: 132 }}
        >
          <HrLogo size={78} variant="default" />
          <span
            className="small text-muted fw-semibold mt-2 mb-0 text-uppercase"
            style={{ letterSpacing: "0.12em", fontSize: "0.65rem" }}
          >
            HR Portal
          </span>
        </div>
        <div className="flex-grow-1">
          <h1>Welcome {username}!</h1>
          <h5 className="text-muted">We wish you a productive day!</h5>
          {userInfo && (
            <div className="mt-3">
              <p className="mb-1">
                <strong>Role:</strong>{" "}
                <StatusBadge status={userInfo.role} type="role" />
              </p>
              {userInfo.department && (
                <p className="mb-1">
                  <strong>Department:</strong> {userInfo.department}
                </p>
              )}
              {userInfo.job && (
                <p className="mb-0">
                  <strong>Position:</strong> {userInfo.job}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
