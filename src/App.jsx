import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Categorias } from './components/Categorias';
import { Ofertas } from './components/Ofertas';
import { Carrito } from './components/Carrito';
import { CompraExitosa } from './components/CompraExitosa';
import { PagoResultado } from './components/PagoResultado';
import { AdminDashboard } from './components/AdminDashboard';
import { NoEncontrado } from './components/NoEncontrado';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [carrito, setCarrito] = useState([]);
  const [datosOrden, setDatosOrden] = useState(null);
  const [pagoExitoso, setPagoExitoso] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const esAdmin = pathname.startsWith('/admin');

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const procesarPago = (cliente, simularExito = true) => {
    const orden = {
      ordenId: String(Math.floor(Math.random() * 900000) + 100000),
      cliente,
      productos: [...carrito],
      total: totalCarrito
    };

    setDatosOrden(orden);
    setPagoExitoso(simularExito);
    if (simularExito) {
      setCarrito([]);
    }
    navigate('/checkout/resultado');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      {!esAdmin && <Navbar totalCarrito={totalCarrito} cantidadItems={cantidadItems} />}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/categorias" element={<Categorias agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/ofertas" element={<Ofertas agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={
            <Carrito
              carrito={carrito}
              setCarrito={setCarrito}
              procesarPago={procesarPago}
            />
          } />
          <Route path="/checkout/resultado" element={
            !datosOrden
              ? <Navigate to="/" replace />
              : pagoExitoso
                ? <CompraExitosa ordenData={datosOrden} />
                : <PagoResultado exito={false} datosOrden={datosOrden} />
          } />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      {!esAdmin && (
        <footer className="bg-dark text-white-50 text-center py-3 mt-5">
          <small>Tienda Online · Los mejores videojuegos al mejor precio</small>
        </footer>
      )}
    </div>
  );
}

export default App;
