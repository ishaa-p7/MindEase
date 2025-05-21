import express from "express";
import { askGroq } from "../controller/chatbot.controller.js";

const router = express.Router();


router.post("/chatbot", askGroq);

export default router;
