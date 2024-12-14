/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { formatTime } from "@/utils/date";
import classes from "./css/Review.module.css";

export default function ReviewItem(props: any) {
  const { data } = props;
  const { review_content, create_date } = data;

  return (
    <div className={classes["review_item"]}>
      <img src="/image/default-user_image.png" />
      <div>
        <div className={classes["review_item__info"]}>
          <span className={classes["review_item__author"]}>홍길동</span>
          <span className={classes["review_item__date"]}>
            {formatTime(create_date)}
          </span>
        </div>
        <pre className={classes["review_item__content"]}>{review_content}</pre>
      </div>
    </div>
  );
}
