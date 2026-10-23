import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/Navbar';
import { Categorias } from './components/Categorias';
import { Ofertas } from './components/Ofertas';
import { Carrito } from './components/Carrito';
import { PagoResultado } from './components/PagoResultado';

function App() {
  const [vistaActual, setVistaActual] = useState('categorias');
  const [carrito, setCarrito] = useState([]);
  const [datosOrden, setDatosOrden] = useState(null);
  const [pagoExitoso, setPagoExitoso] = useState(true);

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

  const procesarPago = (cliente, simularExito) => {
    const orden = {
      ordenId: '20240705',
      cliente,
      productos: [...carrito],
      total: totalCarrito
    };
    setDatosOrden(orden);
    setPagoExitoso(simularExito);
    if (simularExito) {
      setCarrito([]);
    }
    setVistaActual('pago_resultado');
  };

  return (
    <div>
      <Navbar 
        totalCarrito={totalCarrito} 
        cantidadItems={cantidadItems} 
        setVistaActual={setVistaActual}
        vistaActual={vistaActual}
      />
      
      <main>
        {vistaActual === 'categorias' && <Categorias agregarAlCarrito={agregarAlCarrito} />}
        {vistaActual === 'ofertas' && <Ofertas agregarAlCarrito={agregarAlCarrito} />}
        {vistaActual === 'carrito' && (
          <Carrito 
            carrito={carrito} 
            setCarrito={setCarrito} 
            procesarPago={procesarPago} 
          />
        )}
        {vistaActual === 'pago_resultado' && (
          <PagoResultado 
            exito={pagoExitoso} 
            datosOrden={datosOrden} 
            setVistaActual={setVistaActual} 
          />
        )}
      </main>
    </div>
  );
}

export default App;