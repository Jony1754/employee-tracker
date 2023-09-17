import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

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
            {/* Aquí puede ir tu icono de eliminación, por ejemplo: */}
            <i className='fas fa-trash-alt'></i>
          </div>
        </div>
        <div className={styles.modalRow}>
          <div className={styles.messageContainer}>
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
