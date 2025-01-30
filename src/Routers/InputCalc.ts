import { Router } from "express";
import { authorization } from "../Middleware/authorization";
import {handleInputData} from  "../Controllers/inputData"

const input = Router();

input.post("/input", authorization, handleInputData);


export default input;