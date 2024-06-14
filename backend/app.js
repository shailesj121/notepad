import Express from "express";
import cors from "cors";

const app = Express()

app.use(Express.json());
app.use(cors({
    origin: 'https://notepad-rho-pink.vercel.app',
    credentials: true,
}));

export default app


// Routes

import router from "./routes/notes.route.js";
import userRouter from "./routes/user.route.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware('/', {
    target: 'https://notepadbackend-shailesh-bishts-projects.vercel.app',
    changeOrigin: true, 
  });

app.use(bodyParser.json())
app.use(cookieParser());
app.use('/', apiProxy);
app.use("/api", router);
app.use("/auth", userRouter)