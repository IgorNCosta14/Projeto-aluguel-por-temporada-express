import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("properties")
class Rental {
  @PrimaryColumn()   //decorator  @
  id: string;

  @Column()
  propertyId: string;

  @Column()
  userId: string;

  @Column()
  totalRate: number;

  @CreateDateColumn()
  startDate: Date; 

  @Column()
  expected_return_date: Date;

  @CreateDateColumn()
  endDate: Date;
  
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
