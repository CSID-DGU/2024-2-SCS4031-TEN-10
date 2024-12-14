/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import classes from "./css/Review.module.css";
import ReviewInput from "./ReviewInput";
import ReviewItem from "./ReviewItem";

export default function Review(props: any) {
  const { festivalIndex, reviewList, getList } = props;

  return (
    <div className={classes["review"]}>
      <p className={classes["review_title"]}>{`후기 (${reviewList.length})`}</p>

      {/* 후기 목록 */}
      <div className={classes["review_list"]}>
        {reviewList.map((review: any) => (
          <ReviewItem key={`review_${review.review_idx}`} data={review} />
        ))}
      </div>

      {/* 후기 등록 */}
      <ReviewInput festivalIndex={festivalIndex} getList={getList} />
    </div>
  );
}
