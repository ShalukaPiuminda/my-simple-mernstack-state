import express, { Router } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use('/api/user',useRouter)
app.use('/api/auth',authRouter);


app.use((err,req,res,next)=>{
  const statuscode=err.statuscode||500;
  const message=err.message||"Internaml server error";
  return res.status(statuscode).json({
    success:false,
    statuscode,
    message,
  });
});