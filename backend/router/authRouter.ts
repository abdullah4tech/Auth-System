import { Router } from "express";
import signupController from "../controllers/signup";
import LoginController from "../controllers/login";
import authController from "../controllers/auth";

const routes = Router()

routes.post('/login', LoginController)
routes.post('/signup', signupController)
routes.post('/auth', authController)

export default routes