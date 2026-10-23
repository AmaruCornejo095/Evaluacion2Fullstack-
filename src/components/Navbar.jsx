import React from 'react';

export const Navbar = ({ totalCarrito, cantidadItems, setVistaActual, vistaActual }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-3 shadow">
      <div className="container-fluid">
        <a 
          className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" 
          href="#" 
          onClick={(e) => { e.preventDefault(); setVistaActual('home'); }}
        >
          📦 LogiStock
        </a>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <button 
            className={`btn ${vistaActual === 'home' ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setVistaActual('home')}
          >
            Inicio
          </button>
          <button 
            className={`btn ${vistaActual === 'categorias' ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setVistaActual('categorias')}
          >
            Categorías
          </button>
          <button 
            className={`btn ${vistaActual === 'ofertas' ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning'}`}
            onClick={() => setVistaActual('ofertas')}
          >
            Ofertas 🔥
          </button>
          <button 
            className={`btn ${vistaActual === 'admin' ? 'btn-info text-white' : 'btn-outline-info'}`}
            onClick={() => setVistaActual('admin')}
          >
            ⚙️ Admin
          </button>
          <button 
            className="btn btn-success fw-bold"
            onClick={() => setVistaActual('carrito')}
          >
            🛒 Salidas ({cantidadItems}) - ${totalCarrito.toLocaleString('es-CL')}
          </button>
        </div>
      </div>
    </nav>
  );
};