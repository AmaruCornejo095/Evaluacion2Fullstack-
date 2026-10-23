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
      <h2 className="mb-4 text-center fw-bold text-dark">Categorías</h2>

      {/* Botones de Filtro */}
      <div className="row justify-content-center mb-4">
        {categoriasList.map((cat, idx) => (
          <div key={idx} className="col-auto mb-2">
            <button
              className={`btn ${categoriaSeleccionada === cat ? 'btn-dark' : 'btn-outline-secondary'} rounded-pill px-4`}
              onClick={() => seleccionarCategoria(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      <h3 className="mb-4 fw-semibold border-bottom pb-2">{categoriaSeleccionada}</h3>
      
      {/* Grilla de Productos sin envoltorios col duplicados */}
      <div className="row g-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => (
            <ProductoCard 
              key={item.id} 
              producto={item} 
              agregarAlCarrito={agregarAlCarrito} 
            />
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