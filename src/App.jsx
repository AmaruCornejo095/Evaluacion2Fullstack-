import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/Navbar';
import { Categorias } from './components/Categorias';
import { Carrito } from './components/Carrito';

function App() {
  const [vistaActual, setVistaActual] = useState('categorias');
  const [carrito, setCarrito] = useState([]);

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

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div>
      <Navbar 
        totalCarrito={totalCarrito} 
        cantidadItems={cantidadItems} 
        setVistaActual={setVistaActual} 
      />
      
      <main>
        {vistaActual === 'categorias' ? (
          <Categorias agregarAlCarrito={agregarAlCarrito} />
        ) : (
          <Carrito 
            carrito={carrito} 
            setCarrito={setCarrito} 
            setVistaActual={setVistaActual} 
          />
        )}
      </main>
    </div>
  );
}

export default App
