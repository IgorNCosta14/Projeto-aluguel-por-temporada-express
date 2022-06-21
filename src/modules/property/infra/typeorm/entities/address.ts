import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("address")
class Address {
    @PrimaryColumn()
    id: number

    @Column()
    zipCode: string

    @Column()
    country: string

    @Column()
    state: string

    @Column()
    city: string

    @Column()
    street: string
}

export { Address }