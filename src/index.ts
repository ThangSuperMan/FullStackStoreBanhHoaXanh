import express from "express";
import config from "../config/config";
import path from "path";
import homeRouter from "./routes/home.router";
import adminRouter from "./routes/admin.router";
import addSnackPage from "./routes/snack.router";
import * as errorController from "./controllers/error.controller";
//import dotenv from "dotenv";

const app = express();
var port = config.port || 5000;
// Setup getting data form from html
app.use(express.urlencoded({ extended: true }));

// Setup public files
app.use(express.static("src/public"));

// Configure Express to uses EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", homeRouter);

app.use("/admin", adminRouter);

app.use("/admin", adminRouter);

app.use("/admin/add_snack", addSnackPage);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(process.env.PORT || 3001, () => {
	console.log(`Server is running on the port: ${port}`);
});
