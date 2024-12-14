/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Review from "../review/Review";
import classes from "./css/FestivalDetail.module.css";

export default function FestivalDetail(props: any) {
  const { festivalIndex, festival, reviewList, getReviewList } = props;
  const {
    festival_name,
    festival_province,
    festival_city,
    festival_season,
    festival_type,
    festival_period,
    festival_location,
    festival_content,
  } = festival;

  return (
    <div className={classes["festival_detail"]}>
      {/* 타이틀 */}
      <div className={classes["festival_title"]}>
        <p>
          <span>{festival_type}</span>
          {festival_name}
        </p>
      </div>

      {/* 본문 */}
      <div className={classes["festival_content"]}>
        <div>
          <img src="/icon/calender-icon.svg" />
          <p>
            {festival_period} {festival_season}
          </p>
        </div>
        <div>
          <img src="/icon/explore-icon.svg" />
          <p>
            {festival_province} {festival_city}, {festival_location}
          </p>
        </div>
        {festival_content && <pre>{festival_content}</pre>}
      </div>

      {/* 리뷰 */}
      <Review
        festivalIndex={festivalIndex}
        reviewList={reviewList}
        getList={getReviewList}
      />
    </div>
  );
}
