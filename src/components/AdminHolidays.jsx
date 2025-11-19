import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEmployees, updateHolidayStatus } from "../services/http";
import { queryClient } from "../services/http";
import { getCurrentUserRole } from "../services/authService";
import Error from "../pages/Error";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import HolidayRequestCard from "./AdminHolidays/HolidayRequestCard";
import DeclineModal from "./AdminHolidays/DeclineModal";

function AdminHolidays() {
  const userRole = getCurrentUserRole();
  const [declineReason, setDeclineReason] = useState({});
  const [showDeclineModal, setShowDeclineModal] = useState(null);
  const [processingHoliday, setProcessingHoliday] = useState(null);

  const {
    data: employees,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees", "admin-holidays"],
    queryFn: fetchEmployees,
    enabled: userRole === "admin",
  });

  const {
    mutate: updateHolidayStatusMutate,
    isPending: isUpdatingStatus,
    error: updateError,
    isError: isUpdateError,
  } = useMutation({
    mutationFn: updateHolidayStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setShowDeclineModal(null);
      setDeclineReason({});
      setProcessingHoliday(null);
    },
    onError: () => {
      setProcessingHoliday(null);
    },
  });

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleAccept = (employeeId, holidayIndex) => {
    setProcessingHoliday({ employeeId, holidayIndex, status: "accepted" });
    updateHolidayStatusMutate({
      employeeId,
      holidayIndex,
      status: "accepted",
    });
  };

  const handleDecline = (employeeId, holidayIndex) => {
    const modalKey = `${employeeId}-${holidayIndex}`;
    const reason = declineReason[modalKey] || "";
    setProcessingHoliday({ employeeId, holidayIndex, status: "declined" });
    updateHolidayStatusMutate({
      employeeId,
      holidayIndex,
      status: "declined",
      declineReason: reason || "No reason provided",
    });
  };

  const openDeclineModal = (employeeId, holidayIndex) => {
    setShowDeclineModal(`${employeeId}-${holidayIndex}`);
  };

  const closeDeclineModal = () => {
    setShowDeclineModal(null);
  };

  // Collect all holiday requests from all employees
  let allHolidayRequests = [];
  if (employees) {
    employees.forEach((employee) => {
      if (employee.holidays && Array.isArray(employee.holidays)) {
        employee.holidays.forEach((holiday, index) => {
          if (holiday.status === "requested") {
            allHolidayRequests.push({
              ...holiday,
              employeeId: employee.id,
              employeeName: `${employee.name} ${employee.surname}`,
              employeeEmail: employee.email,
              employeeDepartment: employee.department,
              holidayIndex: index,
            });
          }
        });
      }
    });
  }

  // Sort by requested date (most recent first)
  allHolidayRequests.sort((a, b) => {
    const dateA = new Date(a.requestedDate || a.startDate);
    const dateB = new Date(b.requestedDate || b.startDate);
    return dateB - dateA;
  });

  let content = <p>No holiday requests found.</p>;

  if (isLoading) {
    content = <h3>Loading holiday requests...</h3>;
  }

  if (isError) {
    content = (
      <Error
        title="An error occurred"
        message={error?.info?.message || "Failed to fetch holiday requests."}
      />
    );
  }

  if (allHolidayRequests.length > 0) {
    content = (
      <div className="list-group">
        {allHolidayRequests.map((holiday, idx) => {
          const modalKey = `${holiday.employeeId}-${holiday.holidayIndex}`;
          const isModalOpen = showDeclineModal === modalKey;
          const isProcessing =
            isUpdatingStatus &&
            processingHoliday?.employeeId === holiday.employeeId &&
            processingHoliday?.holidayIndex === holiday.holidayIndex;

          return (
            <div key={`${holiday.employeeId}-${holiday.holidayIndex}-${idx}`}>
              <HolidayRequestCard
                holiday={holiday}
                isProcessing={isProcessing}
                processingStatus={processingHoliday?.status}
                onAccept={() =>
                  handleAccept(holiday.employeeId, holiday.holidayIndex)
                }
                onDecline={() =>
                  openDeclineModal(holiday.employeeId, holiday.holidayIndex)
                }
              />
              {isModalOpen && (
                <DeclineModal
                  holiday={holiday}
                  declineReason={declineReason[modalKey] || ""}
                  isProcessing={isProcessing}
                  onReasonChange={(value) =>
                    setDeclineReason({
                      ...declineReason,
                      [modalKey]: value,
                    })
                  }
                  onCancel={closeDeclineModal}
                  onConfirm={() =>
                    handleDecline(holiday.employeeId, holiday.holidayIndex)
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="container p-4">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Holiday Request Management</h4>
        </div>
        <div className="card-body">
          <p className="text-muted mb-3">
            Review and manage holiday requests from all employees. You can
            accept or decline requests.
          </p>
          {allHolidayRequests.length > 0 && (
            <p className="mb-0">
              <strong>
                Total pending requests: {allHolidayRequests.length}
              </strong>
            </p>
          )}
        </div>
      </div>

      {content}

      {isUpdateError && updateError && (
        <div className="alert alert-danger mt-3" role="alert">
          <strong>Error updating holiday status:</strong>{" "}
          {updateError?.info?.message ||
            updateError?.message ||
            "An error occurred while updating the holiday status."}
        </div>
      )}
    </div>
  );
}

export default AdminHolidays;
