import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ totalCarrito, cantidadItems }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Tienda Online
        </Link>
        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-light'}`}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/categorias"
            className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-light'}`}
          >
            Categorías
          </NavLink>
          <NavLink
            to="/ofertas"
            className={({ isActive }) => `btn ${isActive ? 'btn-warning' : 'btn-outline-warning'}`}
          >
            Ofertas 🔥
<<<<<<< HEAD
          </button>
          <button 
            className={`btn ${vistaActual === 'admin' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => setVistaActual('admin')}
          >
            ⚙️ Admin
          </button>
          <button 
            className="btn btn-success"
            onClick={() => setVistaActual('carrito')}
=======
          </NavLink>
          <NavLink
            to="/carrito"
            className={({ isActive }) => `btn ${isActive ? 'btn-success' : 'btn-outline-success'}`}
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
          >
            🛒 Carrito ({cantidadItems}) - ${totalCarrito.toLocaleString('es-CL')}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
