import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);

  const cargar = () => {
    api.get('/admin/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(() => alert('Error al obtener usuarios'));
  };

  useEffect(cargar, []);

  const bloquear = async (id) => {
    await api.put(`/admin/usuarios/${id}`, { estado: 'bloqueado' });
    cargar();
  };

  const activar = async (id) => {
    await api.put(`/admin/usuarios/${id}`, { estado: 'activo' });
    cargar();
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar usuario?')) {
      await api.delete(`/admin/usuarios/${id}`);
      cargar();
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>{u.estado}</td>
              <td>
                {u.estado === 'activo' ? (
                  <button onClick={() => bloquear(u.id)}>Bloquear</button>
                ) : (
                  <button onClick={() => activar(u.id)}>Activar</button>
                )}
                <button onClick={() => eliminar(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
