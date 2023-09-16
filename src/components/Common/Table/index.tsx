/* eslint-disable no-prototype-builtins */
import React, { useState } from 'react';
import styles from './Table.module.css';

import { ICargo } from '../../../interfaces/Cargo';
import { IEmpleado } from '../../../interfaces/Empleado';
import { TiEdit, TiTrash } from 'react-icons/ti';
interface DataTableProps {
  data: IEmpleado[] | ICargo[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSelected: (id: number) => void;
  selectedIds: number[];
}

interface SearchTerms {
  id: string;
  nombre: string;
  identificacion: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  departamento: string;
  area: string;
  cargo: string;
  rol: string;
  jefe: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  onEdit,
  onDelete,
  onSelected,
  selectedIds,
}) => {
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({
    id: '',
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
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchTerms((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = data.filter((item) => {
    return Object.keys(searchTerms).every((key) => {
      if (item.hasOwnProperty(key) && searchTerms[key as keyof SearchTerms]) {
        return String(item[key as keyof typeof item]).includes(
          searchTerms[key as keyof SearchTerms] || ''
        );
      }
      return true;
    });
  });
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>
              <p>Nombre</p>
              <input
                type='text'
                name='nombre'
                placeholder='Buscar'
                value={searchTerms.nombre}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </th>
            <th>
              <p>ID</p>
              <input
                placeholder='Buscar'
                type='text'
                name='identificacion'
                value={searchTerms.identificacion}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </th>
            {'direccion' in data[0] ? (
              <>
                <th>
                  <p>Dirección</p>
                  <input
                    type='text'
                    placeholder='Buscar'
                    name='direccion'
                    value={searchTerms.direccion}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
                <th>
                  <p>Teléfono</p>
                  <input
                    type='text'
                    placeholder='Buscar'
                    name='telefono'
                    value={searchTerms.telefono}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
                <th>
                  <p>Ciudad</p>
                  <input
                    type='text'
                    placeholder='Buscar'
                    name='ciudad'
                    value={searchTerms.ciudad}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
                <th>
                  <p>Departamento</p>
                  <input
                    type='text'
                    placeholder='Buscar'
                    name='departamento'
                    value={searchTerms.departamento}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
              </>
            ) : (
              <>
                <th>
                  <p>Área</p>
                  <input
                    type='text'
                    name='area'
                    placeholder='Buscar'
                    value={searchTerms.area}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
                <th>
                  <p>Cargo</p>
                  <input
                    type='text'
                    placeholder='Buscar'
                    name='cargo'
                    value={searchTerms.cargo}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
                <th>
                  <p>Rol</p>
                  <input
                    type='text'
                    name='rol'
                    placeholder='Buscar'
                    value={searchTerms.rol}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
                <th>
                  <p>Jefe</p>
                  <input
                    type='text'
                    name='jefe'
                    placeholder='Buscar'
                    value={searchTerms.jefe}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                  />
                </th>
              </>
            )}
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          {displayedData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedIds.includes(row.id ? row.id : 0)}
                  onChange={() => onSelected(row.id ? row.id : 0)}
                />
              </td>
              <td>{row.nombre}</td>
              <td>{row.identificacion}</td>
              <td>
                {'direccion' in row
                  ? row.direccion
                  : 'area' in row
                  ? row.area
                  : ''}
              </td>
              <td>
                {'telefono' in row
                  ? row.telefono
                  : 'cargo' in row
                  ? row.cargo
                  : ''}
              </td>
              <td>
                {'ciudad' in row ? row.ciudad : 'rol' in row ? row.rol : ''}
              </td>
              <td>
                {'departamento' in row
                  ? row.departamento
                  : 'jefe' in row
                  ? row.jefe
                  : ''}
              </td>
              <td className={styles.buttons}>
                <div>
                  <TiEdit
                    className={styles.buttonOptions}
                    onClick={() => onEdit(row.id ? row.id : 0)}
                  >
                    Editar
                  </TiEdit>
                </div>
                <div>
                  <TiTrash
                    className={styles.buttonOptions}
                    onClick={() => {
                      onDelete(row.id ? row.id : 0);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.tableFooter}>
        <div className={styles.itemPerPageSelector}>
          <span>Mostrar de a </span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={styles.pageButton}
              disabled={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
