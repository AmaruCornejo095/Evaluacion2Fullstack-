import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AvisoFlotante } from './AvisoFlotante';

export const Carrito = ({ carrito, setCarrito, procesarPago }) => {
  const [aviso, setAviso] = useState(null);
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: '',
    indicaciones: ''
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const actualizarCampo = (campo) => (e) => {
    setDatosCliente({ ...datosCliente, [campo]: e.target.value });
  };

  const handleEliminar = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      setAviso({
        tipo: 'warning',
        titulo: 'Carrito vacío',
        mensaje: 'Agrega productos al carrito antes de pagar.'
      });
      return;
    }
    procesarPago(datosCliente, true);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="card shadow-sm p-4 text-center">
          <p className="text-muted mb-3">El carrito de compras está vacío.</p>
          <div className="d-flex justify-content-center">
            <Link to="/categorias" className="btn btn-primary">
              Ver productos
            </Link>
          </div>
        </div>
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
            <h4 className="fw-bold mt-3">Total: ${total.toLocaleString('es-CL')}</h4>
            <Link to="/categorias" className="btn btn-outline-secondary mt-2">
              Seguir comprando
            </Link>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card p-4 shadow-sm border-0 rounded-3">
              <h5 className="fw-bold mb-3">Información del cliente</h5>
              <form onSubmit={handlePagar}>
                <div className="mb-2">
                  <label className="form-label small">Nombre*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.nombre}
                    onChange={actualizarCampo('nombre')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Apellidos*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.apellidos}
                    onChange={actualizarCampo('apellidos')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Correo Electrónico*</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={datosCliente.correo}
                    onChange={actualizarCampo('correo')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Calle*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.calle}
                    onChange={actualizarCampo('calle')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Departamento (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={datosCliente.departamento}
                    onChange={actualizarCampo('departamento')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Región*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.region}
                    onChange={actualizarCampo('region')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small">Comuna*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={datosCliente.comuna}
                    onChange={actualizarCampo('comuna')}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small">Indicaciones para la entrega (opcional)</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={datosCliente.indicaciones}
                    onChange={actualizarCampo('indicaciones')}
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
                  Pagar ahora ${total.toLocaleString('es-CL')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <AvisoFlotante
        mensaje={aviso?.mensaje}
        titulo={aviso?.titulo}
        tipo={aviso?.tipo}
        onClose={() => setAviso(null)}
      />
    </div>
  );
};
