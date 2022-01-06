import express from "express";
import * as adminController from "../controllers/admin.controller";

const upload = adminController.uploadImage();
const router = express.Router();

// http://localhost:3000/admin/
router.get("/", adminController.adminPage);

// http://localhost:3000/admin/delete_snack
router.get("/edit_snack/:snackId", adminController.updateSnackPage);
router.post(
	"/edit_snack",
	upload.single("imageSnack"),
	adminController.editSnack
);

// http://localhost:3000/admin/delete_snack
router.post("/delete_snack", adminController.deleteSnack);

export default router;
