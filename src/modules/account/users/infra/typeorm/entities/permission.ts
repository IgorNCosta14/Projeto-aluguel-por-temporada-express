import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("permissions")
class Permission {
  @PrimaryColumn()
  id: string;

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
      this.id = uuidV4();
      this.isAdmin = false;
      this.isLandlord = false;
    }
  }
}

export { Permission };
