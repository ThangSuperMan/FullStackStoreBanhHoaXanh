import { Request, Response, NextFunction } from "express";
import Snack from "../models/snack.model";
import multer from "multer";
import path from "path";

export function pageAddSnack(req: Request, res: Response, next: NextFunction) {
	res.status(200).render("add_snack");
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

interface TypeSnack {
	nameSnack: string;
	priceSnack: number;
	imageSnack: string;
}

interface TypeSnackWithoutId {
	nameSnack: string;
	priceSnack: number;
	imageSnack: string;
}

export async function addSnack(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//console.log("Add snack method");
	const nameSnack: string = req.body.nameSnack;
	const priceSnack: number = req.body.priceSnack;
	const imageSnack: string = filename;

	const infoSnack: TypeSnackWithoutId = {
		nameSnack: nameSnack,
		priceSnack: priceSnack,
		imageSnack: imageSnack,
	};

	try {
		const [addSnack] = await Snack.addSnack(infoSnack);
		res.status(201).send("Add snack sucessfully");
	} catch (e: any) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
}
