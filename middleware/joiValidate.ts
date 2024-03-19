import { Schema } from "joi";
import { NextFunction, Request,Response } from "express";
export  function joiValidation(schema:Schema){
    return async function (req:Request,res:Response,next:NextFunction){
        try {
            const validatedData = await schema.validateAsync(req.body);
            req.body = validatedData;
            next();
            
        }catch (error: any) {
            console.log(error.message);
            next(error.message);
        }
    }
}