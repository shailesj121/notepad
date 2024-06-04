import { Router } from "express";
import {notecontroller, noteGetController, updateNoteController, deleteNoteController} from "../controllers/notes.controller.js";

const router = Router()
router.route("/notes").delete(deleteNoteController)
router.route("/notes").post(notecontroller)
router.route("/getNotes").get(noteGetController)
router.route("/update").put(updateNoteController)




export default router