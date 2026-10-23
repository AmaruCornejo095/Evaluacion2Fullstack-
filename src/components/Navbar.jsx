import React from 'react';

export const Navbar = ({ totalCarrito, cantidadItems, setVistaActual }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#" onClick={() => setVistaActual('categorias')}>
          Tienda Online
        </a>
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-light"
            onClick={() => setVistaActual('categorias')}
          >
            Categorías
          </button>
          <button 
            className="btn btn-success"
            onClick={() => setVistaActual('carrito')}
          >
            🛒 Carrito ({cantidadItems}) - ${totalCarrito.toLocaleString('es-CL')}
          </button>
        </div>
      </div>
    </nav>
  );
};