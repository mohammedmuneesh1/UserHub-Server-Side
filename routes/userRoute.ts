import express from "express"
import { updateProfile, userHome, userLogin, userRegister, viewProfile } from "../Controller/userController";
import { checkAuth } from "../middleware/checkAuth";
import { joiValidation } from "../middleware/joiValidate";
import { userRegistrationValdation } from "../config/joiValidation";
import { tryCatch } from "../middleware/tryCatch";

export const router = express.Router();



router.route("/registration").post(joiValidation(userRegistrationValdation),tryCatch(userRegister));
router.route("/login").post(tryCatch(userLogin));
router.route("/viewProfile").get(checkAuth,tryCatch(viewProfile));
router.route("/updateProfile").put(checkAuth,tryCatch(updateProfile));




