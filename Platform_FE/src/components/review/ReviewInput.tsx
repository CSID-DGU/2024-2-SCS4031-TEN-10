import { useState } from "react";
import classes from "./css/Review.module.css";
import { showErrorToast, showSuccessToast } from "@/hooks/useCustomToast";
import customAxios from "@/utils/customAxios";

export default function ReviewInput(props: any) {
  const { festivalIndex, getList } = props;
  const [reviewContent, setReviewContent] = useState("");

  function postReview() {
    if (!reviewContent.trim()) return;

    const postData = {
      review_content: reviewContent,
      festival_idx: festivalIndex,
    };

    customAxios({
      method: "POST",
      url: `/reviews`,
      data: postData,
    })
      .then(async (res: any) => {
        if (res.data.result) {
          showSuccessToast("후기가 등록되었습니다.");
          getList();
        }
      })
      .catch(() => {
        showErrorToast(
          "후기 등록 중 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
        );
      });

    setReviewContent("");
  }

  return (
    <div className={classes["review_post_div"]}>
      <input
        placeholder="후기를 입력해주세요."
        onInput={(e: any) => setReviewContent(e.target.value)}
        value={reviewContent}
      />
      <button
        className={reviewContent == "" ? classes["disable"] : undefined}
        onClick={postReview}
      >
        등록
      </button>
    </div>
  );
}
