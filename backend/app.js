import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoute.js";


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/files", fileRoutes);
export default app;