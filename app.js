import express from "express";
import morgan from "morgan"; //logging을 체크
import helmet from "helmet";    //기초적인 보안
import cookieparser from "cookie-parser";   //유저로부터 받은 cookie를 이해하는 방식
import bodyparser from "body-parser";   //서버가 유저로부터 받은 데이터(form)를 이해하는 방식
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter"
import routes from "./routes";
const app = express()

//use 함수 하단에 존재하는 Route에 대해서만 middleware로서 작동
app.use(cookieparser());    
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));  
app.use(helmet());  
app.use(morgan("dev")); 

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);   //누군가 /user 경로에 접속하면 userRouter 전체를 사용
app.use(routes.videos, videoRouter);

export default app; //내 파일을 import하면 app object를 주겠다는 의미