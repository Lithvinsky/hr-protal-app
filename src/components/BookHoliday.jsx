import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getCurrentUserId, getCurrentUser } from "../services/authService.js";
import { queryClient, requestNewHoliday } from "../services/http.js";

export default function BookHoliday() {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const username = getCurrentUser();
  const [formErrors, setFormErrors] = useState({});

  const {
    mutate: submitHolidayRequest,
    isPending: isSubmitting,
    isError,
    error,
  } = useMutation({
    mutationFn: requestNewHoliday,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate(`/${username}/holidays`);
    },
  });

  const validateForm = (formData) => {
    const errors = {};
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const daysUsed = formData.get("daysUsed");
    const reason = formData.get("reason");

    if (!startDate) {
      errors.startDate = "Start date is required";
    }
    if (!endDate) {
      errors.endDate = "End date is required";
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      errors.endDate = "End date must be after start date";
    }
    if (!daysUsed || daysUsed <= 0) {
      errors.daysUsed = "Days used must be greater than 0";
    }
    if (!reason || reason.trim() === "") {
      errors.reason = "Reason is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const holidays = Object.fromEntries(formData);
    submitHolidayRequest({ id: userId, holidays });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container p-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-calendar-plus me-2"></i>
            Book New Holiday
          </h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="startDate" className="form-label fw-bold">
                <i className="bi bi-calendar-event me-2"></i>
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className={`form-control form-control-lg ${
                  formErrors.startDate ? "is-invalid" : ""
                }`}
                min={today}
                required
              />
              {formErrors.startDate && (
                <div className="invalid-feedback">{formErrors.startDate}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="endDate" className="form-label fw-bold">
                <i className="bi bi-calendar-check me-2"></i>
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className={`form-control form-control-lg ${
                  formErrors.endDate ? "is-invalid" : ""
                }`}
                min={today}
                required
              />
              {formErrors.endDate && (
                <div className="invalid-feedback">{formErrors.endDate}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="daysUsed" className="form-label fw-bold">
                <i className="bi bi-calendar-day me-2"></i>
                Number of Days
              </label>
              <input
                id="daysUsed"
                name="daysUsed"
                type="number"
                className={`form-control form-control-lg ${
                  formErrors.daysUsed ? "is-invalid" : ""
                }`}
                min="1"
                max="28"
                required
              />
              {formErrors.daysUsed && (
                <div className="invalid-feedback">{formErrors.daysUsed}</div>
              )}
              <small className="form-text text-muted">
                Enter the number of working days for this holiday
              </small>
            </div>

            <div className="mb-4">
              <label htmlFor="reason" className="form-label fw-bold">
                <i className="bi bi-info-circle me-2"></i>
                Reason for Holiday
              </label>
              <textarea
                id="reason"
                name="reason"
                className={`form-control ${
                  formErrors.reason ? "is-invalid" : ""
                }`}
                rows="4"
                placeholder="Please provide a reason for your holiday request..."
                required
              ></textarea>
              {formErrors.reason && (
                <div className="invalid-feedback">{formErrors.reason}</div>
              )}
            </div>

            {isError && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <strong>Error:</strong>{" "}
                {error?.info?.message ||
                  error?.message ||
                  "Failed to submit holiday request. Please try again."}
              </div>
            )}

            <div className="d-flex justify-content-between gap-3 mt-4">
              <Link
                to={`/${username}/holidays`}
                className="btn btn-outline-secondary btn-lg flex-fill"
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary btn-lg flex-fill"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
