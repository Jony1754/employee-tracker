/* eslint-disable @typescript-eslint/no-explicit-any */
// src/containers/Dashboard/GeneralView.tsx

import React, { useState, useEffect } from 'react';
import DataTable from '../../components/Common/Table';
interface GeneralViewProps {
  title: string;
}

const GeneralView: React.FC<GeneralViewProps> = ({ title }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Simula una llamada a una API o alguna lógica para obtener los datos
    if (title === 'Empleados') {
      setData([
        {
          id: 1,
          name: 'John Doe',
          identification: '12345',
          address: '123 Main St',
          phone: '555-1234',
          city: 'Puebla',
          department: 'HR',
        },
        {
          id: 2,
          name: 'Jane Smith',
          identification: '67890',
          address: '456 Elm St',
          phone: '555-5678',
          city: 'Puebla',
          department: 'IT',
        },
      ]);
    } else if (title === 'Cargos') {
      setData([
        {
          id: 3,
          name: 'Manager',
          identification: '54321',
          address: '789 Oak St',
          phone: '555-9876',
          city: 'Puebla',
          department: 'Sales',
        },
        {
          id: 4,
          name: 'Developer',
          identification: '09876',
          address: '101 Pine St',
          phone: '555-4321',
          city: 'Puebla',
          department: 'IT',
        },
      ]);
    }
  }, [title]);

  const handleEdit = (id: number) => {
    alert(`Editando el elemento con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (
      window.confirm(`¿Seguro que deseas eliminar el elemento con ID: ${id}?`)
    ) {
      alert(`Elemento con ID: ${id} eliminado`);
    }
  };

  return <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default GeneralView;
