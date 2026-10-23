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
      <h2 className="mb-2 text-center">Catálogo de Productos</h2>
      <p className="text-muted text-center mb-4">
        Inventario disponible en la bodega de San Bernardo, con ubicación y stock actualizado.
      </p>

      <div className="row justify-content-center mb-4">
        {categoriasList.map((cat) => (
          <div key={cat} className="col-auto mb-2">
            <button
              className={`btn ${categoriaSeleccionada === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => seleccionarCategoria(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">{categoriaSeleccionada}</h3>
        <span className="badge bg-light text-secondary border">
          {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>
      <div className="row g-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductoCard producto={item} agregarAlCarrito={agregarAlCarrito} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No hay productos disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};
