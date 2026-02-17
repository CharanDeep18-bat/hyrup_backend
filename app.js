const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./configurations/db");

const app=express();
dotenv.config();

connectDB();
app.use(express.json());

const authRoutes=require("./routes/authRoute");
const studRoutes=require("./routes/studRoute");

app.use("/api/auth",authRoutes);
app.use("/api/students",studRoutes);

app.get("/",(req,res)=>{
    res.json({message:"Server is running"});
});

const PORT=process.env.PORT||3030;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});