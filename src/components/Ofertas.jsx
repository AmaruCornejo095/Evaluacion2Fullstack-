import React, { useState } from 'react';
import { obtenerProductos } from '../data/productos';
import { ProductoCard } from './ProductoCard';

export const Ofertas = ({ agregarAlCarrito }) => {
  const [ofertas] = useState(() => obtenerProductos().filter(p => p.oferta));

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center text-danger">🔥 Productos en Oferta</h2>
      <div className="row g-4">
        {ofertas.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductoCard
              producto={item}
              modo="oferta"
              agregarAlCarrito={agregarAlCarrito}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
