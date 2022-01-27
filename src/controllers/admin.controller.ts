import { Request, Response, NextFunction } from "express";
import Snack from "../models/snack.model";
import multer from "multer";
import path from "path";

interface TypeSnack {
	id: number;
	nameSnack: string;
	priceSnack: number;
	imageSnack: string;
}

// Setup upload file image
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Variables
var filename: string;

export function uploadImage(): any {
	//console.log("upload file method ");
	const fileStorage = multer.diskStorage({
		destination: function (
			request: Request,
			file: Express.Multer.File,
			callback: DestinationCallback
		): void {
			callback(null, "src/public/images");
		},
		filename: function (
			request: Request,
			file: Express.Multer.File,
			callback: FileNameCallback
		): void {
			filename = `${Date.now() + path.extname(file.originalname)}`;
			console.log(filename);
			callback(null, filename);
		},
	});

	const upload = multer({
		storage: fileStorage,
	});

	// Return the upload variable
	return upload;
}

export async function adminPage(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const [snacks] = await Snack.fetchAll();
		console.log(snacks);
		res.status(200).render("admin", { snacks });
	} catch (e: any) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
}

export async function updateSnackPage(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const id: any = req.params.snackId;
	try {
		const [snack] = await Snack.fetchSnackById(id);
		const data = snack;

		console.log(`Info of snack: ${data}`);
		console.log(snack);
		res.status(200).render("update_snack", { snack });
	} catch (e: any) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
}

export async function editSnack(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const newInfoSnack: TypeSnack = {
		id: req.body.snackId,
		nameSnack: req.body.nameSnack,
		priceSnack: req.body.priceSnack,
		imageSnack: filename,
	};

	// Update snack with new snack image
	if (filename !== "") {
		try {
			await Snack.updateSnack(newInfoSnack);
			res.status(200).send("Update snack successfully");
		} catch (e: any) {
			if (!e.statusCode) {
				e.statusCode = 500;
			}
			next(e);
			// Update snack withouth new snack image
		}
	} else {
		try {
			await Snack.updateSnack(newInfoSnack);
			res.status(200).send("Update snack successfully");
		} catch (e: any) {
			if (!e.statusCode) {
				e.statusCode = 500;
			}
			next(e);
		}
	}
}

export async function deleteSnack(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const idSnack: any = request.body.snackId;
	try {
		await Snack.deleteSnack(idSnack);
		response.send("Delete okay");
	} catch (e: any) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		// Send the error for the handling method provide by express
		next(e);
	}
}
