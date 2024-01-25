import { Router } from "express";
import notecontroller from "../controllers/notes.controller.js";

const router = Router()

router.route("/notes").post(notecontroller)

export default router