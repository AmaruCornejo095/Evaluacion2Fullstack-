import React from 'react';

export const CompraExitosa = ({ ordenData, setVistaActual }) => {
  if (!ordenData) {
    return (
      <div className="container text-center my-5 py-5">
        <h4>No hay información de orden registrada.</h4>
        <button className="btn btn-primary mt-3" onClick={() => setVistaActual('categorias')}>
          Volver a la Tienda
        </button>
      </div>
    );
  }

  const { cliente, productos, total, ordenId = '20240705' } = ordenData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="card border-0 shadow-lg p-4 rounded-4 bg-white">
            {/* Encabezado con Estado y Código */}
            <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                    ✓
                  </span>
                  <h3 className="fw-bold mb-0 text-dark">
                    Se ha realizado la compra. nro #{ordenId}
                  </h3>
                </div>
                <p className="text-muted mb-0 ms-5">Completa la siguiente información del pedido realizado</p>
              </div>
              <span className="badge bg-light text-secondary border fs-6">
                Código orden: ORDER{ordenId}
              </span>
            </div>

            {/* Datos del Cliente y Dirección */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <label className="form-label text-muted small mb-1">Nombre*</label>
                <input type="text" className="form-control bg-light border-0" value={cliente.nombre || 'Pedro'} readOnly />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label text-muted small mb-1">Apellidos*</label>
                <input type="text" className="form-control bg-light border-0" value={cliente.apellidos || 'Hacker'} readOnly />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label text-muted small mb-1">Correo*</label>
                <input type="email" className="form-control bg-light border-0" value={cliente.correo || 'pedro.hacker20@example.com'} readOnly />
              </div>

              <div className="col-12">
                <h6 className="fw-bold text-dark mt-2 mb-2">Dirección de entrega de los productos</h6>
              </div>

              <div className="col-12 col-md-8">
                <label className="form-label text-muted small mb-1">Calle*</label>
                <input type="text" className="form-control bg-light border-0" value={cliente.calle || 'Los Crisantemos, Edificio Norte'} readOnly />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label text-muted small mb-1">Departamento (opcional)</label>
                <input type="text" className="form-control bg-light border-0" value={cliente.departamento || 'Depto 603'} readOnly />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-muted small mb-1">Región*</label>
                <input type="text" className="form-control bg-light border-0" value={cliente.region || 'Región Metropolitana de Santiago'} readOnly />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-muted small mb-1">Comuna*</label>
                <input type="text" className="form-control bg-light border-0" value={cliente.comuna || 'Cerrillos'} readOnly />
              </div>

              <div className="col-12">
                <label className="form-label text-muted small mb-1">Indicaciones para la entrega (opcional)</label>
                <textarea className="form-control bg-light border-0" rows="2" value={cliente.indicaciones || 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'} readOnly />
              </div>
            </div>

            {/* Tabla Detallada de Productos */}
            <div className="table-responsive mb-4">
              <table className="table align-middle border-top">
                <thead className="table-light">
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th className="text-end">Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {productos && productos.map((item) => (
                    <tr key={item.id}>
                      <td style={{ width: '60px' }}>
                        <img src={item.imagen || 'https://via.placeholder.com/50'} alt={item.nombre} className="rounded" width="45" height="45" />
                      </td>
                      <td className="fw-semibold">{item.nombre}</td>
                      <td className="text-end">${item.precio.toLocaleString('es-CL')}</td>
                      <td className="text-center">{item.cantidad}</td>
                      <td className="text-end fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Destacado */}
            <div className="bg-light p-3 rounded-3 text-center mb-4">
              <h4 className="fw-bold mb-0 text-dark">
                Total pagado: ${total.toLocaleString('es-CL')}
              </h4>
            </div>

            {/* Botones de Acción */}
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-danger fw-semibold px-4" onClick={handlePrint}>
                🖨️ Imprimir boleta en PDF
              </button>
              <button className="btn btn-success fw-semibold px-4" onClick={() => alert(`Boleta enviada al correo ${cliente.correo}`)}>
                ✉️ Enviar boleta por email
              </button>
              <button className="btn btn-dark fw-semibold px-4" onClick={() => setVistaActual('categorias')}>
                Ir a la Tienda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};