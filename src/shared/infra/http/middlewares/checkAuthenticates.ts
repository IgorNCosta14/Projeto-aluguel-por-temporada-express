import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function checkAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHearder = request.headers.authorization;

  if (!authHearder) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHearder.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "e3928a3bc4be46516aa33a79bbdfdb08"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
