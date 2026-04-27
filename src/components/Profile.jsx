import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchSingleEmployee, updateEmployee } from "../services/http";
import { queryClient } from "../services/http";
import Error from "../pages/Error";
import {
  getCurrentUserId,
  getCurrentUserRole,
  getCurrentUser,
} from "../services/authService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileHeader from "./Profile/ProfileHeader";
import ContactInfo from "./Profile/ContactInfo";
import ProfessionalInfo from "./Profile/ProfessionalInfo";
import OnboardingSection from "./Profile/OnboardingSection";
import ProfileEditForm from "./Profile/ProfileEditForm";

const DEFAULT_ONBOARDING_TASKS = [
  { id: 1, title: "Complete profile information", completed: false },
  { id: 2, title: "Review company policies", completed: false },
  { id: 3, title: "Set up work equipment", completed: false },
  { id: 4, title: "Attend orientation meeting", completed: false },
  { id: 5, title: "Complete training modules", completed: false },
  { id: 6, title: "Meet with team members", completed: false },
];

function Profile() {
  const { userId } = useParams();
  const currentUserId = getCurrentUserId();
  const currentUserRole = getCurrentUserRole();
  const currentUsername = getCurrentUser();

  const profileUserId = userId || currentUserId;
  const isAdmin = currentUserRole === "admin";
  const isViewingOwnProfile = profileUserId === currentUserId;
  const canEdit = isAdmin;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [onboardingTasks, setOnboardingTasks] = useState([]);
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employees", profileUserId],
    queryFn: ({ signal, queryKey }) =>
      fetchSingleEmployee({ id: queryKey[1], signal }),
    enabled: !!profileUserId,
  });

  const {
    mutate: updateEmployeeMutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsEditing(false);
      setFormErrors({});
    },
  });

  const {
    mutate: updatePasswordMutate,
    isPending: isChangingPassword,
    isError: isPasswordUpdateError,
    error: passwordUpdateError,
  } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", profileUserId] });
      setPasswordForm({ newPassword: "", confirmPassword: "" });
      setPasswordErrors({});
      setPasswordSuccess("Password updated successfully.");
    },
  });

  // Initialize onboarding tasks when data is loaded
  useEffect(() => {
    if (data) {
      if (data.onboarding && Array.isArray(data.onboarding.tasks)) {
        setOnboardingTasks(data.onboarding.tasks);
      } else {
        setOnboardingTasks(DEFAULT_ONBOARDING_TASKS);
      }
    }
  }, [data]);

  const handleEdit = () => {
    if (data) {
      setFormData({
        name: data.name || "",
        surname: data.surname || "",
        email: data.email || "",
        password: "",
        confirmPassword: "",
        phone: data.phone || "",
        address: data.address || "",
        age: data.age || "",
        job: data.job || "",
        department: data.department || "",
        role: data.role || "user",
        daysOfHolidays: data.daysOfHolidays || 28,
        hireDate: data.hireDate ? data.hireDate.split("T")[0] : "",
      });

      if (data.onboarding && Array.isArray(data.onboarding.tasks)) {
        setOnboardingTasks(data.onboarding.tasks);
      }

      setIsEditing(true);
      setFormErrors({});
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
    setFormErrors({});
    if (data) {
      if (data.onboarding && Array.isArray(data.onboarding.tasks)) {
        setOnboardingTasks(data.onboarding.tasks);
      } else {
        setOnboardingTasks(DEFAULT_ONBOARDING_TASKS);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (!formData.surname || formData.surname.trim() === "") {
      errors.surname = "Surname is required";
    }
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (formData.age && (isNaN(formData.age) || formData.age < 0)) {
      errors.age = "Age must be a positive number";
    }
    if (
      formData.daysOfHolidays &&
      (isNaN(formData.daysOfHolidays) || formData.daysOfHolidays < 0)
    ) {
      errors.daysOfHolidays = "Days of holidays must be a positive number";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updateData = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      phone: formData.phone || "",
      address: formData.address || "",
      age: formData.age ? parseInt(formData.age, 10) : undefined,
      job: formData.job || "",
      department: formData.department || "",
      role: formData.role || "user",
      daysOfHolidays: formData.daysOfHolidays
        ? parseInt(formData.daysOfHolidays, 10)
        : 28,
      hireDate: formData.hireDate || data.hireDate,
      onboarding: {
        tasks: onboardingTasks,
        completedDate: onboardingTasks.every((t) => t.completed)
          ? new Date().toISOString()
          : data.onboarding?.completedDate || null,
      },
    };
    if (formData.password) {
      updateData.password = formData.password;
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    updateEmployeeMutate({
      employeeId: profileUserId,
      employeeData: updateData,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTaskToggle = async (taskId) => {
    if (!canEdit) return;

    const updatedTasks = onboardingTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setOnboardingTasks(updatedTasks);

    const updateData = {
      onboarding: {
        tasks: updatedTasks,
        completedDate: updatedTasks.every((t) => t.completed)
          ? new Date().toISOString()
          : null,
      },
    };

    updateEmployeeMutate({
      employeeId: profileUserId,
      employeeData: updateData,
    });
  };

  const handleTaskToggleInForm = (updatedTasks) => {
    setOnboardingTasks(updatedTasks);
  };

  const calculateOnboardingProgress = () => {
    if (!onboardingTasks || onboardingTasks.length === 0) return 0;
    const completedCount = onboardingTasks.filter(
      (task) => task.completed
    ).length;
    return Math.round((completedCount / onboardingTasks.length) * 100);
  };

  const onboardingProgress = calculateOnboardingProgress();
  const isOnboardingComplete = onboardingTasks.every((task) => task.completed);
  const canChangeOwnPassword = isViewingOwnProfile;

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordSuccess("");
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.confirmPassword !== passwordForm.newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    updatePasswordMutate({
      employeeId: profileUserId,
      employeeData: { password: passwordForm.newPassword },
    });
  };

  if (isLoading) {
    return (
      <div className="container p-4">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container p-4">
        <Error
          title="An error occurred"
          message={error.info?.message || "Failed to fetch events."}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container p-4">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <ProfileHeader
        data={data}
        canEdit={canEdit}
        isEditing={isEditing}
        isViewingOwnProfile={isViewingOwnProfile}
        currentUsername={currentUsername}
        onEdit={handleEdit}
      />

      {isEditing && canEdit && (
        <ProfileEditForm
          formData={formData}
          formErrors={formErrors}
          onboardingTasks={onboardingTasks}
          isUpdating={isUpdating}
          isUpdateError={isUpdateError}
          updateError={updateError}
          onInputChange={handleInputChange}
          onTaskToggle={handleTaskToggleInForm}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {!isEditing && (
        <>
          <ContactInfo data={data} />
          <ProfessionalInfo data={data} />
          <OnboardingSection
            onboardingTasks={onboardingTasks}
            onboardingProgress={onboardingProgress}
            isOnboardingComplete={isOnboardingComplete}
            canEdit={canEdit}
            isUpdating={isUpdating}
            onTaskToggle={handleTaskToggle}
            completedDate={data.onboarding?.completedDate}
          />
          {canChangeOwnPassword && (
            <div className="card shadow mt-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </h5>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handlePasswordSubmit}>
                  {isPasswordUpdateError && passwordUpdateError && (
                    <div className="alert alert-danger" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {passwordUpdateError?.info?.message ||
                        passwordUpdateError?.message ||
                        "Failed to update password. Please try again."}
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="alert alert-success" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      {passwordSuccess}
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        <strong>New Password</strong>
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className={`form-control ${
                          passwordErrors.newPassword ? "is-invalid" : ""
                        }`}
                        value={passwordForm.newPassword}
                        onChange={handlePasswordInputChange}
                      />
                      {passwordErrors.newPassword && (
                        <div className="invalid-feedback">
                          {passwordErrors.newPassword}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPasswordSelf" className="form-label">
                        <strong>Confirm New Password</strong>
                      </label>
                      <input
                        type="password"
                        id="confirmPasswordSelf"
                        name="confirmPassword"
                        className={`form-control ${
                          passwordErrors.confirmPassword ? "is-invalid" : ""
                        }`}
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordInputChange}
                      />
                      {passwordErrors.confirmPassword && (
                        <div className="invalid-feedback">
                          {passwordErrors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isChangingPassword}
                    >
                      {isChangingPassword ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-shield-lock me-2"></i>
                          Update Password
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
