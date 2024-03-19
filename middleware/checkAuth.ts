import { error } from "console";
import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { TokenExpiredError } from "jsonwebtoken";
import { checkAuthData } from "../types/type";
import { STATUS } from "../constants/constant";
export const checkAuth = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token || typeof token !== "string"){
            return res.status(403).json({status:"failure",message:"token not found"})
        }
        jwt.verify(token,process.env.USER_KEY as string,(err:any,decoded:any)=>{
        
            if(err){
                if(err instanceof TokenExpiredError){
                    return res.status(401).json({status:STATUS.FAILURE,message: "Token expired. Please log in again"})
                }
                return res.status(500).json({message:"error while verifying jwt token. login again"})
            }
             // Type assertion to inform TypeScript about the userName property
            (req as checkAuthData).Id = decoded.Id;
        })
        next(); 
    } catch (error) {
        next(error); // Pass any caught error to the global error handling middleware
    }


}