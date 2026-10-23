import React from 'react';

export const Navbar = ({ totalCarrito, cantidadItems, setVistaActual, vistaActual }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home" onClick={() => setVistaActual('categorias')}>
          Tienda Online
        </a>
        <div className="d-flex align-items-center gap-2">
          <button 
            className={`btn ${vistaActual === 'categorias' ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setVistaActual('categorias')}
          >
            Categorías
          </button>
          <button 
            className={`btn ${vistaActual === 'ofertas' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setVistaActual('ofertas')}
          >
            Ofertas 🔥
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
          >
            🛒 Carrito ({cantidadItems}) - ${totalCarrito.toLocaleString('es-CL')}
          </button>
        </div>
      </div>
    </nav>
  );
};