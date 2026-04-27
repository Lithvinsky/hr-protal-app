/**
 * Profile Edit Form Component
 */
function ProfileEditForm({
  formData,
  formErrors,
  onboardingTasks,
  isUpdating,
  isUpdateError,
  updateError,
  onInputChange,
  onTaskToggle,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className="bi bi-pencil-square me-2"></i>
          Edit Employee Information
        </h5>
      </div>
      <div className="card-body p-4">
        <form onSubmit={onSubmit}>
          {isUpdateError && updateError && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              <strong>Error:</strong>{" "}
              {updateError?.info?.message ||
                updateError?.message ||
                "Failed to update employee information. Please try again."}
            </div>
          )}

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                <strong>Name *</strong>
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={onInputChange}
                required
              />
              {formErrors.name && (
                <div className="invalid-feedback">{formErrors.name}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="surname" className="form-label">
                <strong>Surname *</strong>
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.surname ? "is-invalid" : ""}`}
                id="surname"
                name="surname"
                value={formData.surname || ""}
                onChange={onInputChange}
                required
              />
              {formErrors.surname && (
                <div className="invalid-feedback">{formErrors.surname}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Email *</strong>
              </label>
              <input
                type="email"
                className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={onInputChange}
                required
              />
              {formErrors.email && (
                <div className="invalid-feedback">{formErrors.email}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                value={formData.password || ""}
                onChange={onInputChange}
                placeholder="Leave blank to keep current password"
              />
              {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                <strong>Confirm New Password</strong>
              </label>
              <input
                type="password"
                className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={onInputChange}
                placeholder="Repeat new password"
              />
              {formErrors.confirmPassword && (
                <div className="invalid-feedback">{formErrors.confirmPassword}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label">
                <strong>Phone</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="address" className="form-label">
                <strong>Address</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="age" className="form-label">
                <strong>Age</strong>
              </label>
              <input
                type="number"
                className={`form-control ${formErrors.age ? "is-invalid" : ""}`}
                id="age"
                name="age"
                value={formData.age || ""}
                onChange={onInputChange}
                min="0"
              />
              {formErrors.age && (
                <div className="invalid-feedback">{formErrors.age}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="job" className="form-label">
                <strong>Job Title</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="job"
                name="job"
                value={formData.job || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="department" className="form-label">
                <strong>Department</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                name="department"
                value={formData.department || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="role" className="form-label">
                <strong>Role</strong>
              </label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={formData.role || "user"}
                onChange={onInputChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="daysOfHolidays" className="form-label">
                <strong>Days of Holidays</strong>
              </label>
              <input
                type="number"
                className={`form-control ${formErrors.daysOfHolidays ? "is-invalid" : ""}`}
                id="daysOfHolidays"
                name="daysOfHolidays"
                value={formData.daysOfHolidays || ""}
                onChange={onInputChange}
                min="0"
              />
              {formErrors.daysOfHolidays && (
                <div className="invalid-feedback">{formErrors.daysOfHolidays}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="hireDate" className="form-label">
                <strong>Hire Date</strong>
              </label>
              <input
                type="date"
                className="form-control"
                id="hireDate"
                name="hireDate"
                value={formData.hireDate || ""}
                onChange={onInputChange}
              />
            </div>
          </div>

          {/* Onboarding Tasks in Edit Form */}
          <div className="mt-4">
            <h5 className="mb-3">
              <i className="bi bi-clipboard-check me-2"></i>
              Onboarding Tasks
            </h5>
            {onboardingTasks && onboardingTasks.length > 0 ? (
              <div className="row">
                {onboardingTasks.map((task) => (
                  <div key={task.id} className="col-md-6 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`task-${task.id}`}
                        checked={task.completed || false}
                        onChange={(e) => {
                          const updatedTasks = onboardingTasks.map((t) =>
                            t.id === task.id
                              ? { ...t, completed: e.target.checked }
                              : t
                          );
                          onTaskToggle(updatedTasks);
                        }}
                      />
                      <label className="form-check-label" htmlFor={`task-${task.id}`}>
                        {task.title}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No onboarding tasks available.</p>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
              disabled={isUpdating}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditForm;

