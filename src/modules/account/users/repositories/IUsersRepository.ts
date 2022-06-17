import { ICreateUsersDTO } from "../dtos/ICreateUserDTO"
import { User } from "../infra/typeorm/entities/user"

interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<User>;
    list(): Promise<User[]>;
    updateToLandLord(id: string): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findByCPF(cpf: string): Promise<User>;
    findByName(name: string): Promise<User[]>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository }