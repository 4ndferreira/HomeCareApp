import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "../../user/entities/User";
import { Appointment } from "../../appointment/entities/Appointment";


@Entity({ name: "Patients", schema: "public" })
export class Patient {
  @PrimaryGeneratedColumn()
  idPatient!: number;
  @Column({ type: "int", nullable: false })
  idUser!: number;
  @Column({ type: "varchar", nullable: false })
  patientName!: string;
  @Column({ type: "varchar", nullable: false, unique: true })
  patientCpf!: string;
  @Column({ type: "date", nullable: false })
  patientBirthDate!: Date;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: "idUser" })
  user!: User;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments!: Appointment[];
}
