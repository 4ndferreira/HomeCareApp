import { DataSource } from "typeorm";
import { User } from "../models/user/entities/User.js";
import { singleton } from "tsyringe";
import { BaseRepository } from "./BaseRepository.js";

@singleton()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }
 
  async findByFirebaseUid(uid: string): Promise<User | null> {
    return await this.repo.findOneBy({ firebaseUid: uid });
  }
}