import { Body, Controller, Get, Path, Post, Put, Delete, Route, Tags, SuccessResponse, Security, Request } from "tsoa";
import { UserService } from "../services/UserService.js";
import { UserRequest } from "../models/user/dtos/UserRequest.js";
import { GetUserResponse } from "../models/user/dtos/GetUserResponse.js";
import { Request as ExRequest } from "express";
import { CreateResponse } from "../models/shared/CreateResponse.js";
import { injectable } from "tsyringe";

@injectable()
@Route("users")
@Tags("Users")
export class UserController extends Controller {
  constructor(private userService: UserService) { super() }
  /**
   * @summary Retorna todos os usuários cadastrados
   * @returns Lista de usuários e seus dados
   */
  @Get("/")
  public async getAllUsers(): Promise<GetUserResponse[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }
  /**
   * @summary Busca um usuário pelo seu ID
   * @returns Dados do usuário
   */
  @Get("/{id}")
  public async getUserById(@Path() id: number): Promise<GetUserResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }
    const user = await this.userService.getUserById(id);
    if (!user) {
      this.setStatus(404);
      throw new Error("User not found in database.");
    }
    return user;
  }
  /**
   * @summary Busca um usuário pelo firebase UID dele
   * @returns Dados do usuário
   */
  @Security("firebase")
  @Get("/firebase-user")
  public async getUserByFirebaseUid(
    @Request() req: ExRequest
  ): Promise<GetUserResponse> {
    const firebaseUid = req.user?.uid;

    if (!firebaseUid) {
      this.setStatus(401);
      throw new Error("Invalid or missing Firebase UID.");
    }

    const user = await this.userService.getByFirebaseUid(firebaseUid);
    if (!user) {
      this.setStatus(404);
      throw new Error("User not found in database.");
    }
    return user;
  }
  /**
   * @summary Cria um novo usuário
   * @returns Usuário criado com sucesso
   */
  @SuccessResponse("201", "Created")
  @Security("firebase")
  @Post("/")
  public async createUser(
    @Request() req: ExRequest,
    @Body() userData: UserRequest
  ): Promise<CreateResponse> {
    const firebaseUid = req.user?.uid;
    if (!firebaseUid) {
      this.setStatus(401);
      throw new Error("Invalid or missing Firebase UID.");
    }
    const user = await this.userService.createUser(firebaseUid, userData);
    this.setStatus(201);
    return { id: user.id };
  }
  /**
   * @summary Altera os dados de um usuário
   * @returns Usuário alterado com sucesso
   */
  @Security("firebase")
  @Put("/{id}")
  public async updateUser(
    @Path() id: number,
    @Body() userData: UserRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }
    const updated = await this.userService.updateUser(id, userData);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no user associated with id ${id}.`);
    }
    this.setStatus(204);
  }
  /**
   * @summary Remove o registro de um usuário da base
   * @returns Usuário removido com sucesso
   */
  @Security("firebase")
  @Delete("/{id}")
  public async deleteUser(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }

    const deleted = await this.userService.deleteUser(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error(`There is no user associated with id ${id}.`);
    }
    this.setStatus(204);
  }
}
