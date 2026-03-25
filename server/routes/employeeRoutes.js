import express from "express";
import rateLimit from "express-rate-limit";
import {
  getEmployees,
  getEmployeeById,
  loginEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import {
  authenticateEmployee,
  requireAdminEmployee,
} from "../middleware/authEmployee.js";

const router = express.Router();

const employeeLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", employeeLoginLimiter, loginEmployee);
router.use(authenticateEmployee);

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", requireAdminEmployee, addEmployee);
router.put("/:id", updateEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", requireAdminEmployee, deleteEmployee);

export default router;
