import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler}from '../utils/error.js'
import jwt from 'jsonwebtoken';
export const signup = async(req,res,next)=> {
   const {username, email, password} =req.body;
   const hashedpassword = bcryptjs.hashSync(password,12);
   const newUser = new User({username, email, password:hashedpassword});
   try{
      await newUser.save();
   res.status(201).json("user created successfully");
   }
   catch(err){
      next(err);
   }
};

export const signin = async(req,res,next)=> {
   const {email, password}= req.body;
   try{
      const Validuser = await User.findOne({email});
      if(!Validuser) return next(errorHandler(404, "User not found"));
      const validPassword = bcryptjs.compareSync(password, Validuser.password);
      if(!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
      const token = jwt.sign({id:Validuser._id},process.env.JWT_SECRET );
      const { password :pass, ...rest }= Validuser._doc;
      res.cookie("access_token", token, {httpOnly:true, }).status(200).json(rest);
   }catch(err){
      next(err);
   }
};