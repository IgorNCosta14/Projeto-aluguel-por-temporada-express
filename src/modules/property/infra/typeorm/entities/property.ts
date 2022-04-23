import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("properties")
class Property {
  @PrimaryColumn()
  id: string;

  @Column()
  propertyName: string;

  @Column()
  description: string;

  @Column()
  cep: string;

  @Column()
  type_of_property: string;

  @Column()
  available: boolean;

  @Column()
  daily_rate: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Property };
