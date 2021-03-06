import { UsersRepository } from "@modules/account/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function checkAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (user.permission.isAdmin === false) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
