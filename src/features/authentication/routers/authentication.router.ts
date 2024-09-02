import { Router } from "express";
import registerRouter from "./register.router";
import loginRouter from "./login.router";

const authenticationRouter = Router();

authenticationRouter.use("/register", registerRouter);
authenticationRouter.use("/login", loginRouter);

export default authenticationRouter;