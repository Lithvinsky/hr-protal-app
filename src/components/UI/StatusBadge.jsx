/**
 * Reusable Status Badge component
 * @param {string} status - Status value (e.g., "accepted", "declined", "requested", "admin", "user")
 * @param {string} type - Type of status ("holiday" or "role")
 * @param {string} className - Additional CSS classes
 */
function StatusBadge({ status, type = "holiday", className = "" }) {
  const getBadgeClass = () => {
    if (type === "role") {
      return status === "admin" ? "bg-danger" : "bg-info";
    }

    // Holiday status
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-success";
      case "declined":
        return "bg-danger";
      case "requested":
        return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  const getStatusText = () => {
    if (!status) return "N/A";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span className={`badge ${getBadgeClass()} ${className}`}>
      {getStatusText()}
    </span>
  );
}

export default StatusBadge;

