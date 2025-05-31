import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { User } from "../../user/entities/User.js";

@Entity({ name: "CAREGIVERS", schema: "public" })
export class Caregiver {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;
  @Column({ name: "ID_USER", type: "int", nullable: false })
  idUser!: number;
  @Column({ name: "COREN_NUMBER",type: "varchar", length: 25, nullable: false })
  corenNumber!: string;
  @Column({ name: "BIOGRAPHY", type: "varchar", length: 250, nullable: false })
  biography!: string;
  @CreateDateColumn({name: "CREATED_AT"})
  createdAt!: Date;
  @UpdateDateColumn({ name: "UPDATED_AT" })
  updatedAt!: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "ID_USER" })
  user!: User;
}
