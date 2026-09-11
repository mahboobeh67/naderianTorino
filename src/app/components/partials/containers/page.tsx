import styles from "./modal.module.css";

function ModalContainer({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer} onClick={onClose}>
      <div className={styles.modalWrapper}>
        <div
          className={styles.modalBox}
          onClick={(e) => e.stopPropagation()} 
        >
       
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="بستن"
          >
            
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
