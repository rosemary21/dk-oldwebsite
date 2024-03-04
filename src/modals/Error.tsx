import { ErrorModalProp } from "../types/modals";
import "./Modals.css";

export default function ErrorModal({
  errorMsg,
  callbackFunction,
}: ErrorModalProp) {

  function handleClick() {
    callbackFunction("");
  }

  function closeModal(e: React.MouseEvent<HTMLDivElement | MouseEvent>) {
    const target = e.target as HTMLDivElement;

    if (
      !target.classList.contains("modal-card") &&
      !target.classList.contains("modal-card-header") &&
      !target.classList.contains("modal-card-icon") &&
      !target.classList.contains("modal-card-subtitle")
    ) {
      return callbackFunction("");
    } else {
      return callbackFunction(errorMsg);
    }
  }

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-card">
        <h2 className="modal-card-header">Error Message</h2>
        <i className="bx bxs-error-alt modal-card-icon" />
        <p className="modal-card-subtitle">{errorMsg}</p>
        <button onClick={handleClick}>RETRY</button>
      </div>
    </div>
  );
}
