import express, { Router } from "express";
import {
  getAllEmployees,
  getSingleEmployee,
  updateSingleEmployee,
  updateEmployeeRole,
} from "../controllers/employeeController.js";

// set up router
const router: Router = express.Router();

// / for every employee
router.get("/", getAllEmployees);

// /:id for single employee
router.get("/:id", getSingleEmployee);

// /:id for updating one employee
router.put("/:id", updateSingleEmployee);

// /:id update just role of employee
router.patch("/:id", updateEmployeeRole);

export default router;
