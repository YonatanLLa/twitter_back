import { Router } from "express";
import { postUser } from "../controllers/user/postUser.js"

const userRoutes = Router()

userRoutes.post("/user", postUser)

export default userRoutes;