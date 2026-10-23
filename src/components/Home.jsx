import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos, categoriasList } from '../data/productos';
import { ProductoCard } from './ProductoCard';

export const Home = ({ agregarAlCarrito }) => {
  const [productos] = useState(() => obtenerProductos());
  
  const ofertasActivas = productos.filter(p => p.enOferta).length;
  const totalCategorias = categoriasList.filter(c => c !== 'Todas').length;

  return (
    <div>
      {/* Hero Banner LogiStock */}
      <div className="bg-dark text-white py-5 px-3 rounded-3 my-4 text-center shadow-sm">
        <span className="badge bg-warning text-dark mb-2 px-3 py-2 fw-bold">
          📦 Sistema de Gestión LogiStock
        </span>
        <h1 className="display-5 fw-bold mb-3">LogiStock Inventory</h1>
        <p className="lead text-secondary col-lg-8 mx-auto mb-4">
          Control centralizado de existencias, salidas e inventario para TechStore, ModaHoy y Alimentos Sanos.
        </p>

        {/* Botones de navegación principal */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Link to="/ofertas" className="btn btn-warning btn-lg fw-bold px-4">
            Ver Ofertas 🔥
          </Link>
          <Link to="/categorias" className="btn btn-outline-light btn-lg px-4">
            Explorar Categorías
          </Link>
        </div>

        {/* Métricas del Sistema */}
        <div className="row justify-content-center border-top border-secondary pt-4 mt-2">
          <div className="col-auto px-4">
            <h3 className="fw-bold mb-0 text-white">{productos.length}</h3>
            <small className="text-secondary">Productos</small>
          </div>
          <div className="col-auto px-4 border-start border-end border-secondary">
            <h3 className="fw-bold mb-0 text-white">{totalCategorias}</h3>
            <small className="text-secondary">Categorías</small>
          </div>
          <div className="col-auto px-4">
            <h3 className="fw-bold mb-0 text-warning">{ofertasActivas}</h3>
            <small className="text-secondary">Ofertas activas</small>
          </div>
        </div>
      </div>

      {/* Sección Productos Destacados */}
      <div className="container my-5">
        <h3 className="fw-bold mb-4">Inventario Destacado</h3>
        <div className="row g-4">
          {productos.slice(0, 4).map((item) => (
            <ProductoCard 
              key={item.id} 
              producto={item} 
              agregarAlCarrito={agregarAlCarrito} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};