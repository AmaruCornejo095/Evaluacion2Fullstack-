import React from 'react';

export const ProductoCard = ({ producto, agregarAlCarrito, modo = 'normal' }) => {
  const esOferta = modo === 'oferta';

  return (
    <div className={`card h-100 shadow-sm ${esOferta ? 'border-warning' : ''}`}>
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted">{producto.categoria}</p>
        {esOferta ? (
          <>
            <div className="mb-2">
              <span className="text-decoration-line-through text-muted me-2">
                ${producto.precio.toLocaleString('es-CL')}
              </span>
              <span className="fw-bold text-danger fs-5">
                ${producto.precioOferta.toLocaleString('es-CL')}
              </span>
            </div>
            <button
              className="btn btn-warning mt-auto"
              onClick={() => agregarAlCarrito && agregarAlCarrito({ ...producto, precio: producto.precioOferta })}
            >
              Añadir Oferta
            </button>
          </>
        ) : (
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="fw-bold text-success">${producto.precio.toLocaleString('es-CL')}</span>
            <button
              className="btn btn-sm btn-dark"
              onClick={() => agregarAlCarrito && agregarAlCarrito(producto)}
            >
              Añadir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
