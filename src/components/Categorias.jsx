import React, { useState, useEffect } from 'react';
import { obtenerProductos, categoriasList } from '../data/productos';

export const Categorias = ({ agregarAlCarrito }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Categorías</h2>

      <div className="row justify-content-center mb-4">
        {categoriasList.map((cat, idx) => (
          <div key={idx} className="col-auto mb-2">
            <button
              className={`btn ${categoriaSeleccionada === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      <h3 className="mb-3">{categoriaSeleccionada}</h3>
      <div className="row g-4">
        {productosFiltrados.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img src={item.imagen} className="card-img-top" alt={item.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.nombre}</h5>
                <p className="card-text text-muted">{item.categoria}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-success">${item.precio.toLocaleString('es-CL')}</span>
                  <button 
                    className="btn btn-sm btn-dark"
                    onClick={() => agregarAlCarrito && agregarAlCarrito(item)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};