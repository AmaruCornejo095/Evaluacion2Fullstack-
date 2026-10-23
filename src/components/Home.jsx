import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos, categoriasList } from '../data/productos';
import { ProductoCard } from './ProductoCard';

<<<<<<< HEAD
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
=======
const iconosCategoria = {
  Electrónica: '🖥️',
  Calzado: '👟',
  Vestuario: '🧥',
  Alimentos: '🥫'
};

export const Home = ({ agregarAlCarrito }) => {
  const [productos] = useState(() => obtenerProductos());

  const ofertas = productos.filter(p => p.enOferta).slice(0, 4);
  const totalOfertas = productos.filter(p => p.enOferta).length;
  const categorias = categoriasList.filter(cat => cat !== 'Todas');
  const clientes = new Set(productos.map(p => p.cliente).filter(Boolean)).size;

  return (
    <div className="container my-4">
      <section className="bg-dark text-white rounded-4 p-4 p-md-5 mb-5 text-center">
        <span className="badge bg-warning text-dark mb-3">📦 Bodega San Bernardo · 5.000 m²</span>
        <h1 className="display-5 fw-bold">Retail y Tecnología</h1>
        <p className="lead text-white-50 mx-auto mb-4" style={{ maxWidth: '680px' }}>
          Productos de nuestras marcas y clientes con inventario en tiempo real,
          trazabilidad por ubicación y despacho directo desde nuestra bodega.
>>>>>>> 3d144b6765ab96419def470112d5f48fd7262b52
        </p>

        {/* Botones de navegación principal */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Link to="/ofertas" className="btn btn-warning btn-lg fw-bold px-4">
            Ver Ofertas 🔥
          </Link>
<<<<<<< HEAD
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
=======
          <Link to="/categorias" className="btn btn-outline-light btn-lg">
            Explorar Catálogo
          </Link>
        </div>
        <div className="row justify-content-center g-3 mt-4">
          <div className="col-4">
            <div className="fs-4 fw-bold">{productos.length}</div>
            <small className="text-white-50">Productos</small>
          </div>
          <div className="col-4">
            <div className="fs-4 fw-bold">{clientes}</div>
            <small className="text-white-50">Clientes</small>
          </div>
          <div className="col-4">
            <div className="fs-4 fw-bold text-warning">{totalOfertas}</div>
            <small className="text-white-50">Ofertas activas</small>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Categorías</h2>
          <Link to="/categorias" className="btn btn-sm btn-outline-secondary">
            Ver todas
          </Link>
        </div>
        <div className="row g-4">
          {categorias.map(cat => {
            const cantidad = productos.filter(p => p.categoria === cat).length;
            return (
              <div key={cat} className="col-12 col-sm-6 col-lg-3">
                <Link
                  to={`/categorias?cat=${encodeURIComponent(cat)}`}
                  className="card h-100 shadow-sm text-decoration-none text-body"
                >
                  <div className="card-body py-4 text-center">
                    <div className="fs-1 mb-2">{iconosCategoria[cat] || '🛍️'}</div>
                    <h5 className="card-title mb-1">{cat}</h5>
                    <p className="card-text text-muted mb-0">
                      {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0 text-danger">🔥 Ofertas del momento</h2>
          <Link to="/ofertas" className="btn btn-sm btn-outline-danger">
            Ver todas
          </Link>
        </div>
        <div className="row g-4">
          {ofertas.map(item => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductoCard producto={item} agregarAlCarrito={agregarAlCarrito} />
            </div>
          ))}
        </div>
      </section>

      <section className="row g-4 text-center border-top pt-5 mb-3">
        <div className="col-12 col-md-4">
          <div className="fs-2 mb-2">🚚</div>
          <h5>Despacho 24 a 48 horas</h5>
          <p className="text-muted mb-0">Preparamos y despachamos tu pedido con seguimiento en todo el país.</p>
        </div>
        <div className="col-12 col-md-4">
          <div className="fs-2 mb-2">📦</div>
          <h5>Stock en tiempo real</h5>
          <p className="text-muted mb-0">Cada ingreso, egreso o traslado se refleja al instante en el inventario.</p>
        </div>
        <div className="col-12 col-md-4">
          <div className="fs-2 mb-2">🔒</div>
          <h5>Datos protegidos</h5>
          <p className="text-muted mb-0">Cada cliente solo puede ver la información de sus propios productos.</p>
        </div>
      </section>
>>>>>>> 3d144b6765ab96419def470112d5f48fd7262b52
    </div>
  );
};