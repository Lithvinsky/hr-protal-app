import React, { useState } from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
  };

  return (
    <>
      <footer className="bg-primary text-light py-2 mt-auto shadow-lg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <i className="bi bi-briefcase-fill me-2 fs-5"></i>
                <h6 className="mb-0">HR Portal</h6>
              </div>
              <small className="text-light opacity-75">
                © {year} HR Portal, All Rights Reserved.
              </small>
            </div>
            <div className="col-md-6 text-md-end">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleContactClick}
              >
                <i className="bi bi-envelope me-2"></i>
                Contact Information
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Information Modal */}
      {showContactModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-info-circle me-2"></i>
                  Contact Information
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <h6 className="text-primary mb-3">
                    <i className="bi bi-building me-2"></i>
                    Office Address
                  </h6>
                  <p className="mb-2">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                    123 Business Street
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                    Suite 100
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                    City, State 12345
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-primary mb-3">
                    <i className="bi bi-telephone me-2"></i>
                    Phone & Email
                  </h6>
                  <p className="mb-2">
                    <i className="bi bi-telephone-fill text-primary me-2"></i>
                    <a href="tel:+1234567890" className="text-decoration-none">
                      +1 (234) 567-890
                    </a>
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-envelope-fill text-primary me-2"></i>
                    <a
                      href="mailto:support@hrportal.com"
                      className="text-decoration-none"
                    >
                      support@hrportal.com
                    </a>
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-envelope-fill text-primary me-2"></i>
                    <a
                      href="mailto:info@hrportal.com"
                      className="text-decoration-none"
                    >
                      info@hrportal.com
                    </a>
                  </p>
                </div>

                <div>
                  <h6 className="text-primary mb-3">
                    <i className="bi bi-clock me-2"></i>
                    Business Hours
                  </h6>
                  <p className="mb-1">
                    <strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM
                  </p>
                  <p className="mb-1">
                    <strong>Saturday:</strong> 10:00 AM - 2:00 PM
                  </p>
                  <p className="mb-0">
                    <strong>Sunday:</strong> Closed
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
