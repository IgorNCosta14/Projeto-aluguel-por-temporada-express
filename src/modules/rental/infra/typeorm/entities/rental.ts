import { Property } from "@modules/property/infra/typeorm/entities/property";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("properties")
class Rental {
  @PrimaryColumn()   //decorator  @
  id: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: "propertyId" })
  property: Property;

  @Column()
  propertyId: string;

  @Column()
  userId: string;

  @Column()
  totalRate: number;

  @CreateDateColumn()
  startDate: Date; 

  @Column()
  expectedReturnDate: Date;

  @CreateDateColumn()
  endDate: Date;
  
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
