import morgan from "morgan";
import express from "express";
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";

const app = express();

// const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// import routes & middlewares
// import errorHandlerMiddleware from "./middleware/errorHandler.js";

// Serve static frontend files in production
app.use(express.static(path.resolve(__dirname, "./client/dist")));
// Handle all other routes by serving the frontend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

//  error middleware
app.use("*", (req, res) => {
  res.status(404).json({ message: "not found, sir" });
});

// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
