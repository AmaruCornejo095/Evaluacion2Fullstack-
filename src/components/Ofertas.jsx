import React, { useState } from 'react';
import { obtenerProductos } from '../data/productos';
import { ProductoCard } from './ProductoCard';

export const Ofertas = ({ agregarAlCarrito }) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3d144b6765ab96419def470112d5f48fd7262b52
          </div>
        )}
      </div>
    </div>
  );
};