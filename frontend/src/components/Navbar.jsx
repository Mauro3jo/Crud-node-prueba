import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const nav = useNavigate();
  const rol = localStorage.getItem('rol');

  const salir = () => {
    localStorage.clear();
    nav('/');
  };

  return (
    <nav>
      {localStorage.getItem('token') ? (
        <>
          <Link to="/perfil">Perfil</Link>
          {rol === 'admin' && <Link to="/admin">Admin</Link>}
          <button onClick={salir}>Salir</button>
        </>
      ) : (
        <>
          <Link to="/">Login</Link>
          <Link to="/registro">Registro</Link>
        </>
      )}
    </nav>
  );
}
