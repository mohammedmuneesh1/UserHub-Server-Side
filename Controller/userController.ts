
import { STATUS } from "../constants/constant";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import userCollection from "../Model/User";
import bcrypt from "bcrypt";
import { verify } from "crypto";
import { UserData, checkAuthData } from "../types/type";

//________________________User Register______________________________________________________________
export async function userRegister(req:Request,res:Response):Promise<Response> {
    const obj = req.body;
    console.log(req.body);
    const data = await userCollection.findOne({userName:obj.userName})
    if(data){
       return res.status(403).json({status:STATUS.FAILURE,message:"Username already taken. please choose another name"})
    }
    obj.password = await bcrypt.hash(obj.password,10);
    await userCollection.create(obj)
    return res.status(200).json({status:STATUS.SUCCESS,message:"user registered successfully1."}) 
}

//__________________________user Login ________________________________________________________________
export async function userLogin(req:Request,res:Response):Promise<Response>{
    const {userName,password} = req.body;
    const userData:UserData = await userCollection.findOne({ userName }).select("-__v")
    if(!userData){
        return res.status(404).json({ status: STATUS.FAILURE, message: "User not found."});
    }
    const verifyUser = await bcrypt.compare(password,userData.password)
    if(!verifyUser){
        return res.status(401).json({status:STATUS.FAILURE, message:"Incorrect password."})
    }
    const token = jwt.sign({Id:userData._id.toString()},process.env.USER_KEY as string,{expiresIn:"1d"})
    return res.status(200).json({status:STATUS.SUCCESS,message:"user login successfully.",token})
}

//__________________View User Profile_____________________________________________________________
export async function viewProfile(req:Request,res:Response):Promise<Response>{
    const userId = (req as checkAuthData).Id;
    const data = await userCollection.findOne({_id:userId}).select("-__v -_id -password -updatedAt");
   return res.status(200).json({status:STATUS.SUCCESS,message:"user profile has been fetched successfully",data})
}

//__________________Update User Profile_____________________________________________________________
export async function updateProfile(req:Request,res:Response):Promise<Response>{
    const userId = (req as checkAuthData).Id;
    const obj = req.body;
    if(obj.userName){
        return res.status(403).json({status:STATUS.FAILURE,message:"user cant update username at current moment."})
    }
    if(obj.password){
        return res.status(403).json({status:STATUS.FAILURE,message:"updation has been failed due to presence of password"});
    }
    await userCollection.findByIdAndUpdate({_id:userId},{$set:obj});
    return res.status(200).json({status:STATUS.SUCCESS,message:"user profile has been updated successfully."})
}

//__________________User Home_____________________________________________________________
export async function userHome(req:Request,res:Response):Promise<Response>{
    return res.status(200).json({status:STATUS.SUCCESS,message:"welcome to home"})
}