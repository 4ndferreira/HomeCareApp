import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "../../patient/entities/Patient.js";
import { Caregiver } from "../../caregiver/entities/Caregiver.js";

@Entity({ name: "REVIEWS", schema: "public" })
export class Review {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;
  @Column({ name: "RATING", type: "int", nullable: false })
  rating!: number;
  @Column({ name: "COMMENT", type: "varchar", length: 250, nullable: true })
  comment?: string;
  @Column({ name: "ID_PATIENT", type: "varchar" })
  idPatient!: number;
  @Column({ name: "ID_CAREGIVER", type: "varchar" })
  idCaregiver!: number;
  @CreateDateColumn({name: "CREATED_AT"})
  createdAt!: Date;
  @UpdateDateColumn({ name: "UPDATED_AT" })
  updatedAt!: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "ID_PATIENT" })
  patient!: Patient;

  @ManyToOne(() => Caregiver)
  @JoinColumn({ name: "ID_CAREGIVER" })
  caregiver!: Caregiver;
}
