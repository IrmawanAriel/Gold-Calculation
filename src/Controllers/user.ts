import e, { Request, Response } from "express";
import { loginUser, getUserByIdOnly, registerUser } from "../Repositories/user";
import { usersReq, usersLogin, usersRegistration } from "../Models/User/user";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { payloadInterface } from "../Models/User/payload";
import { jwtOptions } from "../Middleware/authorization";
import { IUsersRes } from "../Models/response";

export const UserById = async (
  req: Request<{ id: number }, {}, usersReq>,
  res: Response<IUsersRes>
) => {
  try {
    const id = req.params.id;
    const result = await getUserByIdOnly(id.toString());
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "data tak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "sucses",
      data: result.rows,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "error",
      err: "gagal mengambil user",
    });
  }
};

export const login = async (req: Request<{}, {}, usersLogin>, res: Response<{ msg: string; id?: number; err?: string; data?: { token: string; }[]; }>): Promise<any> => {

  try {
    const { email, password } = req.body;
    const checkUser = await loginUser(email);

    //error handling jika no user
    if (!checkUser.rows.length) throw new Error("No user has found.");

    //jika ditemukan usernya
    const {
      password: hashedPwd,
      username,
      id,
    } = checkUser.rows[0];
    const checkPass = await bcrypt.compare(password, hashedPwd);

    //error handling jika no pass match
    if (!checkPass) throw new Error("login gagal");

    //jika cocok maka beri payload
    const payload: payloadInterface = {
      email,
      id
    };

    const token = Jwt.sign(payload, <string>process.env.JWT_SECRET, jwtOptions);
    return res.status(200).json({
      msg: "selamat datang, " + username,
      id: id,
      data: [{ token }],
    });
  } catch (error) {
    if (error instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(error.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "Siswa tidak ditemukan",
        });
      }

      return res.status(401).json({
        msg: "Error",
        err: error.message,
      });
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

// buat register
export const register = async (req: Request<{}, {}, usersRegistration>, res: Response): Promise<any> => {
  const { email, password, username } = req.body;

  // Validate input
  if (!email || !password || !username) {
      return res.status(400).json({
          msg: 'Email, username, and password are required',
      });
  }
  if (typeof password !== 'string') {
      return res.status(400).json({
          msg: 'Password must be a string',
      });
  }

  try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      console.log("salah di db")
      // Save to the database
      const result = await registerUser(req.body, hashed);

      if (result.rowCount !== 1) {
          return res.status(404).json({
              msg: 'Gagal register, isi data dengan benar',
              data: [],
          });
      }

      res.json({ msg: "register successful"});
  } catch (err: unknown) {
      if (err instanceof Error) {
          if (err.message.includes('nilai kunci ganda melanggar batasan unik')) {
              return res.status(409).json({
                  msg: "Email sudah terdaftar",
                  err: "Duplicate email",
              });
          }
          console.error(err.message);
      }
      return res.status(500).json({
          msg: "Error",
          err: "Internal server error",
      });
  }
};
