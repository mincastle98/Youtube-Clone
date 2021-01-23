import express from "express";
import morgan from "morgan"; //logging을 체크
import helmet from "helmet";    //기초적인 보안
import cookieparser from "cookie-parser";   //유저로부터 받은 cookie를 이해하는 방식
import bodyparser from "body-parser";   //서버가 유저로부터 받은 데이터(form)를 이해하는 방식
const app = express()

const PORT = 4000;

const handleListening = () =>
    console.log(`Listening on : http://localhost:${PORT}`);


const handleHome = (req, res) => res.send("Hello from my ass");

const handleProfile = (req, res) => res.send("You are on my profile");

//use 함수 하단에 존재하는 Route에 대해서만 middleware로서 작동
app.use(cookieparser());    
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: ture }));  
app.use(helmet());  
app.use(morgan("dev")); 

const middleware = (req, res, next) => {
    res.send("not happening");
}

app.get("/", middleware, handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);