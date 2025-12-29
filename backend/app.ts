import express, { Express } from "express";
import cors from "cors";
import employeeRouter from "./routes/employeeRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app: Express = express();

// middleware
app.use(cors());
app.use(express.json());

// set up endpoints
app.use("/employees", employeeRouter);
app.use("/auth", authRouter);

app.listen(3000, () => console.log("server is listening on port 3000"));
