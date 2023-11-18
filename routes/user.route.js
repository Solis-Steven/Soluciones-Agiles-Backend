import express from "express";
import { 
    login,
    getUsers,
    changeRole,
    getEmails
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", login);
router.get("/", getUsers)
router.get("/emails", getEmails)
router.put("/:id", changeRole);

export default router;