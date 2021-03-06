import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "@modules/property/infra/typeorm/entities/property";
import { User } from "@modules/account/users/infra/typeorm/entities/user";
import { v4 as uuidV4 } from "uuid";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: "propertyId" })
  property: Property;

  @Column()
  propertyId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @Column()
  totalRate: number;

  @Column()
  totalLateFee?: number;

  @CreateDateColumn()
  startDate: Date; 

  @Column()
  expectedReturnDate: Date;

  @Column()
  expectedTotalRate: number;

  @Column()
  endDate: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
