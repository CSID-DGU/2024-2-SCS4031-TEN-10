import { GetFestivalJsonData } from "@/utils/xlsx";
import { createContext, useEffect, useState } from "react";

type FestivalProviderProps = {
  children: React.ReactNode;
};

const FestivalContext = createContext<any>(null);

function FestivalProvider({ children }: FestivalProviderProps) {
  const [festivalList, setFestivalList] = useState<any>([]);

  useEffect(() => {
    if (festivalList.length > 0) return;

    const getFestivalData = async () => {
      const data = await GetFestivalJsonData();
      setFestivalList(data);
    };

    getFestivalData();
  }, [festivalList]);

  function getFestivalByIndex(index: number) {
    return festivalList.find((festival: any) => festival.festival_idx == index);
  }

  return (
    <FestivalContext.Provider value={{ festivalList, getFestivalByIndex }}>
      {children}
    </FestivalContext.Provider>
  );
}

export { FestivalProvider, FestivalContext };
