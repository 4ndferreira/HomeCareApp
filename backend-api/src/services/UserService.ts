import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "../models/user/entities/User.js";
import { GetUserResponse } from "../models/user/dtos/GetUserResponse.js";
import { toGetUserResponse } from "../models/user/mappers/ToGetUserResponse.js";
import { singleton } from "tsyringe";

@singleton()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<GetUserResponse[]> {
    const users = await this.userRepository.findAll();

    return users.map(toGetUserResponse);
  }

  async getUserById(id: number): Promise<GetUserResponse | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    return toGetUserResponse(user);
  }

  async getByFirebaseUid(uid: string): Promise<GetUserResponse | null> {
    const user = await this.userRepository.findByFirebaseUid(uid);
    if (!user) return null;

    return toGetUserResponse(user);
  }

  async createUser(firebaseUid: string, userData: Partial<User>) {
    const existingUser = await this.userRepository.findByFirebaseUid(
      firebaseUid
    );
    if (existingUser) throw new Error("User already registered.");

    const userToCreate = {
      ...userData,
      firebaseUid,
    };
    return this.userRepository.createAndSave(userToCreate);
  }

  updateUser(id: number, userData: Partial<User>) {
    return this.userRepository.update(id, userData);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
