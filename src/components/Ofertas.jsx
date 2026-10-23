import React, { useState } from 'react';
import { obtenerProductos } from '../data/productos';
import { ProductoCard } from './ProductoCard';

export const Ofertas = ({ agregarAlCarrito }) => {
  const [ofertas] = useState(() => obtenerProductos().filter(p => p.enOferta));

  return (
    <div className="container my-4">
      <h2 className="mb-2 text-center text-danger">🔥 Productos en Oferta</h2>
      <p className="text-muted text-center mb-4">
        Oportunidades de retail y tecnología con stock confirmado en bodega.
      </p>
      <div className="row g-4">
        {ofertas.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductoCard producto={item} agregarAlCarrito={agregarAlCarrito} />
          </div>
        ))}
      </div>
    </div>
  );
};
