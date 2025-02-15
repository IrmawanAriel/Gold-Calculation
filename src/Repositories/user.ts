import db from "../Config/pg";
import { QueryResult} from "pg";
import { usersGetId, usersRegistration } from "../Models/User/user";
import { historyI } from "../Models/Data/History";


export const getUserByIdOnly = (id : string ): Promise<QueryResult<usersGetId>> => {
    let query = "select username, email from users where id =$1  ";
    const values= [id];
    return db.query(query, values);
}

export const loginUser = (email: string): Promise<QueryResult<{id: number, username: string; password: string;}>> => {
    const Query = "select username, id , password from users where email = $1";
    const values = [email];
    
    return db.query(Query, values);
}

export const registerUser = (body: usersRegistration , hashed: string): Promise<QueryResult<usersRegistration>> => {

    let query = "insert into users (username, email, password) values ($1, $2, $3)";
    const values = [body.username, body.email, hashed];
    console.log(hashed)
    return db.query(query, values);
}

export const getHistory = (id: number): Promise<QueryResult<historyI>> => {
    let query = "select * from input_user where user_id = $1";
    const values = [id];
    return db.query(query, values);
}