import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

export const Navbar = ({ totalItems = 0, totalMonto = 0 }) => {
=======
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ totalCarrito, cantidadItems }) => {
>>>>>>> 3d144b6765ab96419def470112d5f48fd7262b52
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2 shadow-sm">
      <div className="container-fluid">
<<<<<<< HEAD
        <Link className="navbar-brand fw-bold text-white fs-4" to="/">
          📦 LogiStock
        </Link>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <Link to="/" className="btn btn-outline-light btn-sm px-3">
            Inicio
          </Link>
          <Link to="/categorias" className="btn btn-outline-light btn-sm px-3">
            Categorías
          </Link>
          <Link to="/ofertas" className="btn btn-outline-warning btn-sm px-3 fw-bold">
            Ofertas 🔥
          </Link>
          <Link to="/admin" className="btn btn-outline-info btn-sm px-3">
            ⚙️ Admin
          </Link>
          <Link to="/checkout" className="btn btn-success btn-sm px-3 fw-bold">
            🛒 Salidas ({totalItems}) - ${totalMonto.toLocaleString('es-CL')}
          </Link>
=======
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
>>>>>>> 3d144b6765ab96419def470112d5f48fd7262b52
        </div>
      </div>
    </nav>
  );
};
