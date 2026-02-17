const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    studentId:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    phone:{
        type:String,
        unique:true,
        required:true,
    },
    course:{
        type:String,
        enum:["IT","ECE","Computer Science","Mechanical","Civil","Biotech"],
        required:true
    },
    year:{
        type:Number,
        min:0,
        max:4,
    },
    gpa:{
        type:Number,
        min:0,
        max:10
    },
    address:{
        type:String
    }

},{timestamps:true});

module.exports=mongoose.model("Student",studentSchema);