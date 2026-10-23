import React from 'react';
import { Link } from 'react-router-dom';

export const NoEncontrado = () => {
  return (
    <div className="container my-5 text-center">
      <div className="card shadow-sm p-5">
        <h1 className="display-4 fw-bold text-dark mb-2">404</h1>
        <h3 className="mb-3">Página no encontrada</h3>
        <p className="text-muted mb-4">
          La página que buscas no existe o fue movida a otra dirección.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
          <Link to="/" className="btn btn-primary">
            Volver al Inicio
          </Link>
          <Link to="/categorias" className="btn btn-outline-secondary">
            Ir a Categorías
          </Link>
        </div>
      </div>
    </div>
  );
};
