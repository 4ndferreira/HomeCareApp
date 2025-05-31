import { DataSource } from "typeorm";
import { Appointment } from "../models/appointment/entities/Appointment.js";
import { singleton } from "tsyringe";
import { BaseRepository } from "./BaseRepository.js";

@singleton()
export class AppointmentRepository extends BaseRepository<Appointment> {
  constructor(dataSource: DataSource) {
    super(dataSource, Appointment);
  }
}
