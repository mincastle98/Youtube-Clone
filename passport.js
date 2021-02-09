import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

//serialization : 어떤 정보를 쿠키에 넣을지 정해주는 역할
//deserialization : 쿠키 정보를 어떻게 유저로 연결짓는 지 정해주는 역할
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
