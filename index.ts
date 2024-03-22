import dotenv from 'dotenv';
dotenv.config();
import express,{ Express } from "express";
import mongoose from "mongoose";
// import{router as User} from "./Model/User"
import { router as User } from './routes/userRoute';
import { connectDB } from './config/db';
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
export const app:Express= express();
// This line creates an instance of the Express application.
//t represents the Express application object. 

const limiter = rateLimit({
    windowMs:  60 * 1000, // 15 minutes
    max: 10
  });

connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json({limit:"10mb"}));
app.use(limiter);

app.use("/user",User)




