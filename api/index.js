import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
dotenv.config();
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=> {
    console.log("Connected to mongodb");
})
.catch((err)=> {
    console.log(err);
});

app.listen(3000,()=> {
    console.log("server os running on port 3000");
});

//api route
app.use("/api/user", userRouter);