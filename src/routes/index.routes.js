import { Router } from "express";

import userRouter from "./user.routes.js"
import tweetRouter from "./tweet.routes.js"

const router = Router()

router.use("/", userRouter); 
router.use("/", tweetRouter); 

export default router;