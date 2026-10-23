import React, { useState } from 'react';

export const Carrito = ({ carrito, setCarrito, setVistaActual }) => {
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    correo: '',
    direccion: ''
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleEliminar = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return alert('El carrito está vacío');
    alert('¡Pago realizado con éxito! Código de orden: #' + Math.floor(Math.random() * 899999 + 100000));
    setCarrito([]);
    setVistaActual('categorias');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío.</div>
      ) : (
        <div className="row g-4">
          {/* Tabla de Productos */}
          <div className="col-12 col-lg-7">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>${item.precio.toLocaleString('es-CL')}</td>
                    <td>{item.cantidad}</td>
                    <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>Total: ${total.toLocaleString('es-CL')}</h4>
          </div>

          {/* Formulario Checkout */}
          <div className="col-12 col-lg-5">
            <div className="card p-3 shadow-sm">
              <h5>Información del cliente</h5>
              <form onSubmit={handlePagar}>
                <div className="mb-3">
                  <label className="form-label">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    onChange={(e) => setDatosCliente({...datosCliente, nombre: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required 
                    onChange={(e) => setDatosCliente({...datosCliente, correo: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección de Envío</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    onChange={(e) => setDatosCliente({...datosCliente, direccion: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Pagar ahora ${total.toLocaleString('es-CL')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};