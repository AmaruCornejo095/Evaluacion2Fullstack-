import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Carrito = ({ carrito, setCarrito, procesarPago }) => {
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    comuna: ''
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleEliminar = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    procesarPago(datosCliente, true);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="card shadow-sm p-4 text-center">
          <p className="text-muted mb-3">El carrito está vacío.</p>
          <div className="d-flex justify-content-center">
            <Link to="/categorias" className="btn btn-primary">
              Ver productos
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Tabla de Productos */}
          <div className="col-12 col-lg-7">
            <div className="table-responsive">
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
            </div>
            <h4>Total: ${total.toLocaleString('es-CL')}</h4>
            <Link to="/categorias" className="btn btn-outline-secondary mt-2">
              Seguir comprando
            </Link>
          </div>

          {/* Formulario Checkout */}
          <div className="col-12 col-lg-5">
            <div className="card p-3 shadow-sm">
              <h5>Información del cliente</h5>
              <form onSubmit={handlePagar}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.nombre}
                    onChange={(e) => setDatosCliente({ ...datosCliente, nombre: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.apellidos}
                    onChange={(e) => setDatosCliente({ ...datosCliente, apellidos: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={datosCliente.correo}
                    onChange={(e) => setDatosCliente({ ...datosCliente, correo: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección de Envío</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.calle}
                    onChange={(e) => setDatosCliente({ ...datosCliente, calle: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Comuna</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.comuna}
                    onChange={(e) => setDatosCliente({ ...datosCliente, comuna: e.target.value })}
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
