import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("properties")
class Property {
  @PrimaryColumn()   //decorator  @
  id: string;

  @Column()
  propertyName: string;

  @Column()
  description: string;

  @Column()
  zipCode: string;

  @Column()
  typeProperty: string;

  @Column()
  available: boolean;

  @Column()
  dailyRate: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Property };
