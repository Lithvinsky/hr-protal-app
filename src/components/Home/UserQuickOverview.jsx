import StatCard from "../UI/StatCard";
import DateFormatter from "../UI/DateFormatter";

/**
 * User Quick Overview Component
 */
function UserQuickOverview({ userInfo }) {
  if (!userInfo) return null;

  return (
    <div className="container p-4 mt-4 card shadow">
      <h5 className="mb-3">Quick Overview</h5>
      <div className="row">
        <div className="col-md-4 mb-3">
          <StatCard
            title="Holiday Balance"
            value={`${userInfo.availableDays} / ${userInfo.totalDays}`}
            subtitle={`${userInfo.totalDays - userInfo.availableDays} days used`}
          />
        </div>
        <div className="col-md-4 mb-3">
          <StatCard
            title="Holiday Requests"
            value={userInfo.holidays?.length || 0}
            subtitle="Total requests"
          />
        </div>
        {userInfo.hireDate && (
          <div className="col-md-4 mb-3">
            <StatCard
              title="Member Since"
              value={
                <DateFormatter
                  dateString={userInfo.hireDate}
                  format="short"
                />
              }
              subtitle="Hire date"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserQuickOverview;

