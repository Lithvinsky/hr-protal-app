import Employee from "../models/Employee.js";
import { findEmployeeByRouteId } from "../utils/employeeQueries.js";
import { verifyAndUpgradeEmployeePassword, hashPassword } from "../utils/password.js";
import { signEmployeeToken } from "../config/jwt.js";

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const loginEmployee = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const raw = String(username).trim();
    const pass = String(password);

    let employee = await Employee.findOne({
      email: new RegExp(`^${escapeRegex(raw)}$`, "i"),
    }).select("+password");

    if (!employee) {
      const dot = raw.indexOf(".");
      if (dot > 0) {
        const first = raw.slice(0, dot);
        const last = raw.slice(dot + 1);
        if (first && last) {
          employee = await Employee.findOne({
            name: new RegExp(`^${escapeRegex(first)}$`, "i"),
            surname: new RegExp(`^${escapeRegex(last)}$`, "i"),
          }).select("+password");
        }
      }
    }

    if (!employee) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const ok = await verifyAndUpgradeEmployeePassword(employee, pass);
    if (!ok) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = signEmployeeToken(employee);
    const id = employee.legacyId || employee._id.toString();
    return res.json({ token, id, name: employee.name, role: employee.role });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Login failed" });
  }
};

export const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

export const getEmployeeById = async (req, res) => {
  const employee = await findEmployeeByRouteId(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json(employee);
};

export const addEmployee = async (req, res) => {
  const body = { ...req.body };
  if (body.id && !body.legacyId) {
    body.legacyId = String(body.id);
    delete body.id;
  }
  if (body.password) {
    body.password = await hashPassword(body.password);
  }
  const employee = await Employee.create(body);
  res.json(employee);
};

export const updateEmployee = async (req, res) => {
  const existing = await findEmployeeByRouteId(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const isAdmin = req.auth.role === "admin";
  const isSelf = existing._id.toString() === req.auth.sub;
  if (!isAdmin && !isSelf) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const body = { ...req.body };
  if (body.id && !body.legacyId) {
    body.legacyId = String(body.id);
    delete body.id;
  }

  if (!isAdmin) {
    delete body.role;
    delete body.salary;
    delete body.legacyId;
  }

  if (body.password !== undefined) {
    if (body.password === "") {
      delete body.password;
    } else {
      body.password = await hashPassword(body.password);
    }
  }

  const employee = await Employee.findByIdAndUpdate(existing._id, body, {
    new: true,
    runValidators: true,
  });
  res.json(employee);
};

export const deleteEmployee = async (req, res) => {
  const existing = await findEmployeeByRouteId(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Employee not found" });
  }
  await Employee.findByIdAndDelete(existing._id);
  res.json({ message: "Employee removed" });
};
