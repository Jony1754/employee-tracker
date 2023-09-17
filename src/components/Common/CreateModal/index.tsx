import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import styles from './CreateModal.module.css';
import { IEmpleado } from '../../../interfaces/Empleado';
import { ICargo } from '../../../interfaces/Cargo';
import { TfiClose } from 'react-icons/tfi';
type IEmpleadoCargo = IEmpleado | ICargo;

interface CreateModalProps {
  isOpen: boolean;
  type: 'Empleado' | 'Cargo';
  initialData?: IEmpleado | ICargo;
  onCancel: () => void;
  onConfirm: (data: IEmpleado | ICargo, isEditing?: boolean) => void;
}

const initialDataDefault: IEmpleado & ICargo = {
  id: undefined,
  nombre: '',
  identificacion: '',
  direccion: '',
  telefono: '',
  ciudad: '',
  departamento: '',
  area: '',
  cargo: '',
  rol: '',
  jefe: '',
};

const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  type,
  initialData,
  onCancel,
  onConfirm,
}) => {
  const [formData, setFormData] = useState<IEmpleadoCargo>(
    initialData || initialDataDefault
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const fields = useMemo(() => {
    return type === 'Empleado'
      ? [
          'nombre',
          'identificacion',
          'direccion',
          'telefono',
          'ciudad',
          'departamento',
        ]
      : ['nombre', 'identificacion', 'area', 'cargo', 'rol', 'jefe'];
  }, [type]);

  useEffect(() => {
    setFormData(initialData || initialDataDefault);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isValid = fields.every((field) =>
      Boolean(formData[field as keyof IEmpleadoCargo])
    );
    setIsFormValid(isValid);
  }, [fields, formData]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p>Nuevo {type}</p>
          <TfiClose onClick={onCancel} />
        </div>
        <div className={styles.modalBody}>
          <div className={styles.column}>
            {fields.slice(0, 3).map((field) => (
              <div className={styles.row} key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type='text'
                  name={field}
                  value={formData[field as keyof IEmpleadoCargo] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className={styles.column}>
            {fields.slice(3).map((field) => (
              <div className={styles.row} key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type='text'
                  name={field}
                  value={formData[field as keyof IEmpleadoCargo] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancelar
          </button>
          <button
            className={styles.confirmButton}
            onClick={() => {
              if (initialData) {
                onConfirm(formData, true);
              } else {
                onConfirm(formData);
              }
            }}
            disabled={!isFormValid}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default CreateModal;
