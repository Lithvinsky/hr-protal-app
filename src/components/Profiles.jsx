import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../services/http.js";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Error from "../pages/Error";
import Avatar from "./UI/Avatar";
import StatusBadge from "./UI/StatusBadge";

function Profiles() {
  const username = getCurrentUser();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  let content = <p>Noone is working in this company.</p>;

  if (isLoading) {
    content = <h3> Loading ... </h3>;
  }

  if (isError) {
    content = (
      <Error
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <div className="row g-3 my-3">
        {data.map((profile) => (
          <div className="col-md-6 col-lg-4" key={profile.id}>
            <Link
              to={`/${username}/profile/${profile.id}`}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <div className="card h-100 shadow-sm hover-card" style={{ cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <Avatar name={profile.name} surname={profile.surname} size={60} className="me-3" />
                    <div>
                      <h5 className="card-title mb-0">
                        {profile.name} {profile.surname}
                      </h5>
                      <p className="text-muted mb-0 small">{profile.job}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    {profile.department && (
                      <p className="mb-1 small">
                        <strong>Department:</strong> {profile.department}
                      </p>
                    )}
                    {profile.email && (
                      <p className="mb-1 small text-truncate" title={profile.email}>
                        <strong>Email:</strong> {profile.email}
                      </p>
                    )}
                    {profile.phone && (
                      <p className="mb-1 small">
                        <strong>Phone:</strong> {profile.phone}
                      </p>
                    )}
                    {profile.address && (
                      <p className="mb-1 small">
                        <strong>Location:</strong> {profile.address}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <StatusBadge status={profile.role} type="role" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Profiles;
