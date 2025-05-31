import { ReviewRepository } from "../repositories/ReviewRepository.js";
import { PatientRepository } from "../repositories/PatientRepository.js";
import { Review } from "../models/review/entities/Review.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { GetReviewResponse } from "../models/review/dtos/GetReviewResponse.js";
import toGetReviewResponse from "../models/review/mappers/ToGetReviewResponse.js";
import { singleton } from "tsyringe";

@singleton()
export class ReviewService {
  constructor(
    private repository: ReviewRepository,
    private patientRepository: PatientRepository
  ) {}

  async getAll(
    idCaregiver: number | undefined,
    idPatient: number | undefined
  ): Promise<GetReviewResponse[]> {
    const where: any = {};
    if (idCaregiver) where.idCaregiver = idCaregiver;
    if (idPatient) where.idPatient = idPatient;

    const reviews = await this.repository.findAll({
      where,
      relations: { patient: { user: true } },
    });

    const detailedReviews = await Promise.all(
      reviews.map(async (review) => {
        const idPatient = review.idPatient;
        try {
          const patient = await this.patientRepository.findOne({
            where: { id: idPatient },
          });
          if (!patient) throw new Error("Patient not found");

          return toGetReviewResponse(review);
        } catch (e) {
          console.error("Error processing review:", e);
          return null;
        }
      })
    );

    return detailedReviews.filter((r): r is GetReviewResponse => r !== null);
  }

  async getById(id: number): Promise<GetReviewResponse | null> {
    const review = await this.repository.findOne({
      where: { id },
      relations: { patient: true },
    });
    if (!review) throw new NotFoundError("Review not found");

    return toGetReviewResponse(review);
  }

  async create(reviewData: Partial<Review>): Promise<Review> {
    return this.repository.createAndSave(reviewData);
  }

  async update(id: number, reviewData: Partial<Review>): Promise<boolean> {
    return this.repository.update(id, reviewData);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
