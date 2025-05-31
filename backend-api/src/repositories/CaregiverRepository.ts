import { DataSource, FindOneOptions } from "typeorm";
import { Caregiver } from "../models/caregiver/entities/Caregiver.js";
import { singleton } from "tsyringe";
import { BaseRepository } from "./BaseRepository.js";

@singleton()
export class CaregiverRepository extends BaseRepository<Caregiver> {
  constructor(dataSource: DataSource) {
    super(dataSource, Caregiver);
  }

  async findByUserId(
    options: FindOneOptions<Caregiver>
  ): Promise<Caregiver | null> {
    return await this.repo.findOne(options);
  }
}
