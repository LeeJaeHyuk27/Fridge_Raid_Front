import Login from "../pages/Login";
import "./LoginModal.css";
import { useEffect } from "react";

function LoginModal({ onClose, position }) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".modal-card")) return;
      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{
          position: "absolute",
          top: position.top + "px",
          left: position.left + "px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Login isModal={true} onClose={onClose} />
      </div>
    </div>
  );
}

export default LoginModal;