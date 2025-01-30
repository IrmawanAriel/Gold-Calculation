import db from "../Config/pg";
import { QueryResult} from "pg";
import {inputDataI} from "../Models/Data/InputData"

export const DataInputHistory = (body: inputDataI): Promise<QueryResult> => {
    const query = `INSERT INTO input_user (
        user_id,
        berat_kering,
        berat_basah,
        penaikan_kadar,
        penurunan_kadar,
        menu,
        hasil
    ) VALUES (
        $1, 
        $2, 
        $3, 
        $4,  
        $5,  
        $6,
        $7 
    )`;
    const value = [body.user_id, body.berat_kering, body.berat_basah, body.penaikan_kadar, body.penurunan_kadar, body.menu, body.hasil]
    return db.query(query, value);
}
