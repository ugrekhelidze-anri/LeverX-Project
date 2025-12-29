import { Request, Response } from "express";
import db from "../db/db.js";
import { IApiResponse, IEmployee, IUpdateRoleBody } from "../types/index.js";

export const getAllEmployees = async (
  req: Request,
  res: Response<IApiResponse<IEmployee[]>>
): Promise<void> => {
  try {
    await db.read();
    const everyEmployee = db.data.employees;
    res.status(200).json({ success: true, data: everyEmployee });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Something went wrong, try again later" });
  }
};

export const getSingleEmployee = async (
  req: Request<{ id: string }>,
  res: Response<IApiResponse<IEmployee>>
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ success: false, error: "Invalid id" });
      return;
    }

    await db.read();
    const employees = db.data.employees;

    const employee = employees.find((emp) => emp._id === id);

    if (!employee) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong, try again later",
    });
  }
};

export const updateSingleEmployee = async (
  req: Request<{ id: string }, IApiResponse<IEmployee>, Partial<IEmployee>>,
  res: Response<IApiResponse<IEmployee>>
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (!req.body) {
      res.status(400).json({ success: false, error: "No data provided" });
      return;
    }

    await db.read();
    const employees = db.data.employees;

    const employeeIndex = employees.findIndex((emp) => emp._id === id);

    if (employeeIndex === -1) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    // Update employee with incoming data
    const updatedEmployee: IEmployee = {
      ...employees[employeeIndex],
      ...req.body,
    };

    // Replace old employee data
    employees[employeeIndex] = updatedEmployee;

    // Save changes to the database
    await db.write();

    res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong, try again later",
    });
  }
};

export const updateEmployeeRole = async (
  req: Request<{ id: string }, IApiResponse<IEmployee>, IUpdateRoleBody>,
  res: Response<IApiResponse<IEmployee>>
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { role } = req.body;

    if (!role || typeof role !== "string" || !role.trim()) {
      res.status(400).json({ success: false, error: "Invalid role" });
      return;
    }

    await db.read();
    const employees = db.data.employees;

    const employeeIndex = employees.findIndex((emp) => emp._id === id);

    if (employeeIndex === -1) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    // Update only the role
    employees[employeeIndex].role = role;

    // Save changes to the database
    await db.write();

    res.status(200).json({
      success: true,
      data: employees[employeeIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong, try again later",
    });
  }
};
