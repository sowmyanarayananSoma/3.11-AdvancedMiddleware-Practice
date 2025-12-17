import enrollment from "../models/enrollment.js";
import express from "express";

const router = express.Router();

router.get("/", async(req,res,next)=>{
    try {
        const enrollments = await enrollment.find();
        res.json(enrollments);
    } catch (error) {
        next(error);
    }
});

router.get("/:name", async(req,res,next)=>{
    try {
        const enrollments = await enrollment.find({studentName:req.params.name});
        if(enrollments.length){
            res.json(enrollments);
        }else{
            const error = new Error("Student not found");
            error.status=404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
});
export default router;