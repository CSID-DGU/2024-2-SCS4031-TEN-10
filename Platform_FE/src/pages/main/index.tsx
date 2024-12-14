import FestivalItem from "@/components/festival/FestivalItem";
import TopBar from "@/components/common/TopBar";
import { useContext } from "react";
import { FestivalContext } from "@/contexts/FestivalContext";

export default function MainPage() {
  const { festivalList } = useContext(FestivalContext);

  return (
    <>
      <TopBar title="지역 축제 정보 통합 플랫폼" search={true} />
      {festivalList?.map((festival: any, index: number) => (
        <FestivalItem key={`festival_${index}`} festival={festival} />
      ))}
    </>
  );
}
