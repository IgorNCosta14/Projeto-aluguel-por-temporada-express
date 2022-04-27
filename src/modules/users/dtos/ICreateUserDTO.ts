interface ICreateUsersDTO {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
}

export { ICreateUsersDTO }
