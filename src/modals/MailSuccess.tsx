import "./Modals.css"
import { useStoreContext } from "../contexts/StoreContext";


export default function MailSuccess() {
  const { setIsMailSuccess } = useStoreContext()

  function handleClick() {
    setIsMailSuccess(false)
  }

  function closeModal(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    if (
      !target.classList.contains("modal-card") &&
      !target.classList.contains("modal-card-header") &&
      !target.classList.contains("modal-card-icon") &&
      !target.classList.contains("modal-card-subtitle")
    ) {
      return setIsMailSuccess(false);
    } else {
      return setIsMailSuccess(true);
    }
  }

  return (
    <div className='modal-container' onClick={closeModal}>
      <div className='modal-card'>
        <h2 className='modal-card-header'>Mail Sent Successfully</h2>
        <i className="bx bx-check-circle modal-card-icon" />
        <p className='modal-card-subtitle'>Your message has been sent and we'd
          get back to you as soon as possible</p>
        <button onClick={handleClick}>Done</button>
      </div>
    </div>
  )
}
