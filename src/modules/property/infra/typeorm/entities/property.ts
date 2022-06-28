import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Address } from "./address";

@Entity("properties")
class Property {
  @PrimaryColumn()
  id: string;

  @Column()
  propertyName: string;

  @Column()
  propertyOwner: string;

  @Column()
  description: string;

  @Column()
  propertyAddressId: number;

  @ManyToOne(() => Address)
  @JoinColumn({ name: "propertyAddressId" })
  address: Address;

  @Column()
  propertyNumber: string;

  @Column()
  typeProperty: string;

  @Column()
  available: boolean;

  @Column()
  dailyRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
  
  @Column()
  lateFee: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Property };
