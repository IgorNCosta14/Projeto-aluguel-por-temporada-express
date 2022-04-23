import { container } from "tsyringe";

import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { PropertiesRepository } from "@modules/property/infra/typeorm/repositories/PropertiesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPropertiesRepository>(
  "PropertiesRepository",
  PropertiesRepository
);

