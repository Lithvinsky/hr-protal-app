import HolidayCard from "./HolidayCard";

/**
 * Holiday Status Group Component
 */
function HolidayStatusGroup({ title, holidays, bgColor, textColor = "text-white" }) {
  if (!holidays || holidays.length === 0) return null;

  return (
    <div className="card shadow mb-4">
      <div className={`card-header ${bgColor} ${textColor}`}>
        <h5 className="mb-0">
          {title} ({holidays.length})
        </h5>
      </div>
      <div className="card-body p-4">
        <div className="list-group">
          {holidays.map((holiday, index) => (
            <HolidayCard key={`${holiday.startDate}-${holiday.endDate}-${index}`} holiday={holiday} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HolidayStatusGroup;

