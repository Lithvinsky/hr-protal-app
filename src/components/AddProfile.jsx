import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createEmployee, queryClient } from "../services/http";
import { getCurrentUser, getCurrentUserRole } from "../services/authService";

const DEFAULT_ONBOARDING_TASKS = [
  { id: 1, title: "Complete profile information", completed: false },
  { id: 2, title: "Review company policies", completed: false },
  { id: 3, title: "Set up work equipment", completed: false },
  { id: 4, title: "Attend orientation meeting", completed: false },
  { id: 5, title: "Complete training modules", completed: false },
  { id: 6, title: "Meet with team members", completed: false },
];

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  age: "",
  job: "",
  department: "",
  role: "user",
  daysOfHolidays: 28,
  hireDate: "",
  salary: "",
};

function AddProfile() {
  const navigate = useNavigate();
  const username = getCurrentUser();
  const userRole = getCurrentUserRole();
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  const isAdmin = userRole === "admin";

  const {
    mutate: createEmployeeMutate,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: createEmployee,
    onSuccess: (employee) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      const employeeId = employee?.id || employee?._id;
      if (employeeId) {
        navigate(`/${username}/profile/${employeeId}`);
        return;
      }
      navigate(`/${username}/profiles`);
    },
  });

  if (!isAdmin) {
    return <Navigate to={`/${username}/profiles`} replace />;
  }

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.surname.trim()) errors.surname = "Surname is required";
    if (!formData.job.trim()) errors.job = "Job title is required";
    if (!formData.department.trim()) errors.department = "Department is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.age && (isNaN(formData.age) || Number(formData.age) < 0)) {
      errors.age = "Age must be a positive number";
    }
    if (
      formData.daysOfHolidays &&
      (isNaN(formData.daysOfHolidays) || Number(formData.daysOfHolidays) < 0)
    ) {
      errors.daysOfHolidays = "Days of holidays must be a positive number";
    }
    if (formData.salary && (isNaN(formData.salary) || Number(formData.salary) < 0)) {
      errors.salary = "Salary must be a positive number";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const employeeData = {
      name: formData.name.trim(),
      surname: formData.surname.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      age: formData.age ? parseInt(formData.age, 10) : undefined,
      job: formData.job.trim(),
      department: formData.department.trim(),
      role: formData.role || "user",
      daysOfHolidays: formData.daysOfHolidays
        ? parseInt(formData.daysOfHolidays, 10)
        : 28,
      hireDate: formData.hireDate || "",
      salary: formData.salary ? parseFloat(formData.salary) : 0,
      onboarding: {
        tasks: DEFAULT_ONBOARDING_TASKS,
        completedDate: null,
      },
      holidays: [],
    };

    Object.keys(employeeData).forEach((key) => {
      if (employeeData[key] === undefined) {
        delete employeeData[key];
      }
    });

    createEmployeeMutate({ employeeData });
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Add New Profile</h2>
          <p className="text-muted mb-0">Create a new employee profile for your team.</p>
        </div>
        <Link to={`/${username}/profiles`} className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Profiles
        </Link>
      </div>

      <div className="card shadow">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {isCreateError && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {createError?.info?.message ||
                  createError?.message ||
                  "Failed to create profile. Please try again."}
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  <strong>Name *</strong>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="surname" className="form-label">
                  <strong>Surname *</strong>
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  className={`form-control ${formErrors.surname ? "is-invalid" : ""}`}
                  value={formData.surname}
                  onChange={handleInputChange}
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
                  id="email"
                  name="email"
                  className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  <strong>Temporary Password *</strong>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {formErrors.password && (
                  <div className="invalid-feedback">{formErrors.password}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="job" className="form-label">
                  <strong>Job Title *</strong>
                </label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  className={`form-control ${formErrors.job ? "is-invalid" : ""}`}
                  value={formData.job}
                  onChange={handleInputChange}
                />
                {formErrors.job && <div className="invalid-feedback">{formErrors.job}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="department" className="form-label">
                  <strong>Department *</strong>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  className={`form-control ${formErrors.department ? "is-invalid" : ""}`}
                  value={formData.department}
                  onChange={handleInputChange}
                />
                {formErrors.department && (
                  <div className="invalid-feedback">{formErrors.department}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="role" className="form-label">
                  <strong>Role</strong>
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleInputChange}
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
                  id="daysOfHolidays"
                  name="daysOfHolidays"
                  min="0"
                  className={`form-control ${formErrors.daysOfHolidays ? "is-invalid" : ""}`}
                  value={formData.daysOfHolidays}
                  onChange={handleInputChange}
                />
                {formErrors.daysOfHolidays && (
                  <div className="invalid-feedback">{formErrors.daysOfHolidays}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  <strong>Phone</strong>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  <strong>Address</strong>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="age" className="form-label">
                  <strong>Age</strong>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  className={`form-control ${formErrors.age ? "is-invalid" : ""}`}
                  value={formData.age}
                  onChange={handleInputChange}
                />
                {formErrors.age && <div className="invalid-feedback">{formErrors.age}</div>}
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="hireDate" className="form-label">
                  <strong>Hire Date</strong>
                </label>
                <input
                  type="date"
                  id="hireDate"
                  name="hireDate"
                  className="form-control"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="salary" className="form-label">
                  <strong>Salary</strong>
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  min="0"
                  step="0.01"
                  className={`form-control ${formErrors.salary ? "is-invalid" : ""}`}
                  value={formData.salary}
                  onChange={handleInputChange}
                />
                {formErrors.salary && <div className="invalid-feedback">{formErrors.salary}</div>}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Link
                to={`/${username}/profiles`}
                className={`btn btn-outline-secondary ${isCreating ? "disabled" : ""}`}
              >
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Create Profile
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

export default AddProfile;
