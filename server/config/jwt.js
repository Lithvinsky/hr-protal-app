import jwt from "jsonwebtoken";

export function requireJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
}

/** HR portal employee session (browser / SPA). */
export function signEmployeeToken(employee) {
  requireJwtSecret();
  return jwt.sign(
    {
      sub: employee._id.toString(),
      lid: employee.legacyId || undefined,
      role: employee.role,
      typ: "employee",
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

/** Separate User model auth (/api/auth/*). */
export function signUserToken(user) {
  requireJwtSecret();
  return jwt.sign(
    { sub: user._id.toString(), typ: "user" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}
