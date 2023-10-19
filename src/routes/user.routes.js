import { Router } from "express";
import { postUser } from "../controllers/user/postUser.js"
import { login } from "../controllers/user/login.js"
import { followers, followering } from "../controllers/user/followers.js"


const userRouter = Router()

userRouter.post("/register", postUser)
userRouter.post("/login", login)

// Likes a usuarios
userRouter.post("/follower",followering )
userRouter.post("/follower/:id",followers )


export default userRouter;