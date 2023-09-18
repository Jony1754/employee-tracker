import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import trashIcon from '../../../assets/images/trash.png';
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  userName: string;
  deletingMany?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  userName,
  onCancel,
  onConfirm,
  deletingMany,
}) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalRow}>
          <div className={styles.iconContainer}>
            <img src={trashIcon} alt='' />
          </div>
        </div>
        <div className={styles.modalRow}>
          <div className={styles.messageContainer}>
            <h3>Borrar empleado</h3>
            {deletingMany
              ? '¿Está seguro de que desea borrar a los usuarios seleccionados?'
              : `¿Está seguro de que desea borrar a ${userName}?`}
          </div>
        </div>
        <div className={styles.modalRow}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Aceptar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default DeleteConfirmationModal;
