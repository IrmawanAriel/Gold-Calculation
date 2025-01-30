import { Request, Response } from "express";
import { inputDataI } from "../Models/Data/InputData";
import { DataInputHistory } from "../Repositories/dataInput";

export const handleInputData = async (req: Request<{},{},inputDataI>, res: Response): Promise<void> => {
    const {body} = req

    try {
        const result = await DataInputHistory(body)

        res.status(200).json({
            data: result
        })
        
    } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        }
        res.status(500).json({
          msg: "error",
          err: "gagal menyimpan data history",
        });
      }

}