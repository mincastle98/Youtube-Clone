import express from "express";

export const userRouter = express.Router();

//Route를 쪼개서 관리 가능
userRouter.get("/", (req, res) => res.send("user Index"));
userRouter.get("/edit", (req, res) => res.send("user Edit"));
userRouter.get("/password", (req, res) => res.send("user Password"));

