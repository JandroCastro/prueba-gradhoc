import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store'; import {
  removeUser,
  resetUsers,
  filterByCountry,
  clearCountryFilter
} from '../features/users/usersSlice'
import { fetchUsers } from '../features/users/usersAPI';
import {debounce } from 'lodash'

const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allUsersById, visibleUserIds, loading, error } = useAppSelector(state => state.users);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const debouncedFilter = debounce((value: string) => {
    if (value.trim() === '') {
      dispatch(clearCountryFilter());
    } else {
      dispatch(filterByCountry(value));
    }
  }, 300);

  useEffect(() => {
    debouncedFilter(countryFilter);
    return () => debouncedFilter.cancel();
  }, [countryFilter]);

  const handleRemove = (id: string) => {
    dispatch(removeUser(id));
  };

  const handleReset = () => {
    dispatch(resetUsers());
    setCountryFilter('');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountryFilter(value);
    dispatch(filterByCountry(value));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={handleReset}>Restaurar registros</button>
        <input
          type="text"
          placeholder="Filtrar por país..."
          value={countryFilter}
          onChange={handleFilterChange}
        />
      </div>

      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>País</th>
            <th>Edad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {visibleUserIds.map(id => {
            const user = allUsersById[id];
            return (
              <tr key={id}>
                <td><img src={user.picture} alt={user.name} width={40} /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.country}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => handleRemove(id)} title="Eliminar">
                    ❌
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
