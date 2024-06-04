import { Router } from "express";
import UserRouter from "./userRouter.js";
import FilmRouter from "./filmRouter.js";

const rootRouter = Router();

rootRouter.use("/users", UserRouter);
rootRouter.use("/films", FilmRouter);

export default rootRouter;
