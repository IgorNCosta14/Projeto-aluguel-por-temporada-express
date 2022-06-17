import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("permissions")
class Permission {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isLandlord: boolean;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.isAdmin = false;
      this.isLandlord = false;
    }
  }
}

export { Permission };
