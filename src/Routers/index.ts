import { Router } from "express";
import mailingrouter from "./mail";
import UsersRoute from "./user";

const MainRoute = Router();

MainRoute.use('/email', mailingrouter) ;
MainRoute.use('/user', UsersRoute)

export default MainRoute;

