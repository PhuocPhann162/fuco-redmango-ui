import { reviewModel } from "../../../Interfaces";
import { useGetAllReviewsQuery } from "../../../Apis/reviewApi";
import { Comment } from "./Comment";

export const ReviewList = ({ menuItemId }: { menuItemId: number }) => {
  const { data, isLoading } = useGetAllReviewsQuery(menuItemId);

  return (
    <>
      {!isLoading && (
        <div className="mx-4 py-4">
          <span style={{ color: "#5D3D2E" }} className="fw-bold fs-5">
            Customer Comments
          </span>
          {data && data.result.length > 0 ? (
            data?.result.map((review: reviewModel) => (
              <Comment review={review} key={review.id} />
            ))
          ) : (
            <div className="text-muted mt-2">
              <br />
              No comments yet. Let us know about your review🍜
            </div>
          )}
        </div>
      )}
    </>
  );
};
