import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import moodRoutes from './routes/mood.route.js';
import authRoutes from './routes/auth.route.js'

dotenv.config();


const app=express();
app.use(express.json());

app.use(cors());

app.use('/api/moods', moodRoutes);
app.use('/api/auth', authRoutes);

mongoose.
connect(process.env.MONGO).then(
    ()=>{console.log('connected');     
    })
    .catch((err)=>{
        console.log(err);
    });



app.listen(3000,()=>{
    console.log('Server running.');
});

 