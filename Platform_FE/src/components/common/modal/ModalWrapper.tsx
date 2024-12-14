import classes from "./Modal.module.css";

function ModalWrapper(props: any) {
  const {
    title,
    description,
    children,
    showModal,
    closeModal,
    modalStyle = null,
  } = props;

  return (
    <div className={classes["container"]}>
      <div
        className={`${classes["backdrop"]} ${
          showModal ? classes.fadeIn : classes.fadeOut
        }`}
        onClick={() => closeModal({ isCancel: true })}
      />
      <div
        className={`${classes["modal"]} ${
          showModal ? classes.fadeIn : classes.fadeOut
        }`}
        style={modalStyle}
      >
        <div className={classes["modal_title"]}>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
export default ModalWrapper;
