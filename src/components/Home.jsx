import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos, categoriasList } from '../data/productos';
import { ProductoCard } from './ProductoCard';

const iconosCategoria = {
  Nintendo: '🍄',
  PlayStation: '🎮',
  'PC / Consolas': '🖥️'
};

export const Home = ({ agregarAlCarrito }) => {
  const [productos] = useState(() => obtenerProductos());

  const ofertas = productos.filter(p => p.oferta).slice(0, 4);
  const categorias = categoriasList.filter(cat => cat !== 'Todas');

  return (
    <div className="container my-4">
      {/* Hero */}
      <section className="bg-dark text-white rounded-4 p-4 p-md-5 mb-5 text-center">
        <span className="badge bg-warning text-dark mb-3">🔥 Semana Gamer</span>
        <h1 className="display-5 fw-bold">Tienda Online</h1>
        <p className="lead text-white-50 mx-auto mb-4" style={{ maxWidth: '620px' }}>
          Los mejores videojuegos para Nintendo, PlayStation y PC, con ofertas que no
          vas a encontrar en ningún otro lado.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
          <Link to="/ofertas" className="btn btn-warning btn-lg fw-semibold">
            Ver Ofertas 🔥
          </Link>
          <Link to="/categorias" className="btn btn-outline-light btn-lg">
            Explorar Categorías
          </Link>
        </div>
        <div className="row justify-content-center g-3 mt-4">
          <div className="col-4">
            <div className="fs-4 fw-bold">{productos.length}</div>
            <small className="text-white-50">Productos</small>
          </div>
          <div className="col-4">
            <div className="fs-4 fw-bold">{categorias.length}</div>
            <small className="text-white-50">Categorías</small>
          </div>
          <div className="col-4">
            <div className="fs-4 fw-bold text-warning">{ofertas.length}</div>
            <small className="text-white-50">Ofertas activas</small>
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
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
              <div key={cat} className="col-12 col-sm-4">
                <Link
                  to={`/categorias?cat=${encodeURIComponent(cat)}`}
                  className="card h-100 shadow-sm text-decoration-none text-body"
                >
                  <div className="card-body py-4 text-center">
                    <div className="fs-1 mb-2">{iconosCategoria[cat] || '🕹️'}</div>
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

      {/* Ofertas del momento */}
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
              <ProductoCard
                producto={item}
                modo="oferta"
                agregarAlCarrito={agregarAlCarrito}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="row g-4 text-center border-top pt-5 mb-3">
        <div className="col-12 col-md-4">
          <div className="fs-2 mb-2">🚚</div>
          <h5>Envío rápido</h5>
          <p className="text-muted mb-0">Recibe tu pedido en 24 a 48 horas en todo el país.</p>
        </div>
        <div className="col-12 col-md-4">
          <div className="fs-2 mb-2">🔒</div>
          <h5>Pago seguro</h5>
          <p className="text-muted mb-0">Tus datos y compras están protegidos en cada transacción.</p>
        </div>
        <div className="col-12 col-md-4">
          <div className="fs-2 mb-2">✅</div>
          <h5>Garantía</h5>
          <p className="text-muted mb-0">Todos nuestros juegos cuentan con garantía de 90 días.</p>
        </div>
      </section>
    </div>
  );
};
