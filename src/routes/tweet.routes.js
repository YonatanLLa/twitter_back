import { Router } from "express";
import {postTweet} from "../controllers/tweet/postTweet.js"

const tweetRouter = Router()

tweetRouter.post("/tweet", postTweet)

export default tweetRouter