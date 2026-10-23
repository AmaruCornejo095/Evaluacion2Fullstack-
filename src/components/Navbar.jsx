import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ totalCarrito = 0, cantidadItems = 0 }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-3 shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          📦 LogiStock
          <small className="d-block text-white-50 fw-normal" style={{ fontSize: '0.65rem' }}>
            Retail &amp; Tecnología
          </small>
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
            Catálogo
          </NavLink>
          <NavLink
            to="/ofertas"
            className={({ isActive }) => `btn ${isActive ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning'}`}
          >
            Ofertas 🔥
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `btn ${isActive ? 'btn-info text-dark' : 'btn-outline-info'}`}
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
