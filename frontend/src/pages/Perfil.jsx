import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Perfil() {
  const [datos, setDatos] = useState({
    direccion: '',
    telefono: '',
    fecha_nacimiento: ''
  });

  useEffect(() => {
    api.get('/datos')
      .then(res => setDatos(res.data || {}))
      .catch(() => alert('Error al obtener datos'));
  }, []);

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await api.put('/datos', datos);
      alert('Datos actualizados');
    } catch {
      alert('Error al guardar');
    }
  };

  return (
    <form onSubmit={guardar}>
      <h2>Mis datos</h2>
      <input placeholder="Dirección" value={datos.direccion || ''} onChange={e => setDatos({ ...datos, direccion: e.target.value })} />
      <input placeholder="Teléfono" value={datos.telefono || ''} onChange={e => setDatos({ ...datos, telefono: e.target.value })} />
      <input type="date" value={datos.fecha_nacimiento || ''} onChange={e => setDatos({ ...datos, fecha_nacimiento: e.target.value })} />
      <button type="submit">Guardar</button>
    </form>
  );
}
