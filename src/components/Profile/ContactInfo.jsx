/**
 * Contact Information Component
 */
function ContactInfo({ data }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body p-4">
        <h4 className="mb-4">Contact Information</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Email:</strong>
              <span>{data.email || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Phone:</strong>
              <span>{data.phone || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Address:</strong>
              <span>{data.address || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Age:</strong>
              <span>{data.age || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;

