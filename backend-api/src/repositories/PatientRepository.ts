import { DataSource, FindOneOptions } from "typeorm";
import { Patient } from "../models/patient/entities/Patient.js";
import { singleton } from "tsyringe";
import { BaseRepository } from "./BaseRepository.js";

@singleton()
export class PatientRepository extends BaseRepository<Patient> {
  constructor(dataSource: DataSource) {
    super(dataSource, Patient);
  }

  async findByUserId(
    options: FindOneOptions<Patient>
  ): Promise<Patient | null> {
    return await this.repo.findOne(options);
  }
}
