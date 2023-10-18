import { Router } from "express";
import { getUsers } from "../controllers/user.js"

const userRoutes = Router()

userRoutes.post("/", getUsers)

export default userRoutes;