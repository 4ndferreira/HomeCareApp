import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "../../user/entities/User.js";


@Entity({ name: "PATIENTS", schema: "public" })
export class Patient {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;
  @Column({ name: "ID_USER", type: "int", nullable: false })
  idUser!: number;
  @Column({ name: "NAME", type: "varchar", length: 150, nullable: false })
  name!: string;
  @Column({ name: "CPF", type: "varchar", length: 11, nullable: false, unique: true })
  cpf!: string;
  @Column({ name: "BIRTH_DATE", type: "date", nullable: false })
  birthDate!: Date;
  @CreateDateColumn({name: "CREATED_AT"})
  createdAt!: Date;
  @UpdateDateColumn({ name: "UPDATED_AT" })
  updatedAt!: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "ID_USER" })
  user!: User;
}
