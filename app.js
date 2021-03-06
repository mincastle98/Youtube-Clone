import express from "express";
import morgan from "morgan"; //logging을 체크
import helmet from "helmet"; //기초적인 보안
import cookieparser from "cookie-parser"; //유저로부터 받은 cookie를 이해하는 방식
import bodyparser from "body-parser"; //서버가 유저로부터 받은 데이터(form)를 이해하는 방식
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.set("view engine", "pug");

app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
});

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); //누군가 /user 경로에 접속하면 userRouter 전체를 사용
app.use(routes.videos, videoRouter);

export default app; //내 파일을 import하면 app object를 주겠다는 의미
