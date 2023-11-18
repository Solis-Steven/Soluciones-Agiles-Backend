import express from "express";
import {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket,
} from "../controllers/ticket.controller.js";

const router = express.Router();

router.get("/", getTickets);
router.post("/", createTicket);
router.get("/:id", getTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;