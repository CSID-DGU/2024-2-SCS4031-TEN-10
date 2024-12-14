/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import classes from "./TopBar.module.css";

export default function TopBar(props: any) {
  const { title, back = false, menu = false, search = false } = props;

  const router = useRouter();

  function onClickBack() {
    router.back();
  }

  function onClickSearch() {
    router.push("/search");
  }

  return (
    <div className={classes["top_bar"]}>
      <div>
        <img
          src="/icon/back-icon.png"
          className={classes["icon_button"]}
          onClick={onClickBack}
          style={{ display: !back ? "none" : undefined }}
        />
        {/* <img
          src="/icon/menu-icon.svg"
          className={classes["icon_button"]}
          style={{ display: !menu ? "none" : undefined }}
        /> */}
      </div>

      <p className={classes.title}>{title}</p>

      <div>
        <img
          src="/icon/search-icon.svg"
          className={classes["icon_button"]}
          onClick={onClickSearch}
          style={{ display: !search ? "none" : undefined }}
        />
      </div>
    </div>
  );
}
