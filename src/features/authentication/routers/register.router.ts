import { Router } from "express";
import { registerUserController } from "../controllers/register.controller";

const registerRouter = Router();

registerRouter.post("/", registerUserController);

export default registerRouter;