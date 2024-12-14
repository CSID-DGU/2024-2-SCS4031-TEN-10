import TopBar from "@/components/common/TopBar";
import FestivalDetail from "@/components/festival/FestivalDetail";
import { FestivalContext } from "@/contexts/FestivalContext";
import customAxios from "@/utils/customAxios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function FestivalDetailPage() {
  const router = useRouter();
  const { festivalIndex } = router.query;

  const { getFestivalByIndex } = useContext(FestivalContext);

  const [festival, setFestival] = useState<any>();
  const [reviewList, setReviewList] = useState<any>([]);

  // 축제 상세 내용 조회
  useEffect(() => {
    if (!festivalIndex) return;
    if (festival) return;

    setFestival(getFestivalByIndex(festivalIndex));
  }, [festivalIndex, festival, getFestivalByIndex]);

  // 후기 조회
  useEffect(() => {
    if (!festivalIndex) return;
    if (reviewList && reviewList.length > 0) return;

    getReviewList();
  }, [festivalIndex, reviewList]);

  async function getReviewList() {
    customAxios({
      method: "GET",
      url: `/reviews/${festivalIndex}`,
    }).then((res: any) => {
      if (res.data.result) {
        setReviewList(res.data.data);
      }
    });
  }

  return (
    <>
      <TopBar title="" back={true} />
      {festival && (
        <FestivalDetail
          festivalIndex={festivalIndex}
          festival={festival}
          reviewList={reviewList}
          getReviewList={getReviewList}
        />
      )}
    </>
  );
}
