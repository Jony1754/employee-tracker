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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DeleteConfirmationModal from '../../components/Common/DeleteConfirmationModal';
import axios from 'axios';
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
type IEmpleadoCargo = IEmpleado | ICargo;
interface GeneralViewProps {
  title: string;
}
// const localHost = 'http://localhost:3000/api';
const AWS =
  'http://psicoalianzaenv.eba-vev3v6r4.us-east-1.elasticbeanstalk.com/api';

const API = AWS;

const GeneralView: React.FC<GeneralViewProps> = ({ title }) => {
  const endpoint = title === 'Empleados' ? '/empleados' : '/cargos';
  const { data, loading, refetch } = useApiData(`${API}${endpoint}`);
  const [isOpened, setIsOpened] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [successfullyDeleted, setSuccessfullyDeleted] = React.useState(false);
  const [successfullyEdited, setSuccessfullyEdited] = React.useState(false);
  const [successfullyCreated, setSuccessfullyCreated] = React.useState(false);
  const [errorEditing, setErrorEditing] = React.useState(false);
  const [errorCreating, setErrorCreating] = React.useState(false);
  const [errorDeleting, setErrorDeleting] = React.useState(false);
  const { isExpanded } = useSidenavToggle();
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [elementToDelete, setElementToDelete] = React.useState('');
  const [idToDelete, setIdToDelete] = React.useState(0);
  const [deletingMany, setDeletingMany] = React.useState(false);
  const [elementToEdit, setElementToEdit] =
    React.useState<IEmpleadoCargo | null>(null);

  const handleEdit = (id: number) => {
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
      setOpen(true);
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
          await axios.delete(`${API}${endpoint}/${id}`);
        })
      );
      setIsDeleteOpen(false);
      setDeletingMany(false);
      setSelectedIds([]);
      setSuccessfullyDeleted(true);
      refetch();
    } catch (error) {
      console.error('Error eliminando:', error);
      setErrorDeleting(true);
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
        setSuccessfullyEdited(true);
        refetch();
        setElementToEdit(null);
      } catch (error) {
        console.error('Error editando:', error);
        setErrorEditing(true);
      }
    } else {
      try {
        const response = await post(`${API}${endpoint}`, formData);
        setIsOpened(false);
        console.log('response: ', response);
        refetch();
        setSuccessfullyCreated(true);
      } catch (error) {
        console.error('Error creando:', error);
        setErrorCreating(true);
      }
    }
  };

  const put = async (payload: IEmpleadoCargo) => {
    try {
      let response;
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
        response = await axios.put(`${API}${endpoint}/${id}`, empleado);
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
        response = await axios.put(`${API}${endpoint}/${id}`, newCargo);
      }
      return response.data;
    } catch (error) {
      console.error('Error editando:', error);
      setErrorEditing(true);
    }
  };
  const post = async (url: string, payload: IEmpleadoCargo) => {
    try {
      let response;
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
        empleado.id = data.length + 100;
        response = await axios.post(url, empleado);
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
        newCargo.id = data.length + 100;
        response = await axios.post(url, newCargo);
      }
      return response.data;
    } catch (error) {
      console.error('Error creando:', error);
      setErrorCreating(true);
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
    try {
      if (deletingMany) {
        await deleteMany();
        setDeletingMany(false);
        return;
      } else {
        const response = await axios.delete(`${API}${endpoint}/${idToDelete}`);
        const data = response.data;
        console.log('data on deleteUser: ', data);
        setIsDeleteOpen(false);
        setSuccessfullyDeleted(true);

        refetch();
      }
    } catch (error) {
      console.error('Error eliminando:', error);
      setErrorDeleting(true);
    }
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className={isExpanded ? 'body-pd' : 'bodytable'}>
      <Stack sx={{ width: '100%' }} spacing={1}>
        <Collapse in={isOpen}>
          <Alert
            severity='warning'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Por favor selecciona al menos un elemento
          </Alert>
        </Collapse>
        <Collapse in={successfullyDeleted}>
          <Alert
            severity='success'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setSuccessfullyDeleted(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Eliminacion exitosa
          </Alert>
        </Collapse>
        <Collapse in={successfullyEdited}>
          <Alert
            severity='success'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setSuccessfullyEdited(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Edicion exitosa
          </Alert>
        </Collapse>
        <Collapse in={successfullyCreated}>
          <Alert
            severity='success'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setSuccessfullyCreated(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Creacion exitosa
          </Alert>
        </Collapse>
        <Collapse in={errorEditing}>
          <Alert
            severity='error'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setErrorEditing(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Error editando
          </Alert>
        </Collapse>
        <Collapse in={errorCreating}>
          <Alert
            severity='error'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setErrorCreating(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Error creando
          </Alert>
        </Collapse>
        <Collapse in={errorDeleting}>
          <Alert
            severity='error'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setErrorDeleting(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Error eliminando
          </Alert>
        </Collapse>
      </Stack>
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
            <p>Descargar datos</p>
          </div>
        </div>
        <div className={styles.optionsGroup}>
          <div
            className={styles.button + ' ' + styles.buttonAdd}
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
