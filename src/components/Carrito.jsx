import React, { useState } from 'react';

export const Carrito = ({ carrito, setCarrito, finalizarCompra }) => {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleEliminar = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return alert('El carrito está vacío.');
    
    // Generar orden y llamar a la función de finalización sin usar alert() emergente
    const nuevaOrden = {
      ordenId: Math.floor(100000 + Math.random() * 900000).toString(),
      cliente,
      productos: [...carrito],
      total
    };
    
    finalizarCompra(nuevaOrden);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold">Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <div className="alert alert-info">El carrito de compras está vacío.</div>
      ) : (
        <div className="row g-4">
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
            <h4 className="fw-bold mt-3">Total: ${total.toLocaleString('es-CL')}</h4>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card p-4 shadow-sm border-0 rounded-3">
              <h5 className="fw-bold mb-3">Información del cliente</h5>
              <form onSubmit={handlePagar}>
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