import express from "express";
import {
    createTask,
    getTask,
    deleteTask,
    updateTask,
    getTasks
} from "../controllers/task.controller.js"

const router = express.Router();

router.post("/", createTask);
router.get("/:taskId", getTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/ticket/:ticketId", getTasks)

export default router;