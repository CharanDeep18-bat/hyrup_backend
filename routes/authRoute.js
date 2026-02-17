const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/user");


//register route

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedpass=await bcrypt.hash(password,10);

        const user=new User({
            name,
            email,
            password:hashedpass,
            role
        });

        await user.save();

        const token=jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.status(201).json({
            message:"User registered successfully",
            token
        });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//login route
router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const token=jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.status(200).json({
            message:"Login successful",
            token
        });
    }
    catch(err){
        res.status(400).json({message:"err.message"})
    }
});

module.exports=router;