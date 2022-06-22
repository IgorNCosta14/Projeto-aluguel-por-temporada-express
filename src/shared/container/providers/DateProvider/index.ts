import { container } from "tsyringe";
import { IDateProvider } from "./IdateProvider";
import { DateProvider } from "./implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DateProvider
  );