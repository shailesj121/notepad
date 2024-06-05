import { Router } from "express";
import { SignupController } from "../controllers/signup.controller";

const router = Router()

router.route("/signup").post(SignupController)  

export default router
