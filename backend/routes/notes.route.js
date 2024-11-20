import { Router } from "express";
import { notecontroller, noteGetController, updateNoteController, deleteNoteController, pinNoteController } from "../controllers/notes.controller.js";

const router = Router()
router.route("/notes").delete(deleteNoteController)
router.route("/notes").post(notecontroller)
router.route("/getNotes").get(noteGetController)
router.route("/update").put(updateNoteController)
router.route("/pin").put(pinNoteController)
router.route("/signup").post()

export default router