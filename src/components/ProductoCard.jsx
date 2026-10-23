import React from 'react';

export const ProductoCard = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow-sm border-0">
        <img 
          src={producto.imagen} 
          className="card-img-top bg-light" 
          alt={producto.nombre} 
          style={{ height: '180px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 w-auto me-auto">{producto.cliente}</span>
          <h5 className="card-title fs-6 fw-bold">{producto.nombre}</h5>
          <p className="card-text text-muted small mb-1">
            Categoría: {producto.categoria}<br />
            <strong>Ubicación:</strong> {producto.ubicacion}
          </p>
          <p className="small text-primary fw-bold mb-2">Stock: {producto.stock} uds.</p>
          
          <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
            <div>
              {producto.enOferta ? (
                <>
                  <span className="text-decoration-line-through text-muted small me-1">
                    ${producto.precio.toLocaleString('es-CL')}
                  </span>
                  <span className="fw-bold text-danger">
                    ${producto.precioOferta.toLocaleString('es-CL')}
                  </span>
                </>
              ) : (
                <span className="fw-bold text-success">
                  ${producto.precio.toLocaleString('es-CL')}
                </span>
              )}
            </div>
            <button 
              className="btn btn-sm btn-dark"
              onClick={() => agregarAlCarrito(producto)}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};  