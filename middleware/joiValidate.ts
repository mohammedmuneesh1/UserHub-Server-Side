import { Schema } from "joi";
import { NextFunction, Request,Response } from "express";
import { STATUS } from "../constants/constant";
export  function joiValidation(schema:Schema){
    return async function (req:Request,res:Response,next:NextFunction){
        try {
            const validatedData = await schema.validateAsync(req.body);
            req.body = validatedData;
            next();
            
        }catch (error: any) {
            return res.status(400).json({ status: STATUS.FAILURE, message:error.message });
        }
    }
}