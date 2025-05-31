import { DataSource } from "typeorm";
import { Address } from "../models/address/entities/Address.js";
import { singleton } from "tsyringe";
import { BaseRepository } from "./BaseRepository.js";

@singleton()
export class AddressRepository extends BaseRepository<Address> {
  constructor(dataSource: DataSource) {
    super(dataSource, Address);
  }
}
