import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { obtenerProductos, categoriasList } from '../data/productos';
import { ProductoCard } from './ProductoCard';

export const Categorias = ({ agregarAlCarrito }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productos] = useState(() => obtenerProductos());

  const categoriaParam = searchParams.get('cat');
  const categoriaSeleccionada = categoriasList.includes(categoriaParam) ? categoriaParam : 'Todas';

  const seleccionarCategoria = (cat) => {
    setSearchParams(cat === 'Todas' ? {} : { cat });
  };

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
              onClick={() => seleccionarCategoria(cat)}
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
            <ProductoCard producto={item} agregarAlCarrito={agregarAlCarrito} />
          </div>
        ))}
      </div>
    </div>
  );
};
