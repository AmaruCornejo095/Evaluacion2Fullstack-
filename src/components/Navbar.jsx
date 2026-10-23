import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ totalItems = 0, totalMonto = 0 }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2 shadow-sm">
      <div className="container-fluid">
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
        </div>
      </div>
    </nav>
  );
};