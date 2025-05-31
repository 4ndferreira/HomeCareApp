import {Controller, Get, Route, Post, Body, Put, Delete, Path, Tags, Query,} from "tsoa";
import { ReviewService } from "../services/ReviewService.js";
import { GetReviewResponse } from "../models/review/dtos/GetReviewResponse.js";
import { ReviewRequest } from "../models/review/dtos/ReviewRequest.js";
import { CreateResponse } from "../models/shared/CreateResponse.js";
import { injectable } from "tsyringe";

@injectable()
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  constructor(private reviewService: ReviewService) { super() }
  /**
   * @summary Busca a lista de as avaliações na base
   * @param idCaregiver Filtra pelo ID do cuidador (Somente um filtro deve ser usado por consulta)
   * @param idCarePatient Filtra pelo ID do paciente
   * @returns Lista de todas as avaliações
   */
  @Get("/")
  public async getAll(
    @Query() idCaregiver?: number,
    @Query() idPatient?: number
  ): Promise<GetReviewResponse[]> {
    if (idCaregiver && idPatient)
      throw new Error("Only one filter should be used per consultation.");

    const reviews = await this.reviewService.getAll(idCaregiver, idPatient);
    return reviews;
  }
  /**
   * @summary Busca de uma avaliação pelo seu ID
   * @returns Retorna a avaliação consultada
   */
  @Get("/{id}")
  public async getById(@Path() id: number): Promise<GetReviewResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid review id: ${id}`);
    }
    const review = await this.reviewService.getById(id);
    if (!review) {
      this.setStatus(404);
      throw new Error("Review not found.");
    }
    return review;
  }
  /**
   * @summary Cria uma nova avaliação
   * @returns Retorna o ID da avaliação criada
   */
  @Post("/")
  public async create(@Body() data: ReviewRequest): Promise<CreateResponse> {
    const newReview = await this.reviewService.create(data);
    this.setStatus(201);
    return { id: newReview.id };
  }
  /**
   * @summary Atualiza uma avaliação
   */
  @Put("/{id}")
  public async update(
    @Path() id: number,
    @Body() data: ReviewRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid review id: ${id}`);
    }

    const updated = await this.reviewService.update(id, data);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no review associated with id ${id}.`);
    }
    this.setStatus(204);
  }
  /**
   * @summary Deleta a avaliação
   */
  @Delete("/{id}")
  public async remove(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid review id: ${id}`);
    }

    const deleted = await this.reviewService.delete(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error(`There is no review associated with id ${id}.`);
    }
    this.setStatus(204);
  }
}
