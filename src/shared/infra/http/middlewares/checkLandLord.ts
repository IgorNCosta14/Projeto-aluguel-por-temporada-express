import { UsersRepository } from "@modules/account/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function checkLandLord(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if ((user.permission.isLandlord === false) && (user.permission.isAdmin === false)) {
    throw new AppError("User isn't Landlord!");
  }

  return next();
}
