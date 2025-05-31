import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "USERS", schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;
  @Column({ name: "FIREBASE_UID", type: "char", length: 28, nullable: false, unique: true })
  firebaseUid!: string;
  @Column({ name: "NAME", type: "varchar", length: 150, nullable: false })
  name!: string;
  @Column({ name: "EMAIL", type: "varchar", length: 150, nullable: false })
  email!: string;
  @Column({ name: "PHONE_NUMBER",type: "varchar", length: 15, nullable: false })
  phoneNumber!: string;
  @Column({ name: "CPF", type: "varchar", length: 11, nullable: false })
  cpf!: string;
  @Column({ name: "URL_IMAGE", type: "varchar", nullable: true, length: 150 })
  urlImage?: string | null;
  @Column({ name: "IS_PATIENT", type: "boolean", nullable: false })
  isPatient!: boolean;
  @CreateDateColumn({name: "CREATED_AT"})
  createdAt!: Date;
  @UpdateDateColumn({ name: "UPDATED_AT" })
  updatedAt!: Date;
}