import { Router } from "express";
import signupController from "../controllers/signup";
import LoginController from "../controllers/login";
import authController from "../controllers/auth";
import LogoutController from "../controllers/logout";

const routes = Router()

routes.post('/login', LoginController)
routes.post('/signup', signupController)
routes.post('/auth', authController)
routes.post('/logout', LogoutController)

export default routes