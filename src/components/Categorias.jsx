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
<<<<<<< HEAD
      <h2 className="mb-4 text-center fw-bold text-dark">Categorías</h2>
=======
      <h2 className="mb-2 text-center">Catálogo de Productos</h2>
      <p className="text-muted text-center mb-4">
        Inventario disponible en la bodega de San Bernardo, con ubicación y stock actualizado.
      </p>
>>>>>>> 3d144b6765ab96419def470112d5f48fd7262b52

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

<<<<<<< HEAD
      <h3 className="mb-4 fw-semibold border-bottom pb-2">{categoriaSeleccionada}</h3>
      
      {/* Grilla de Productos sin envoltorios col duplicados */}
=======
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">{categoriaSeleccionada}</h3>
        <span className="badge bg-light text-secondary border">
          {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>
>>>>>>> 3d144b6765ab96419def470112d5f48fd7262b52
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