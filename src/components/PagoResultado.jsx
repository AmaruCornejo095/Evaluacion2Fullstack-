import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export const PagoResultado = ({ exito, datosOrden }) => {
  if (!datosOrden) return <Navigate to="/" replace />;

  const { ordenId, cliente, productos, total } = datosOrden;

  return (
    <div className="container my-4">
      {exito ? (
        <div className="card border-success p-4 shadow-sm">
          <div className="text-center mb-3">
            <h3 className="text-success">Se ha realizado la compra</h3>
            <h5>Código ORDER: #{ordenId}</h5>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6>Información del Cliente</h6>
              <p className="mb-1"><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}</p>
              <p className="mb-1"><strong>Correo:</strong> {cliente.correo}</p>
              <p className="mb-1"><strong>Dirección:</strong> {cliente.calle}, {cliente.comuna}</p>
            </div>
            <div className="col-md-6">
              <h6>Resumen de Productos</h6>
              <ul className="list-group mb-3">
                {productos.map((p, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between">
                    <span>{p.nombre} (x{p.cantidad})</span>
                    <span>${(p.precio * p.cantidad).toLocaleString('es-CL')}</span>
                  </li>
                ))}
              </ul>
              <h5 className="text-end">Total Pagado: ${total.toLocaleString('es-CL')}</h5>
            </div>
          </div>
          <Link to="/categorias" className="btn btn-primary mt-3 w-100">
            Volver a la Tienda
          </Link>
        </div>
      ) : (
        <div className="card border-danger p-4 shadow-sm text-center">
          <h3 className="text-danger">❌ No se pudo realizar el pago</h3>
          <p>Nro de Orden Intentado: #{ordenId}</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link to="/carrito" className="btn btn-warning">
              Volver a Intentar el Pago
            </Link>
            <Link to="/categorias" className="btn btn-secondary">
              Ir a Categorías
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
