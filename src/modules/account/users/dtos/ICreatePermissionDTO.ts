interface ICreatePermissionDTO {
  id?: number;
  name: string;
  isLandlord?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
}

export { ICreatePermissionDTO };
