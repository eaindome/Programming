import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

// import routes
import authRoutes from "./modules/auth/auth.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// default route
app.get("/", (req, res) => {
  res.send("Hello from TMT server");
});

// routes
app.use("/api/auth", authRoutes);

export default app;