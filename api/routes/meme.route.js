import express from "express";
import { generateMeme } from "../controller/meme.controller.js";

const router = express.Router();

router.post("/generate", generateMeme);

export default router;
