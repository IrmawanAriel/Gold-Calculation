import { Router } from "express";
import mailingrouter from "./mail";
import UsersRoute from "./user";
import input from "./InputCalc";

const MainRoute = Router();

MainRoute.use('/email', mailingrouter) ;
MainRoute.use('/user', UsersRoute);
MainRoute.use('/data', input )

export default MainRoute;

