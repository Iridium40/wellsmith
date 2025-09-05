import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleHealthAssessment } from "./routes/health-assessment";
import { handlePinterest } from "./routes/pinterest";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Health Assessment form submission
  app.post("/api/health-assessment", handleHealthAssessment);

  // Pinterest images (Lean & Green) from public board RSS
  app.get("/api/pinterest", handlePinterest);

  return app;
}
