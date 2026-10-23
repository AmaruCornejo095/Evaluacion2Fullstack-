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
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `btn ${isActive ? 'btn-info' : 'btn-outline-info'}`}
          >
            ⚙️ Admin
          </NavLink>
          <NavLink
            to="/carrito"
            className={({ isActive }) => `btn ${isActive ? 'btn-success' : 'btn-outline-success'}`}
          >
            🛒 Carrito ({cantidadItems}) - ${totalCarrito.toLocaleString('es-CL')}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
