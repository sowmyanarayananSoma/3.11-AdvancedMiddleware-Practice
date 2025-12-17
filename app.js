import express from "express";
import mongoose from "mongoose";
import enrollmentRouter from "./routes/enrollment.js";
const app = express();

const MONGO_URL = "mongodb://localhost:27017/schoolDB";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB ✔"))
  .catch(err => console.log("Error:", err));

app.use((req, res, next) => {
  console.log("[1] Global middleware hit");
  next();
});

app.use("/enrollment",enrollmentRouter)

app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.url}`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode,
    },
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));