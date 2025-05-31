import { GetReviewResponse } from "../dtos/GetReviewResponse.js";
import { Review } from "../entities/Review.js";

export default function toGetReviewResponse(
  review: Review
): GetReviewResponse {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    idCaregiver: review.idCaregiver,
    patient: {
      id: review.patient.id,
      name: review.patient.user.name,
      urlImage: review.patient.user.urlImage,
    },
  };
}
