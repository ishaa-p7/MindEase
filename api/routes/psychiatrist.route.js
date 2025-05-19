import express from 'express';
import { getPsychiatristsByCity } from '../controller/psychiatrist.controller.js';

const router = express.Router();

router.get('/', getPsychiatristsByCity);

export default router;
