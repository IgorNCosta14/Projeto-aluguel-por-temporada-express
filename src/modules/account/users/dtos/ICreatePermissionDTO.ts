interface ICreatePermissionDTO {
  id?: string;
  name: string;
  isLandlord?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
}

export { ICreatePermissionDTO };
