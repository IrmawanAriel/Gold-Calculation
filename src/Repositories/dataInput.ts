import db from "../Config/pg";
import { QueryResult} from "pg";
import {inputDataI} from "../Models/Data/InputData"

export const DataInputHistory = (body: inputDataI): Promise<QueryResult> => {
    const query = `INSERT INTO input_user (
        user_id,
        berat_kering,
        berat_basah,
        berat_murni,
        penaikan_kadar,
        penurunan_kadar,
        menu,
        kadar_emas,
        hasil,
        nama_pelanggan
    ) VALUES (
        $1, 
        $2, 
        $3, 
        $4,  
        $5,  
        $6,
        $7,
        $8,
        $9,
        $10 
    )`;
    const value = [body.user_id, body.berat_kering, body.berat_basah, body.berat_murni, body.penaikan_kadar, body.penurunan_kadar, body.menu, body.kadar_emas, body.hasil, body.nama_pelanggan];
    return db.query(query, value);
}

