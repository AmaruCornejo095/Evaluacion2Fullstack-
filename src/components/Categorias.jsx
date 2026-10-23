import React, { useState } from 'react';
import { productosIniciales, categoriasList } from '../data/productos';

export const Categorias = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [productos] = useState(productosIniciales);

  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Categorías</h2>
      
      {/* Botones de Categorías */}
      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        {categoriasList.map((cat, index) => (
          <button
            key={index}
            className={`btn ${categoriaSeleccionada === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Productos Responsivo con Bootstrap */}
      <div className="row g-4">
        {productosFiltrados.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img src={item.imagen} className="card-img-top" alt={item.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.nombre}</h5>
                <p className="card-text text-muted">{item.categoria}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-success">${item.precio.toLocaleString()}</span>
                  <button className="btn btn-sm btn-outline-success">Añadir</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};