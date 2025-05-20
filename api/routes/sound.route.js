import express from 'express';
import { getAllSounds } from '../controller/sound.controller.js';

const router = express.Router();

router.get('/', getAllSounds);

export default router;
