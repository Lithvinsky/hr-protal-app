import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmployee } from "../services/http";
import { isApiBaseConfiguredForProduction } from "../config/api";
import {
  isAuthenticated,
  getCurrentUser,
  storeSessionFromLoginPayload,
} from "../services/authService.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const apiReady = isApiBaseConfiguredForProduction();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(`/${getCurrentUser()}/home`);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!apiReady) {
      setError(
        "This deployment is missing REACT_APP_API_URL. Add it in Vercel → Settings → Environment Variables (your API origin, no trailing slash), then redeploy."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await loginEmployee({ username, password });
      storeSessionFromLoginPayload(user);
      navigate(`/${user.name}/home`);
    } catch (err) {
      setError(err.message || "Sign in failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero-img">
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow-lg border-0" style={{ width: "450px", borderRadius: "15px" }}>
          <div className="card-body p-5">
            {/* Logo/Header */}
            <div className="text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ width: "80px", height: "80px", fontSize: "2rem" }}>
                <i className="bi bi-briefcase-fill"></i>
              </div>
              <h2 className="card-title mb-2 fw-bold">HR Portal</h2>
              <p className="text-muted small">Sign in to your account</p>
            </div>

            {/* Error Message */}
            {!apiReady && (
              <div className="alert alert-warning small" role="alert">
                Production build: set <code className="small">REACT_APP_API_URL</code> to your
                deployed API (e.g. <code className="small">https://your-api.onrender.com</code>) and
                redeploy.
              </div>
            )}

            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{error}</div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">
                  <i className="bi bi-person me-2 text-primary"></i>
                  Email / Username
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-envelope text-muted"></i>
                  </span>
                  <input
                    id="username"
                    className="form-control border-start-0"
                    type="text"
                    placeholder="Enter your email or username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    required
                    disabled={isSubmitting}
                    style={{ paddingLeft: "0" }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                  <i className="bi bi-lock me-2 text-primary"></i>
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-lock-fill text-muted"></i>
                  </span>
                  <input
                    id="password"
                    className="form-control border-start-0 border-end-0"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                    disabled={isSubmitting}
                    style={{ paddingLeft: "0", paddingRight: "0" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-start-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    style={{ borderLeft: "none" }}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
                disabled={isSubmitting}
                style={{ borderRadius: "8px" }}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer Info */}
            <div className="text-center mt-4">
              <small className="text-muted">
                <i className="bi bi-shield-check me-1"></i>
                Use your work email or <span className="text-nowrap">name.surname</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
