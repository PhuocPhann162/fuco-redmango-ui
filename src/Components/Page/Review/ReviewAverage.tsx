import React, { useEffect } from "react";
import { useGetAverageReviewQuery } from "../../../Apis/reviewApi";
import StarRating from "../../UI/StarRating";

export const ReviewAverage = ({ menuItemId }: { menuItemId: number }) => {
  const { data, isLoading } = useGetAverageReviewQuery(menuItemId);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {!isLoading && data.result && (
        <div className="mx-4 py-4">
          <span style={{ color: "#5D3D2E" }} className="fw-bold fs-5">
            Overall Rating
          </span>
          <div className="d-flex align-items-center">
            <div className="fs-4 px-2">
              {data?.result.averageRating.toFixed(1)}
            </div>
            <StarRating
              defaultRating={parseInt(data?.result.averageRating.toFixed(1))}
              fontSize={0}
              size={24}
              disabled
            />
          </div>
          <span className="px-2 text-muted">
            ({data?.result.totalRating} rating)
          </span>
          <div className="d-grid gap-1 mt-2">
            <div className="d-flex align-items-center justify-content-between px-2">
              <div className="">
                <StarRating defaultRating={5} fontSize={0} size={16} disabled />
              </div>
              <div className="text-muted" style={{ fontSize: "16px" }}>
                ({data?.result.noFiveStars} Rating)
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between px-2">
              <div className="">
                <StarRating defaultRating={4} fontSize={0} size={16} disabled />
              </div>
              <div className="text-muted" style={{ fontSize: "16px" }}>
                ({data?.result.noFourStars} Rating)
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between px-2">
              <div className="">
                <StarRating defaultRating={3} fontSize={0} size={16} disabled />
              </div>
              <div className="text-muted" style={{ fontSize: "16px" }}>
                ({data?.result.noThreeStars} Rating)
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between px-2">
              <div className="">
                <StarRating defaultRating={2} fontSize={0} size={16} disabled />
              </div>
              <div className="text-muted" style={{ fontSize: "16px" }}>
                ({data?.result.noTwoStars} Rating)
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between px-2">
              <div className="">
                <StarRating defaultRating={1} fontSize={0} size={16} disabled />
              </div>
              <div className="text-muted" style={{ fontSize: "16px" }}>
                ({data?.result.noOneStar} Rating)
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
