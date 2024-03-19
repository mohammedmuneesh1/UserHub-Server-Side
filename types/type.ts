import { Request } from "express";
import Joi from "joi";
import { ObjectId } from "mongoose";

interface UserRegistration  {
  userName: string;
  Age?: number;
  Name: String;
  Password: string;
}
export interface UserData {
  _id: ObjectId,
    userName:string,
    age?:number,
    name:string,
    password:string,
    email?:string,
    location?:string,
}

// Define a new interface that extends the express.Request interface
export interface checkAuthData extends Request {
  Id:string
}

  // Define an interface for the validation schema
export interface UserRegistrationValidationSchema {
  userName: Joi.StringSchema
  age?: Joi.NumberSchema;
  name: Joi.StringSchema;
  password: Joi.StringSchema;
}