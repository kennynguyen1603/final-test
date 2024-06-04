import { Router } from "express";
import filmController from "../controllers/filmController.js";
import { validateFilm } from "../middleware/validateFields.js";
import upload from "../config/multer.js";
import uploadAvatarFilm from "../middleware/uploadAvatarFilm.js";
const FilmRouter = Router();

FilmRouter.get("/", filmController.getAllFilms);

FilmRouter.post(
  "/",
  upload.single("image"),
  validateFilm,
  uploadAvatarFilm,
  filmController.createFilm
);

FilmRouter.put("/:id", filmController.updateFilm);

FilmRouter.delete("/:id", filmController.deleteFilm);

FilmRouter.get("/:id", filmController.getFilmById);

export default FilmRouter;
