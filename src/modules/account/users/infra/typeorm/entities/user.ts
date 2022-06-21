import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Permission } from "./permission";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userPermission: number;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: "userPermission" })
  permission: Permission;

  @Column()
  activeUser: boolean;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.userPermission = 1;
      this.activeUser= true;
    }
  }
}

export { User };
