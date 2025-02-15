import { Router } from "express";
import { register, login, inputHistory } from "../Controllers/user";
import { authorization } from "../Middleware/authorization";

const UsersRoute = Router();

UsersRoute.post("/register", register);
UsersRoute.post("/login", login);
UsersRoute.get("/history", authorization, inputHistory);


export default UsersRoute;