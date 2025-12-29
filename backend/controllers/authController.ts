import { Request, Response } from "express";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import { defaultEmployee } from "../db/defaultEmployee.js";
import {
  ISignUpBody,
  ILoginBody,
  IApiResponse,
  ILoginResponse,
  IEmployee,
} from "../types/index.js";

export const signUp = async (
  req: Request<{}, IApiResponse<IEmployee>, ISignUpBody>,
  res: Response<IApiResponse<IEmployee>>
): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      typeof first_name !== "string" ||
      typeof last_name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !first_name.trim() ||
      !last_name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      res.status(400).json({ success: false, error: "Invalid signup data" });
      return;
    }

    await db.read();
    const existingEmployee = db.data.employees.find(
      (emp) => emp.email === email
    );

    if (existingEmployee) {
      res.status(400).json({ success: false, error: "Email already exists" });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newEmployee: IEmployee = {
      ...defaultEmployee,
      _id: Date.now(),
      first_name,
      last_name,
      first_native_name: first_name,
      last_native_name: last_name,
      email,
      passwordHash,
    };

    db.data.employees.push(newEmployee);
    await db.write();

    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Something went wrong, try again later" });
  }
};

export const logIn = async (
  req: Request<{}, IApiResponse<ILoginResponse>, ILoginBody>,
  res: Response<IApiResponse<ILoginResponse>>
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password.trim()
    ) {
      res.status(400).json({ success: false, error: "Invalid login data" });
      return;
    }

    await db.read();
    const employee = db.data.employees.find((emp) => emp.email === email);
    if (!employee) {
      res
        .status(400)
        .json({ success: false, error: "invalid username or password" });
      return;
    }

    const passwordCheck = await bcrypt.compare(password, employee.passwordHash);
    if (!passwordCheck) {
      res
        .status(400)
        .json({ success: false, error: "invalid username or password" });
      return;
    }

    if (employee._id) {
      res
        .status(200)
        .json({ success: true, data: { _id: employee._id, isLoggedIn: true } });
    } else {
      res.status(500).json({ success: false, error: "Employee ID not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Something went wrong, try again later" });
  }
};
