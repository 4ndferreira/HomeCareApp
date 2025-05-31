import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "../../patient/entities/Patient.js";
import { Caregiver } from "../../caregiver/entities/Caregiver.js";
import { AppointmentStatus } from "../enums/AppointmentStatus.js";
import { Address } from "../../address/entities/Address.js";

@Entity({ name: "APPOINTMENTS", schema: "public" })
export class Appointment {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;
  @Column({ name: "SCHEDULED_AT", type: "timestamp", nullable: false })
  scheduledAt!: Date;
  @Column({ name: "ID_PATIENT", type: "int", nullable: false })
  idPatient!: number;
  @Column({ name: "ID_CAREGIVER", type: "int", nullable: false })
  idCaregiver!: number;
  @Column({ name: "ID_ADDRESS",type: "int", nullable: false })
  idAddress!: number;
  @Column({
    name: "STATUS",
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
    nullable: false,
  })
  status!: AppointmentStatus;
  @CreateDateColumn({name: "CREATED_AT"})
  createdAt!: Date;
  @UpdateDateColumn({ name: "UPDATED_AT" })
  updatedAt!: Date;

  @ManyToOne(() => Patient, {onDelete: "CASCADE"})
  @JoinColumn({ name: "ID_PATIENT" })
  patient!: Patient;

  @ManyToOne(() => Caregiver, {onDelete: "CASCADE"})
  @JoinColumn({ name: "ID_CAREGIVER" })
  caregiver!: Caregiver;

  @ManyToOne(() => Address, (address) => address.appointments, {
    nullable: false,
  })
  @JoinColumn({ name: "ID_ADDRESS" })
  address!: Address;
}
