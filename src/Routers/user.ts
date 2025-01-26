import { Router } from "express";
import { register, login } from "../Controllers/user";
import { authorization } from "../Middleware/authorization";

const UsersRoute = Router();

UsersRoute.post("/register", register);
UsersRoute.post("/login", login);

// UsersRoute.post("/login", authorization, login);


export default UsersRoute;