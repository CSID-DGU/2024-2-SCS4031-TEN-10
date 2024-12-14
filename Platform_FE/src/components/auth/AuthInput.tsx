import classes from "./AuthInput.module.css";

export default function AuthInput(props: any) {
  const {
    title,
    type,
    onInput,
    onChange,
    value,
    placeholder,
    onClickButton,
    activeMessage,
    errorMessage,
    okMessage,
  } = props;

  return (
    <div className={"input_div"}>
      <p className={"input_title"}>{title}</p>
      <div className={classes["check_input_div"]}>
        <input
          type={type}
          onInput={onInput}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {onClickButton && (
          <button
            onClick={onClickButton}
            className={!value.trim() ? classes.disable : undefined}
          >
            중복 검사
          </button>
        )}
      </div>
      {activeMessage &&
        (errorMessage != "" ? (
          <p className={"error_text"}>{errorMessage}</p>
        ) : (
          okMessage != "" && <p className={"ok_text"}>{okMessage}</p>
        ))}
    </div>
  );
}
