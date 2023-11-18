import express from "express";
import dataBaseConnection from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import taskRoutes from "./routes/task.route.js";

const app = new express();
app.use(cors());
app.use(express.json());

dataBaseConnection();

app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);
app.use("/tasks", taskRoutes);

const server = app.listen(8000, () => {
    console.log("Server runs");
})