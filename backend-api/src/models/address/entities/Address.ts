import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "../../appointment/entities/Appointment.js";

@Entity({ name: "ADDRESSES", schema: "public" })
export class Address {
  @PrimaryGeneratedColumn({name: "ID"})
  id!: number;
  @Column({ name: "ALIAS", type: "varchar", length: 15, nullable: false })
  alias!: string;
  @Column({ name: "STREET", type: "varchar", length: 150, nullable: false })
  street!: string;
  @Column({ name: "NUMBER", type: "varchar", length: 20, nullable: false })
  number!: string;
  @Column({ name: "COMPLEMENT", type: "varchar", length: 150, nullable: true })
  complement?: string | null;
  @Column({ name: "NEIGHBORHOOD", type: "varchar", length: 40, nullable: false })
  neighborhood!: string;
  @Column({ name: "CITY", type: "varchar", length: 40, nullable: false })
  city!: string;
  @Column({ name: "STATE", type: "varchar", length: 2, nullable: false })
  state!: string;
  @Column({ name: "POSTAL_CODE", type: "varchar", length: 9, nullable: false })
  postalCode!: string;
  @Column({ name: "COUNTRY", type: "varchar", length: 2, nullable: false })
  country!: string;
  @CreateDateColumn({name: "CREATED_AT"})
  createdAt!: Date;
  @UpdateDateColumn({ name: "UPDATED_AT" })
  updatedAt!: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.address)
  appointments!: Appointment[];
}
