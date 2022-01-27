import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface ErrorWithStatus extends Error {
	status: number;
}

export function get404(req: Request, res: Response, next: NextFunction) {
	const error = new Error() as ErrorWithStatus;
	error.message = "Not found!";
	error.status = 404;
	next(error);
}

export function get500(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
}
