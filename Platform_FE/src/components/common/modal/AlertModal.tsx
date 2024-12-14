import { useState } from "react";
import classes from "./Modal.module.css";
import ModalWrapper from "./ModalWrapper";

function AlertModal(props: any) {
  const { title = "알림", content, onClickCancel, cancelText = "닫기" } = props;
  const [showModal, setShowModal] = useState(true);

  function closeModal() {
    setShowModal(false);

    setTimeout(() => {
      onClickCancel();
    }, 150);
  }

  return (
    <ModalWrapper title={title} showModal={showModal} closeModal={closeModal}>
      <pre className={classes["content"]}>{content}</pre>
      <div className={classes["footer"]}>
        <button className={"outline_button"} onClick={closeModal}>
          {cancelText}
        </button>
      </div>
    </ModalWrapper>
  );
}
export default AlertModal;
