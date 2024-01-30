import { Router } from "express";
import {notecontroller, noteGetController} from "../controllers/notes.controller.js";
import { deleteNoteController } from "../controllers/notes.controller.js";

const router = Router()
router.route("/notes").delete(deleteNoteController)
router.route("/notes").post(notecontroller)
router.route("/getNotes").get(noteGetController)


export default router