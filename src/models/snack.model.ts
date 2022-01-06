import db from "../database/database";

interface TypeSnack {
	id: number;
	nameSnack: string;
	priceSnack: number;
	imageSnack: string;
}

interface TypeSnackWithoutId {
	nameSnack: string;
	priceSnack: number;
	imageSnack: string;
}

export default class Snack {
	// Properties
	public id: number;
	public nameSnack: string;
	public imageSnack: string;
	public priceSnack: number;

	constructor(
		id: number,
		nameSnack: string,
		imageSnack: string,
		priceSnack: number
	) {
		this.id = id;
		this.nameSnack = nameSnack;
		this.priceSnack = priceSnack;
		this.imageSnack = imageSnack;
	}

	public static fetchAll() {
		return db.execute("SELECT * FROM snacks");
	}

	public static fetchSnackById(id: number) {
		return db.execute("SELECT * FROM snacks where id = ?", [id]);
	}

	public static addSnack(infoSnack: TypeSnackWithoutId) {
		const sql =
			"INSERT INTO snacks (nameSnack, priceSnack, imageSnack) VALUES (?, ?, ?)";

		return db.execute(sql, [
			infoSnack.nameSnack,
			infoSnack.priceSnack,
			infoSnack.imageSnack,
		]);
	}

	public static updateSnack(newInfoSnack: TypeSnack) {
		//Update info without iamge
		if (!newInfoSnack.imageSnack) {
			//console.log("Update without image snack");
			//console.log(newInfoSnack.imageSnack);
			const sql =
				"UPDATE snacks SET nameSnack = ?, priceSnack = ? WHERE id = ?";
			return db.execute(sql, [
				newInfoSnack.nameSnack,
				newInfoSnack.priceSnack,
				newInfoSnack.id,
			]);

			// Update the info and the image snack
		} else {
			console.log("Update with image snack");

			const sql =
				"UPDATE snacks SET nameSnack = ?, priceSnack = ?, imageSnack = ? WHERE id = ?";
			return db.execute(sql, [
				newInfoSnack.nameSnack,
				newInfoSnack.priceSnack,
				newInfoSnack.imageSnack,
				newInfoSnack.id,
			]);
		}
	}

	public static deleteSnack(id: number) {
		return db.execute("DELETE FROM snacks WHERE id = ?", [id]);
	}
}
