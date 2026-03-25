import Employee from "../models/Employee.js";
import { findEmployeeByRouteId } from "../utils/employeeQueries.js";

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const loginEmployee = async (req, res) => {
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

  if (!employee || employee.password !== pass) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const id = employee.legacyId || employee._id.toString();
  return res.json({ id, name: employee.name, role: employee.role });
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
  const employee = await Employee.create(body);
  res.json(employee);
};

export const updateEmployee = async (req, res) => {
  const existing = await findEmployeeByRouteId(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const body = { ...req.body };
  if (body.id && !body.legacyId) {
    body.legacyId = String(body.id);
    delete body.id;
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
