import { Request,Response,NextFunction } from "express"
import { RequestHandler } from "express";
export function tryCatch(codeBlock:RequestHandler ){
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            await codeBlock(req,res,next);
        }
        catch(error){
            next(error)

        }

    }

}