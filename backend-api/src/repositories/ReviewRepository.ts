import { DataSource } from "typeorm";
import { Review } from "../models/review/entities/Review.js";
import { singleton } from "tsyringe";
import { BaseRepository } from "./BaseRepository.js";

@singleton()
export class ReviewRepository extends BaseRepository<Review> {
  constructor(dataSource: DataSource) {
    super(dataSource, Review);
  }
}
