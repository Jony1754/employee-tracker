/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DataTable from '../../components/Common/Table';
import { useSidenavToggle } from '../../context/SidenavToggleContext';
import { TfiArrowLeft, TfiTrash, TfiDownload } from 'react-icons/tfi';
import { BiUserPlus } from 'react-icons/bi';
import useApiData from '../../utils/api';
import TableSkeleton from '../../components/Common/TableSkeleton';
import styles from './Dashboard.module.css';
import CreateModal from '../../components/Common/CreateModal';
import { IEmpleado } from '../../interfaces/Empleado';
import { ICargo } from '../../interfaces/Cargo';
import DeleteConfirmationModal from '../../components/Common/DeleteConfirmationModal';
import axios from 'axios';
type IEmpleadoCargo = IEmpleado | ICargo;
interface GeneralViewProps {
  title: string;
}
const localHost = 'http://localhost:3000/api';
const AWS =
  'http://psicoalianzaenv.eba-vev3v6r4.us-east-1.elasticbeanstalk.com/api';

const API = AWS;

const GeneralView: React.FC<GeneralViewProps> = ({ title }) => {
  const endpoint = title === 'Empleados' ? '/empleados' : '/cargos';
  const { data, loading, refetch } = useApiData(`${API}${endpoint}`);
  const [isOpened, setIsOpened] = React.useState(false);
  const { isExpanded } = useSidenavToggle();
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [elementToDelete, setElementToDelete] = React.useState('');
  const [idToDelete, setIdToDelete] = React.useState(0);
  const [deletingMany, setDeletingMany] = React.useState(false);
  const [elementToEdit, setElementToEdit] =
    React.useState<IEmpleadoCargo | null>(null);

  const handleEdit = (id: number) => {
    alert(`Editando el elemento con ID: ${id}`);
    const element = data.find((item: IEmpleadoCargo) => item.id === id);
    setElementToEdit(element);
    setIsOpened(true);
    if (element) {
      console.log('Elemento a editar: ', element);
    }
  };
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    console.log('id: ', id);
    setSelectedIds((prev: number[]) => {
      if (prev.includes(id)) {
        return prev.filter((itemId: number) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
    console.log('selected ids: ', selectedIds);
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) {
      alert('Por favor selecciona al menos un elemento.');
    } else {
      setIsDeleteOpen(true);
      setDeletingMany(true);
      console.log('Eliminando los elementos con ID: ', selectedIds);
    }
  };

  const deleteMany = async () => {
    try {
      await Promise.all(
        selectedIds.map(async (id: number) => {
          await fetch(`${API}${endpoint}/${id}`, {
            method: 'DELETE',
          });
        })
      );
      setIsDeleteOpen(false);
      setDeletingMany(false);
      setSelectedIds([]);
      alert('Eliminación exitosa!');

      refetch();
    } catch (error) {
      console.error('Error eliminando:', error);
      alert('Hubo un error eliminando. Por favor intenta de nuevo.');
    }
  };

  const handleCreate = async (
    formData: IEmpleadoCargo,
    isEditing?: boolean
  ) => {
    console.log('formData: ', formData);
    console.log('isEditing: ', isEditing);
    if (isEditing) {
      try {
        await put(formData);
        setIsOpened(false);
        alert('Edición exitosa!');
        refetch();
        setElementToEdit(null);
      } catch (error) {
        console.error('Error editando:', error);
        alert('Hubo un error editando. Por favor intenta de nuevo.');
      }
    } else {
      try {
        const response = await post(`${API}${endpoint}`, formData);
        setIsOpened(false);
        console.log('response: ', response);
        alert('Creación exitosa!');
      } catch (error) {
        console.error('Error creando:', error);
        alert('Hubo un error creando. Por favor intenta de nuevo.');
      }
    }
  };

  const put = async (payload: IEmpleadoCargo) => {
    if (title === 'Empleados') {
      const {
        id,
        nombre,
        identificacion,
        direccion,
        telefono,
        ciudad,
        departamento,
      } = payload as IEmpleado;
      const empleado = {
        id,
        nombre,
        identificacion,
        direccion,
        telefono,
        ciudad,
        departamento,
      };
      console.log('Empleado a EDITAR: ', empleado);
      const response = await fetch(`${API}${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(empleado),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    } else {
      const { id, nombre, identificacion, area, cargo, rol, jefe } =
        payload as ICargo;
      const newCargo = {
        id,
        nombre,
        identificacion,
        area,
        cargo,
        rol,
        jefe,
      };
      console.log('Cargo a EDITAR: ', newCargo);
      const response = await fetch(`${API}${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newCargo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    }
  };

  const post = async (url: string, payload: IEmpleadoCargo) => {
    if (title === 'Empleados') {
      const {
        id,
        nombre,
        identificacion,
        direccion,
        telefono,
        ciudad,
        departamento,
      } = payload as IEmpleado;
      const empleado = {
        id,
        nombre,
        identificacion,
        direccion,
        telefono,
        ciudad,
        departamento,
      };
      empleado.id = data.length + 1;
      console.log('Empleado a enviar: ', empleado);
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(empleado),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    } else {
      const { id, nombre, identificacion, area, cargo, rol, jefe } =
        payload as ICargo;
      const newCargo = {
        id,
        nombre,
        identificacion,
        area,
        cargo,
        rol,
        jefe,
      };

      newCargo.id = data.length + 1;
      console.log('Cargo a enviar: ', cargo);
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newCargo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    }
  };

  const handleDelete = (id: number) => {
    setIsDeleteOpen(true);
    console.log('Eliminando el elemento con ID: ', id);
    const element = data.find((item: IEmpleadoCargo) => item.id === id);
    if (element) {
      setElementToDelete(element.nombre);
      setIdToDelete(id);
    }
  };

  const deleteUser = async () => {
    if (deletingMany) {
      try {
        await deleteMany();
        setDeletingMany(false);

        return;
      } catch (error) {
        console.error('Error eliminando:', error);
        alert('Hubo un error eliminando. Por favor intenta de nuevo.');
      }
    } else {
      try {
        console.log('url: ', `${API}${endpoint}/${idToDelete}`);
        const response = await axios.delete(`${API}${endpoint}/${idToDelete}`);
        const data = response.data;

        console.log('data: ', data);
        setIsDeleteOpen(false);
        alert('Eliminación exitosa!');
        refetch();
      } catch (error) {
        console.error('Error eliminando:', error);
        alert('Hubo un error eliminando. Por favor intenta de nuevo.');
      }
    }
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className={isExpanded ? 'body-pd' : 'bodytable'}>
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onCancel={function (): void {
          setIsDeleteOpen(false);
        }}
        onConfirm={deleteUser}
        userName={elementToDelete}
        deletingMany={deletingMany}
      />
      <CreateModal
        isOpen={isOpened}
        initialData={elementToEdit?.id ? elementToEdit : undefined}
        type={title === 'Empleados' ? 'Empleado' : 'Cargo'}
        onCancel={function (): void {
          setIsOpened(false);
          setElementToEdit(null);
        }}
        onConfirm={handleCreate}
      />
      <div className={styles.title}>
        <TfiArrowLeft />
        <h1>{title}</h1>
      </div>
      <div className={styles.options}>
        <div className={styles.optionsGroup}>
          <div className={styles.button} onClick={deleteSelected}>
            <TfiTrash />
            <p>Borrar selección</p>
          </div>
          <div className={styles.button}>
            <TfiDownload />
            <p>Borrar selección</p>
          </div>
        </div>
        <div className={styles.optionsGroup}>
          <div
            className={styles.button}
            onClick={() => {
              setIsOpened(true);
            }}
          >
            <BiUserPlus />
            <p>Agregar</p>
          </div>
        </div>
      </div>
      <DataTable
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelected={handleCheckboxChange}
        selectedIds={selectedIds}
      />
    </div>
  );
};

export default GeneralView;
