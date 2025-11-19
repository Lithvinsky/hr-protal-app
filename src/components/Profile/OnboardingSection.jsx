import DateFormatter from "../UI/DateFormatter";

/**
 * Onboarding Section Component
 */
function OnboardingSection({
  onboardingTasks,
  onboardingProgress,
  isOnboardingComplete,
  canEdit,
  isUpdating,
  onTaskToggle,
  completedDate,
}) {
  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-clipboard-check me-2"></i>
          Onboarding Progress
        </h5>
        <span
          className={`badge ${
            isOnboardingComplete
              ? "bg-success"
              : onboardingProgress > 0
              ? "bg-warning"
              : "bg-secondary"
          }`}
        >
          {isOnboardingComplete
            ? "Completed"
            : onboardingProgress > 0
            ? "In Progress"
            : "Not Started"}
        </span>
      </div>
      <div className="card-body p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold">Overall Progress</span>
            <span className="fw-bold">{onboardingProgress}%</span>
          </div>
          <div className="progress" style={{ height: "25px" }}>
            <div
              className={`progress-bar ${
                isOnboardingComplete
                  ? "bg-success"
                  : onboardingProgress > 0
                  ? "bg-info"
                  : "bg-secondary"
              }`}
              role="progressbar"
              style={{ width: `${onboardingProgress}%` }}
              aria-valuenow={onboardingProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {onboardingProgress}%
            </div>
          </div>
        </div>

        {/* Onboarding Tasks List */}
        <div className="mb-3">
          <h6 className="mb-3">
            <i className="bi bi-list-check me-2"></i>
            Onboarding Tasks
          </h6>
          {onboardingTasks && onboardingTasks.length > 0 ? (
            <div className="list-group">
              {onboardingTasks.map((task) => (
                <div
                  key={task.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    task.completed ? "bg-light" : ""
                  }`}
                >
                  <div className="d-flex align-items-center">
                    {canEdit ? (
                      <input
                        type="checkbox"
                        className="form-check-input me-3"
                        checked={task.completed || false}
                        onChange={() => onTaskToggle(task.id)}
                        disabled={isUpdating}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <i
                        className={`bi me-3 ${
                          task.completed
                            ? "bi-check-circle-fill text-success"
                            : "bi-circle text-muted"
                        }`}
                        style={{ fontSize: "20px" }}
                      ></i>
                    )}
                    <span
                      className={
                        task.completed
                          ? "text-decoration-line-through text-muted"
                          : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                  {task.completed && (
                    <span className="badge bg-success">
                      <i className="bi bi-check me-1"></i>
                      Completed
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No onboarding tasks assigned.</p>
          )}
        </div>

        {/* Completion Date */}
        {isOnboardingComplete && completedDate && (
          <div className="alert alert-success mb-0" role="alert">
            <i className="bi bi-check-circle me-2"></i>
            <strong>Onboarding completed on:</strong>{" "}
            <DateFormatter dateString={completedDate} format="long" />
          </div>
        )}

        {!canEdit && onboardingProgress < 100 && (
          <div className="alert alert-info mb-0 mt-3" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            Contact your administrator to update onboarding progress.
          </div>
        )}
      </div>
    </div>
  );
}

export default OnboardingSection;

