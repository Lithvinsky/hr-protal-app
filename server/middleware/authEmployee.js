import jwt from "jsonwebtoken";

/**
 * Express middleware: Bearer JWT with payload typ === "employee".
 * Sets req.auth = { sub, lid, role }.
 */
export function authenticateEmployee(req, res, next) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = header.slice(7).trim();
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.typ !== "employee") {
      return res.status(403).json({ message: "Invalid token for this resource" });
    }
    req.auth = {
      sub: payload.sub,
      lid: payload.lid,
      role: payload.role,
    };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireAdminEmployee(req, res, next) {
  if (req.auth?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
