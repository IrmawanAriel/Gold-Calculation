import { NextFunction, Request, RequestHandler, Response } from "express";
import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { usersRegistration } from "../Models/User/user";

export const jwtOptions: SignOptions = {
  // expiresIn: "10m", // token akan hangus dalam 6 menit
  issuer: process.env.JWT_ISSUER,
};

export const authorization: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const bearerToken = req.header("Authorization");
  const idParam = req.params.id;

  if (!bearerToken) {
    res.status(401).json({
      msg: "forbidden",
      err: "Akses tidak diperbolehkan",
    });
    return;
  }

  const token = bearerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, jwtOptions);
    // You can add additional checks here if needed
    next();
  } catch (err) {
    res.status(401).json({
      msg: "forbidden",
      err: "Token tidak valid",
    });
  }
};