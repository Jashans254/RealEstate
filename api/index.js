import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

// import path from 'path';
dotenv.config();
const app = express();

app.use(express.json());


// mongoose.connect('mongodb://127.0.0.1:27017/test')
// .then(()=> {
//     console.log("Connected to mongodb");
// })
// .catch((err)=> {
//     console.log(err);
// });

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});


app.listen(3000,()=> {
    console.log("server is running on port 3000");
});

//api route
app.use("/api/user", userRouter);
app.use("/api/auth" , authRouter);

//Middleware for error handling
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message||'Internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});


  