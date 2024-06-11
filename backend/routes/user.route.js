import { Router } from "express";
import { UserSignup, loginUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/signup").post(UserSignup) 
router.route("/login").post(loginUser)

export default router
