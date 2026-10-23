import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/Navbar';
import { Categorias } from './components/Categorias';
import { Ofertas } from './components/Ofertas';
import { Carrito } from './components/Carrito';
import { CompraExitosa } from './components/CompraExitosa';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [vistaActual, setVistaActual] = useState('categorias');
  const [carrito, setCarrito] = useState([]);
  const [ordenData, setOrdenData] = useState(null);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const finalizarCompra = (nuevaOrden) => {
    setOrdenData(nuevaOrden);
    setCarrito([]); // Limpiar carrito
    setVistaActual('compra_exitosa'); // Cambiar a la vista producida
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

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
      </main>
    </div>
  );
}

export default App;