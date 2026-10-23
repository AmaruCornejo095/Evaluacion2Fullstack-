import React, { useState } from 'react';
import { obtenerProductos } from '../data/productos';
import { ProductoCard } from './ProductoCard';

export const Ofertas = ({ agregarAlCarrito }) => {
  const [productos] = useState(() => obtenerProductos());
  const ofertas = productos.filter((p) => p.enOferta);

  return (
    <div className="container my-4">
      {/* Banner promocional */}
      <div className="bg-warning bg-opacity-10 border border-warning rounded-3 p-4 text-center mb-4">
        <h2 className="fw-bold text-dark mb-1">🔥 Descuentos y Promociones LogiStock</h2>
        <p className="text-muted mb-0">
          Aprovecha los precios preferenciales en inventario seleccionado para nuestros clientes asociados.
        </p>
      </div>

      <div className="row g-4">
        {ofertas.length > 0 ? (
          ofertas.map((item) => (
            <ProductoCard 
              key={item.id} 
              producto={item} 
              agregarAlCarrito={agregarAlCarrito} 
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No hay ofertas activas en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};