import Joi from "joi";

export const userRegistrationValdation = Joi.object({
    userName: Joi.string().pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/).required(),
    age:Joi.number(),
    name:Joi.string().required(),
    password:Joi.string().min(8).required(),
    email:Joi.string().email().required(),
    location:Joi.string(),
})
