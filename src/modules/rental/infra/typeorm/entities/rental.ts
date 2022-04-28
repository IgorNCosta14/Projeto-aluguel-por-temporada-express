import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Property } from "@modules/property/infra/typeorm/entities/property";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
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

  @Column()
  endDate: Date;
  
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
