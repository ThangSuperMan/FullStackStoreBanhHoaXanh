import { Request, Response, NextFunction } from "express";
import Snack from "../models/snack.model";

export async function homepage(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const [snacks] = await Snack.fetchAll();
		console.log(snacks);
		res.status(200).render("index", { snacks });
	} catch (e: any) {
		console.log(e.statusCode);
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
}

