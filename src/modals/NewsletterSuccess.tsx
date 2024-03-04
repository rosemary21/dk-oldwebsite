import "./Modals.css";
import {useStoreContext} from "../contexts/StoreContext"

export default function NewsletterSuccess() {
  const { setIsNewsLetterSuccess } = useStoreContext();

  function handleClick() {
    setIsNewsLetterSuccess(false);
  }

  function closeModal(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement
    if (
      !target.classList.contains("modal-card") &&
      !target.classList.contains("modal-card-header") &&
      !target.classList.contains("modal-card-icon") &&
      !target.classList.contains("modal-card-subtitle")
      
    ) {
      return setIsNewsLetterSuccess(false);
    } else {
      return setIsNewsLetterSuccess(true);
    }
  }
  
  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-card">
        <i className="bx bxs-envelope modal-card-icon" />
        <h2 className="modal-card-header">Horray!!!!!</h2>
        <p className="modal-card-subtitle">
          Thank you for subscribing to our newsletter. We're happy to always
          inform you about our latest activities
        </p>
        <button onClick={handleClick}>Done</button>
      </div>
    </div>
  );
}
