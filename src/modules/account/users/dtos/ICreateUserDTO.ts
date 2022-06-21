interface ICreateUsersDTO {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  userPermission?: string;
  activeUser?: boolean;
  createdAt?: Date;
}

export { ICreateUsersDTO }
