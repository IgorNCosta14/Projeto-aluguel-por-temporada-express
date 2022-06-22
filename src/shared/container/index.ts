import { container } from "tsyringe";

import "@shared/container/providers/DateProvider"

import { UsersRepository } from "@modules/account/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/account/users/repositories/IUsersRepository";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { PropertiesRepository } from "@modules/property/infra/typeorm/repositories/PropertiesRepository";
import { RentalsRepository } from "@modules/rental/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { IPermissionsRepository } from "@modules/account/users/repositories/IPermissionsRepository";
import { PermissionsRepository } from "@modules/account/users/infra/typeorm/repositories/PermissionsRepository";
import { IAddressRepository } from "@modules/property/repositories/IAddressRepository";
import { AddressRepository } from "@modules/property/infra/typeorm/repositories/AddressRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPropertiesRepository>(
  "PropertiesRepository",
  PropertiesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IPermissionsRepository>(
  "PermissionsRepository",
  PermissionsRepository
);

container.registerSingleton<IAddressRepository>(
  "AddressRepository",
  AddressRepository
);