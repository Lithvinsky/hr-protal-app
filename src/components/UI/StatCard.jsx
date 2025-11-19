/**
 * Reusable Stat Card component
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {string} subtitle - Subtitle or additional info
 * @param {string} icon - Bootstrap icon class
 * @param {string} bgColor - Background color class (default: "bg-light")
 * @param {string} iconBgColor - Icon background color class (default: "bg-primary")
 */
function StatCard({
  title,
  value,
  subtitle,
  icon,
  bgColor = "bg-light",
  iconBgColor = "bg-primary",
}) {
  return (
    <div className={`card ${bgColor} p-3`}>
      {icon && (
        <div className={`${iconBgColor} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2`}
             style={{ width: "40px", height: "40px" }}>
          <i className={icon}></i>
        </div>
      )}
      <h6 className="text-muted mb-2">{title}</h6>
      <h3 className="mb-0">{value}</h3>
      {subtitle && <small className="text-muted">{subtitle}</small>}
    </div>
  );
}

export default StatCard;

