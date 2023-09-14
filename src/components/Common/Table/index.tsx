// src/components/DataTable.tsx
import React, { useState } from 'react';

interface DataTableProps {
  data: {
    id: number;
    name: string;
    identification: string;
    address: string;
    phone: string;
    city: string;
    department: string;
  }[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

interface SearchTerms {
  name: string;
  identification: string;
  address: string;
  phone: string;
  city: string;
  department: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    identification: '',
    address: '',
    phone: '',
    city: '',
    department: '',
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchTerms((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredData = data.filter((item) =>
    Object.keys(searchTerms).every(
      (key) =>
        !searchTerms[key as keyof SearchTerms] ||
        String(item[key as keyof SearchTerms]).includes(
          searchTerms[key as keyof SearchTerms]
        )
    )
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              Nombre{' '}
              <input
                type='text'
                name='name'
                value={searchTerms.name}
                onChange={handleSearchChange}
              />
            </th>
            <th>
              ID{' '}
              <input
                type='text'
                name='identification'
                value={searchTerms.identification}
                onChange={handleSearchChange}
              />
            </th>
            <th>
              Dirección{' '}
              <input
                type='text'
                name='address'
                value={searchTerms.address}
                onChange={handleSearchChange}
              />
            </th>
            <th>
              Teléfono{' '}
              <input
                type='text'
                name='phone'
                value={searchTerms.phone}
                onChange={handleSearchChange}
              />
            </th>
            <th>
              Ciudad{' '}
              <input
                type='text'
                name='city'
                value={searchTerms.city}
                onChange={handleSearchChange}
              />
            </th>
            <th>
              Departamento{' '}
              <input
                type='text'
                name='department'
                value={searchTerms.department}
                onChange={handleSearchChange}
              />
            </th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedIds.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.identification}</td>
              <td>{row.address}</td>
              <td>{row.phone}</td>
              <td>{row.city}</td>
              <td>{row.department}</td>
              <td>
                <button onClick={() => onEdit(row.id)}>Editar</button>
                <button onClick={() => onDelete(row.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
