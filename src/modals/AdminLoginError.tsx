import { useAdminContext } from "../contexts/AdminContext";
import "./Modals.css";

type AdminLoginErrorProp = {
  loginError: string;
};

export default function AdminLoginError({ loginError }: AdminLoginErrorProp) {
  const { setLoginStates } = useAdminContext();

  function handleClick() {
    setLoginStates((prev) => {
      return { ...prev, isLoginFailed: false };
    });
  }

  function closeModal(e: React.MouseEvent<HTMLDivElement | MouseEvent>) {
    const target = e.target as HTMLDivElement;

    if (
      !target.classList.contains("modal-card") &&
      !target.classList.contains("modal-card-header") &&
      !target.classList.contains("modal-card-icon") &&
      !target.classList.contains("modal-card-subtitle")
    ) {
      return setLoginStates((prev) => {
        return { ...prev, isLoginFailed: false };
      });
    } else {
      return setLoginStates((prev) => {
        return { ...prev, isLoginFailed: true };
      });
    }
  }

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-card">
        <h2 className="modal-card-header">Error Message</h2>
        <i className="bx bxs-error-alt modal-card-icon" />
        <p className="modal-card-subtitle">{loginError}</p>
        <button onClick={handleClick}>RETRY</button>
      </div>
    </div>
  );
}
