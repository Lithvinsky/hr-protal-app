import StatusBadge from "../UI/StatusBadge";

/**
 * Welcome Card Component
 */
function WelcomeCard({ username, userInfo }) {
  return (
    <div className="container p-4 mt-4 card shadow">
      <div className="d-flex flex-row align-items-center">
        <div className="card p-3 text-center shadow me-4">
          <h4>HR</h4>
          <h4 className="text-uppercase">Portal</h4>
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
