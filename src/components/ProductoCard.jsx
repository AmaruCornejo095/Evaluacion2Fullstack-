import React from 'react';

export const ProductoCard = ({ producto, agregarAlCarrito }) => {
  if (!producto) return null;

  const stock = producto.stock ?? 0;
  const precioOferta = producto.precioOferta ?? producto.precio;
  const precioMostrar = producto.enOferta ? precioOferta : producto.precio;

  return (
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
        <p className={`small fw-bold mb-2 ${stock <= 20 ? 'text-warning' : 'text-primary'}`}>
          Stock: {stock} uds.
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
            {producto.enOferta ? (
              <>
                <span className="text-decoration-line-through text-muted small me-1">
                  ${producto.precio.toLocaleString('es-CL')}
                </span>
                <span className="fw-bold text-danger">
                  ${precioMostrar.toLocaleString('es-CL')}
                </span>
              </>
            ) : (
              <span className="fw-bold text-success">
                ${precioMostrar.toLocaleString('es-CL')}
              </span>
            )}
          </div>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => agregarAlCarrito?.(producto)}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};
