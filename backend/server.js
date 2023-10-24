import path from "path";
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Load environment variables from the .env file into the application
dotenv.config();

//connecting the database
dbConnect();

const app = express();
const port = process.env.PORT || 5000;

//Cookie Parser Middlewares
app.use(cookieParser());

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using Middleware for Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//paypal
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
console.log("dirname :: ", __dirname);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  //Set a static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //Any route which is not api will be router to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

// Register notFound middleware first to catch 404 errors
app.use(notFound);

// Then register the errorHandler middleware
app.use(errorHandler);

//Listening to port
app.listen(port, (req, res) => {
  console.log("Server Listening to Port : ", port);
});
