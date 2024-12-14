import TopBar from "@/components/common/TopBar";
import classes from "./Search.module.css";
import { useContext, useEffect, useState } from "react";
import FestivalItem from "@/components/festival/FestivalItem";
import { FestivalContext } from "@/contexts/FestivalContext";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const { festivalList } = useContext(FestivalContext);

  useEffect(() => {
    if (searchText !== "") {
      const filteredResults = festivalList.filter(
        (festival: any) =>
          festival.festival_name.includes(searchText) ||
          festival.festival_city.includes(searchText) ||
          festival.festival_season.includes(searchText)
      );
      setSearchResult(filteredResults);
    } else {
      setSearchResult([]);
    }
  }, [searchText]);

  return (
    <>
      <TopBar title="검색" back={true} />

      <div className={classes["search"]}>
        <input
          className={classes["search_input"]}
          onInput={(e: any) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>

      <div>
        {searchResult.length == 0 ? (
          <div className={classes["search_info"]}>
            <pre>{`축제명, 기초 자치 단체명, 개최 시기로\n검색할 수 있습니다.`}</pre>
          </div>
        ) : (
          <>
            {searchResult.map((festival: any, index: number) => (
              <FestivalItem key={`festival_${index}`} festival={festival} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
