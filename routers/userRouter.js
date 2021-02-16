import express from "express";
import {
  changePassword,
  editProfile,
  userDetail
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); //url에 :를 포함하고 있기 때문에 가장 마지막에 추가해줘야 함

export default userRouter;
