interface ICreateUsersDTO {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  userPermission?: string;
  createdAt?: Date;
}

export { ICreateUsersDTO }
