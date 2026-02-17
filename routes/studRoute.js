const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth");
const student = require("../models/student");
const {body,validationResult}=require("express-validator");

//create
router.post("/",authMiddleware,
    [
        body("studentId").notEmpty().withMessage("Student ID is required"),
        body("firstName").notEmpty().withMessage("First Name is required"),
        body("lastName").notEmpty().withMessage("Last Name is required"),
        body("email").isEmail().withMessage("Valid Email is required"),
        body("course").notEmpty().withMessage("Course is required"),
        body("year").isInt({min:1,max:4}).withMessage("Year must be between 1 and 4"),
        body("gpa").isFloat({min:0,max:10}).withMessage("Enter valid cgpa")
    ],
    
    async(req,res)=>{
    try{


        if(req.user.role!=="admin"){
            return res.status(403).json({message:"Admins only"});
        }

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:errors.array()
            });
        }
        const {
            studentId,
            firstName,
            lastName,
            email,
            phone,
            course,
            year,
            gpa,
            address
        }=req.body;

        const existingStu=await student.findOne({$or:[{email},{studentId}]});

        if(existingStu){
            return res.status(400).json({
                success:false,
                message:"Student already exists"
            })
        }

        const newstudent=new student({
            studentId,
            firstName,
            lastName,
            email,
            phone,
            course,
            year,
            gpa,
            address
        });

        await newstudent.save();

        res.status(201).json({
            success:true,
            message:"Student added successfully",
            student
        });
    }
    catch(err){
        success:false,
        res.status(500).json({message:err.message});
    }
});

//pagination
router.get("/",authMiddleware,async(req,res)=>{
    try{
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||5;
        const skip=(page-1)*limit;
        const search=req.query.search||"";
        const course=req.query.course;

        let query ={};
        if(search){
            query.$or=[
                {firstName:{$regex:search,$options:"i"}},
                {lastName:{$regex:search,$options:"i"}}
            ];
        }

        if(course){
            query.course=course;
        }

         const students=await student.find(query).skip(skip).limit(limit);
         const total=await student.countDocuments(query);


        res.status(200).json({
            totalStudents:total,
            currentPage:page,
            totalPages:Math.ceil(total/limit),
            students
        });

    }
    catch(err){
        success:false,
        res.status(500).json({message:err.message});
    }
});

//get student
router.get("/:id",authMiddleware,async(req,res)=>{
    try{
        const getstudent=await student.findById(req.params.id);
        if(!getstudent){
            return res.status(404).json({message:"Student not found"});
        }

        res.status(200).json(getstudent);
    }
    catch(err){
        success:false,
        res.status(500).json({message:err.message});
    }
});

//update
router.put("/:id",authMiddleware,async(req,res)=>{
    try{

        if(req.user.role!=="admin"){
            return res.status(403).json({message:"Admins only"});
        }
        const updateStu=await student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument:`after`,
                runValidators:true
            }
        );

        if(!updateStu){
            return res.status(404).json({message:"Student not found"});
        }

        res.status(200).json({
            success:true,
            message:"Student updated successfully",
            updateStu
        });

    }
    catch(err){
        success:false,
        res.status(500).json({message:err.message});
    }
});

//delete
router.delete("/:id",authMiddleware,async(req,res)=>{
    try{

        if(req.user.role!=="admin"){
            return res.status(403).json({message:"Admins only"});
        }
        const delStu=await student.findByIdAndDelete(req.params.id);
        if(!delStu){
            return res.status(404).json({message:"Student not found"});
        }
        res.status(200).json({message:"Student deleted successfully"});
    }
    catch(err){
        success:false,
        res.status(500).json({message:err.message});
    }
});

module.exports=router;