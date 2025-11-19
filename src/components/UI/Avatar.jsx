/**
 * Reusable Avatar component
 * @param {string} name - First name
 * @param {string} surname - Last name
 * @param {number} size - Size in pixels (default: 60)
 * @param {string} className - Additional CSS classes
 */
function Avatar({ name, surname, size = 60, className = "" }) {
  const initials = `${name?.[0] || ""}${surname?.[0] || ""}`.toUpperCase();
  const fontSize = size * 0.4; // 40% of size

  return (
    <div
      className={`bg-primary text-white rounded-circle d-flex align-items-center justify-content-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${fontSize}px`,
        fontWeight: "bold",
      }}
    >
      {initials}
    </div>
  );
}

export default Avatar;

