import { Link } from "react-router-dom";
import Avatar from "../UI/Avatar";

/**
 * Profile Header Component
 */
function ProfileHeader({ data, canEdit, isEditing, isViewingOwnProfile, currentUsername, onEdit }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <div className="me-3">
              <Avatar name={data.name} surname={data.surname} size={80} />
            </div>
            <div>
              <h2 className="mb-1">
                {data.name} {data.surname}
              </h2>
              <h5 className="text-muted mb-1">{data.job}</h5>
              {data.department && (
                <p className="text-muted mb-0">
                  <i className="bi bi-building"></i> {data.department}
                </p>
              )}
            </div>
          </div>
          {canEdit && !isEditing && (
            <button className="btn btn-primary" onClick={onEdit}>
              <i className="bi bi-pencil me-2"></i>
              Edit Profile
            </button>
          )}
          {!isViewingOwnProfile && (
            <Link
              to={`/${currentUsername}/profiles`}
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Profiles
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

