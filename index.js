import express from "express";
const app = express()

const PORT = 4000;

const handleListening = () =>
    console.log(`Listening on : http://localhost:${PORT}`);


const handleHome = (req, res) => res.send("Hello from my ass");


const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
    console.log("I'm between");
    next();
}
app.use(betweenHome);   //use 함수 하단에 존재하는 Route에 대해서만 middleware로서 작동

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);