import express from "express";
import * as snackController from "../controllers/snack.controller";

const router = express.Router();

const upload = snackController.uploadImage();

router.get("/", snackController.pageAddSnack);
router.post("/", upload.single("imageSnack"), snackController.addSnack);

export default router;
