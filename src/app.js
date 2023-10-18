import express from "express"
import morgan  from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/index.routes.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(router)

export default app