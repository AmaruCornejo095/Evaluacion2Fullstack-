import React from 'react';

export const ProductoCard = ({ producto, agregarAlCarrito }) => {
  if (!producto) return null;

  const precioMostrar = producto.enOferta ? producto.precioOferta : producto.precio;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
        {/* Badge de Oferta */}
        {producto.enOferta && (
          <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 fs-7 fw-bold rounded-end mt-2 z-1">
            ¡Oferta!
          </span>
        )}

        {/* Imagen del Producto */}
        <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
          <img 
            src={producto.imagen} 
            className="card-img-top h-100 w-100" 
            alt={producto.nombre} 
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Cuerpo de la Tarjeta */}
        <div className="card-body d-flex flex-column p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">
              {producto.cliente || 'LogiStock'}
            </span>
            <small className="text-muted fw-semibold">{producto.categoria}</small>
          </div>

          <h5 className="card-title fs-6 fw-bold text-dark mb-2 text-truncate">
            {producto.nombre}
          </h5>

          <div className="bg-light p-2 rounded mb-3 small text-muted">
            <div className="d-flex justify-content-between">
              <span>Ubicación:</span>
              <strong className="text-dark">{producto.ubicacion || 'General'}</strong>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <span>Stock:</span>
              <strong className={producto.stock < 50 ? 'text-danger' : 'text-success'}>
                {producto.stock} uds.
              </strong>
            </div>
          </div>

          {/* Precio y Botón */}
          <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
            <div>
              {producto.enOferta && (
                <small className="text-muted text-decoration-line-through d-block" style={{ fontSize: '0.75rem' }}>
                  ${producto.precio?.toLocaleString('es-CL')}
                </small>
              )}
              <span className="fw-bold text-dark fs-6">
                ${precioMostrar?.toLocaleString('es-CL')}
              </span>
            </div>

            <button 
              className="btn btn-dark btn-sm px-3 rounded-2"
              onClick={() => agregarAlCarrito && agregarAlCarrito(producto)}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};