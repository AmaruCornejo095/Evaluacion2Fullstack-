import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../data/productos';

export const Ofertas = ({ agregarAlCarrito }) => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const todos = obtenerProductos();
    setOfertas(todos.filter(p => p.oferta));
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center text-danger">🔥 Productos en Oferta</h2>
      <div className="row g-4">
        {ofertas.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 border-warning shadow-sm">
              <img src={item.imagen} className="card-img-top" alt={item.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.nombre}</h5>
                <p className="card-text text-muted">{item.categoria}</p>
                <div className="mb-2">
                  <span className="text-decoration-line-through text-muted me-2">
                    ${item.precio.toLocaleString('es-CL')}
                  </span>
                  <span className="fw-bold text-danger fs-5">
                    ${item.precioOferta.toLocaleString('es-CL')}
                  </span>
                </div>
                <button 
                  className="btn btn-warning mt-auto"
                  onClick={() => agregarAlCarrito({ ...item, precio: item.precioOferta })}
                >
                  Añadir Oferta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};