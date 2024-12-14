import { useRouter } from "next/router";
import classes from "./css/FestivalItem.module.css";

export default function FestivalItem(props: any) {
  const router = useRouter();

  const { festival } = props;
  const { festival_idx, festival_name, festival_city, festival_season } =
    festival;

  function onClickFestival() {
    router.push(`/festival/${festival_idx}`);
  }

  return (
    <div className={classes["festival_item"]} onClick={onClickFestival}>
      <p className={classes["festival_name"]}>{festival_name}</p>
      <div className={classes["festival_info"]}>
        <span>지역: {festival_city}</span>
        <span>개최 시기: {festival_season}</span>
      </div>
    </div>
  );
}
