interface ICreateUsersDTO {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  created_at?: Date;
}

export { ICreateUsersDTO }
