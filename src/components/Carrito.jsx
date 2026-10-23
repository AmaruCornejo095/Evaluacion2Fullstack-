import React, { useState } from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
export const Carrito = ({ carrito, setCarrito, finalizarCompra }) => {
  const [cliente, setCliente] = useState({
=======
export const Carrito = ({ carrito, setCarrito, procesarPago }) => {
  const [datosCliente, setDatosCliente] = useState({
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
<<<<<<< HEAD
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
=======
    comuna: ''
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleEliminar = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const handlePagar = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (carrito.length === 0) return alert('El carrito está vacío.');
    
    // Generar orden y llamar a la función de finalización sin usar alert() emergente
    const nuevaOrden = {
      ordenId: Math.floor(100000 + Math.random() * 900000).toString(),
      cliente,
      productos: [...carrito],
      total
    };
    
    finalizarCompra(nuevaOrden);
=======
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    procesarPago(datosCliente, true);
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
  };

  return (
    <div className="container my-4">
<<<<<<< HEAD
      <h2 className="mb-4 fw-bold">Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <div className="alert alert-info">El carrito de compras está vacío.</div>
=======
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
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
      ) : (
        <div className="row g-4">
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
<<<<<<< HEAD
                ))}
              </tbody>
            </table>
            <h4 className="fw-bold mt-3">Total: ${total.toLocaleString('es-CL')}</h4>
=======
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
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
          </div>

          <div className="col-12 col-lg-5">
            <div className="card p-4 shadow-sm border-0 rounded-3">
              <h5 className="fw-bold mb-3">Información del cliente</h5>
              <form onSubmit={handlePagar}>
<<<<<<< HEAD
                <div className="mb-2">
                  <label className="form-label small">Nombre Completo</label>
                  <input type="text" className="form-control" required value={cliente.nombre} onChange={(e) => setCliente({...cliente, nombre: e.target.value})} />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Correo Electrónico</label>
                  <input type="email" className="form-control" required value={cliente.correo} onChange={(e) => setCliente({...cliente, correo: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label small">Dirección de Envío</label>
                  <input type="text" className="form-control" required value={cliente.calle} onChange={(e) => setCliente({...cliente, calle: e.target.value})} />
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
=======
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
>>>>>>> 3b44f98ce5c6f5ea3f2302eecd07c2b1e8bf45d3
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
