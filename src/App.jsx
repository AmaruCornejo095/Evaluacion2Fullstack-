import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Categorias } from './components/Categorias';
import { Ofertas } from './components/Ofertas';
import { Carrito } from './components/Carrito';
<<<<<<< HEAD
import { CompraExitosa } from './components/CompraExitosa';
import { AdminDashboard } from './components/AdminDashboard';
=======
import { PagoResultado } from './components/PagoResultado';
import { NoEncontrado } from './components/NoEncontrado';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3

function App() {
  const [carrito, setCarrito] = useState([]);
<<<<<<< HEAD
  const [ordenData, setOrdenData] = useState(null);
=======
  const [datosOrden, setDatosOrden] = useState(null);
  const [pagoExitoso, setPagoExitoso] = useState(true);
  const navigate = useNavigate();
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3

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

  const finalizarCompra = (nuevaOrden) => {
    setOrdenData(nuevaOrden);
    setCarrito([]); // Limpiar carrito
    setVistaActual('compra_exitosa'); // Cambiar a la vista producida
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

<<<<<<< HEAD
  return (
    <div>
      {vistaActual !== 'admin' && (
        <Navbar 
          totalCarrito={totalCarrito} 
          cantidadItems={cantidadItems} 
          setVistaActual={setVistaActual}
          vistaActual={vistaActual}
        />
      )}
      
      <main>
        {vistaActual === 'categorias' && <Categorias agregarAlCarrito={agregarAlCarrito} />}
        {vistaActual === 'ofertas' && <Ofertas agregarAlCarrito={agregarAlCarrito} />}
        {vistaActual === 'carrito' && (
          <Carrito 
            carrito={carrito} 
            setCarrito={setCarrito} 
            finalizarCompra={finalizarCompra} 
          />
        )}
        {vistaActual === 'compra_exitosa' && (
          <CompraExitosa 
            ordenData={ordenData} 
            setVistaActual={setVistaActual} 
          />
        )}
        {vistaActual === 'admin' && (
          <AdminDashboard 
            setVistaActual={setVistaActual} 
          />
        )}
=======
  const procesarPago = (cliente, simularExito) => {
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
      <Navbar totalCarrito={totalCarrito} cantidadItems={cantidadItems} />

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
            <PagoResultado
              exito={pagoExitoso}
              datosOrden={datosOrden}
            />
          } />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
      </main>

      <footer className="bg-dark text-white-50 text-center py-3 mt-5">
        <small>Tienda Online · Los mejores videojuegos al mejor precio</small>
      </footer>
    </div>
  );
}

export default App;
