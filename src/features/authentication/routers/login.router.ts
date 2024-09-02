import { Router } from "express";
import { loginAttemptController } from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.post("", loginAttemptController);

export default loginRouter;