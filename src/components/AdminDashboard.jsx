import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos, eliminarProducto, categoriasList } from '../data/productos';

export const AdminDashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState('dashboard');
  const [productos, setProductos] = useState(() => obtenerProductos());
  const navigate = useNavigate();

  const handleEliminarProducto = (id) => {
    if (window.confirm('¿Deseas eliminar este producto del inventario?')) {
      const actualizados = eliminarProducto(id);
      setProductos(actualizados);
    }
  };

  const totalUnidades = productos.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalClientes = new Set(productos.map(p => p.cliente).filter(Boolean)).size;

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icono: '⏱️' },
    { key: 'ordenes', label: 'Movimientos', icono: '🔄' },
    { key: 'productos', label: 'Productos', icono: '📦' },
    { key: 'categorias', label: 'Categorías', icono: '🏷️' },
    { key: 'usuarios', label: 'Usuarios', icono: '👥' },
    { key: 'reportes', label: 'Reportes', icono: '📊' },
    { key: 'perfil', label: 'Perfil', icono: '👤' },
  ];

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar Nav Funcional */}
        <div className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-bold mb-0 text-light">LogiStock</h5>
            <p className="text-white-50 small mb-4">Gestión de inventario</p>
            <ul className="nav nav-pills flex-column mb-auto gap-1">
              {menuItems.map((item) => (
                <li key={item.key} className="nav-item">
                  <button
                    className={`nav-link w-100 text-start border-0 ${
                      seccionActiva === item.key
                        ? 'active bg-primary text-white'
                        : 'text-white-50 bg-transparent'
                    }`}
                    onClick={() => setSeccionActiva(item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-secondary" onClick={() => navigate('/categorias')}>
              🏬 Tienda
            </button>
            <button className="btn btn-danger" onClick={() => navigate('/')}>
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Vista Principal según la sección activa */}
        <div className="col-12 col-md-9 col-lg-10 p-4 bg-light">
          {seccionActiva === 'dashboard' && (
            <>
              <div className="mb-4">
                <h2 className="fw-bold">Dashboard</h2>
                <p className="text-muted mb-0">
                  Resumen del inventario y la operación de la bodega de San Bernardo
                </p>
              </div>

              {/* Tarjetas de Métricas */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card bg-primary text-white p-3 shadow-sm rounded-3 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-white-50 mb-1">Productos registrados</h6>
                        <h2 className="fw-bold mb-0">{productos.length}</h2>
                      </div>
                      <span className="fs-1">📦</span>
                    </div>
                    <small className="mt-2 d-block text-white-50">Catálogo activo en el sistema</small>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card bg-success text-white p-3 shadow-sm rounded-3 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-white-50 mb-1">Unidades en stock</h6>
                        <h2 className="fw-bold mb-0">{totalUnidades.toLocaleString('es-CL')}</h2>
                      </div>
                      <span className="fs-1">🏬</span>
                    </div>
                    <small className="mt-2 d-block text-white-50">Más de 50.000 en rotación mensual</small>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card bg-warning text-dark p-3 shadow-sm rounded-3 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-dark-50 mb-1">Clientes comerciales</h6>
                        <h2 className="fw-bold mb-0">{totalClientes}</h2>
                      </div>
                      <span className="fs-1">🤝</span>
                    </div>
                    <small className="mt-2 d-block text-dark-50">Retail y tecnología</small>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card bg-danger text-white p-3 shadow-sm rounded-3 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-white-50 mb-1">Ocupación de bodega</h6>
                        <h2 className="fw-bold mb-0">95%</h2>
                      </div>
                      <span className="fs-1">📐</span>
                    </div>
                    <small className="mt-2 d-block text-white-50">Revisar planificación de capacidad</small>
                  </div>
                </div>
              </div>

              {/* Grid de Módulos Accesibles */}
              <div className="row g-3">
                {menuItems.concat([{ key: 'tienda', label: 'Tienda', icono: '🏪' }]).map((mod) => (
                  <div key={mod.key} className="col-12 col-sm-6 col-md-3">
                    <div
                      className="card h-100 text-center p-3 shadow-sm border-0"
                      style={{ cursor: 'pointer' }}
                      onClick={() => mod.key === 'tienda' ? navigate('/categorias') : setSeccionActiva(mod.key)}
                    >
                      <div className="fs-2 mb-2">{mod.icono}</div>
                      <h6 className="fw-bold">{mod.label}</h6>
                      <p className="text-muted small mb-0">Gestionar módulo de {mod.label.toLowerCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {seccionActiva === 'ordenes' && (
            <div>
              <h3 className="fw-bold mb-1">Movimientos de Inventario</h3>
              <p className="text-muted mb-4">Ingresos, egresos, ajustes y traslados registrados en la bodega.</p>
              <div className="table-responsive">
                <table className="table align-middle bg-white shadow-sm rounded-3 overflow-hidden">
                  <thead className="table-dark">
                    <tr>
                      <th>N° Movimiento</th>
                      <th>Tipo</th>
                      <th>Cliente</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Responsable</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1042</td>
                      <td><span className="badge bg-primary">ING</span></td>
                      <td>TechStore</td>
                      <td>Notebook HP 15</td>
                      <td>+45</td>
                      <td>Bodeguero</td>
                      <td><span className="badge bg-warning text-dark">En Recepción</span></td>
                    </tr>
                    <tr>
                      <td>#1041</td>
                      <td><span className="badge bg-success">EGR</span></td>
                      <td>ModaHoy</td>
                      <td>Zapatillas Nike Air</td>
                      <td>-20</td>
                      <td>Bodeguero</td>
                      <td><span className="badge bg-success">Ingresado</span></td>
                    </tr>
                    <tr>
                      <td>#1040</td>
                      <td><span className="badge bg-warning text-dark">AJU</span></td>
                      <td>Alimentos Sanos</td>
                      <td>Arroz 1kg (Pack 10)</td>
                      <td>-5</td>
                      <td>Coordinador de Inventario</td>
                      <td><span className="badge bg-danger">Con Discrepancia</span></td>
                    </tr>
                    <tr>
                      <td>#1039</td>
                      <td><span className="badge bg-info text-dark">TRAS</span></td>
                      <td>TechStore</td>
                      <td>Monitor Samsung 24</td>
                      <td>10</td>
                      <td>Bodeguero</td>
                      <td><span className="badge bg-success">Completado</span></td>
                    </tr>
                    <tr>
                      <td>#1038</td>
                      <td><span className="badge bg-primary">ING</span></td>
                      <td>Alimentos Sanos</td>
                      <td>Aceite 1L (Pack 6)</td>
                      <td>+350</td>
                      <td>Bodeguero</td>
                      <td><span className="badge bg-secondary">Programado</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {seccionActiva === 'productos' && (
            <div>
              <h3 className="fw-bold mb-4">Inventario de Productos</h3>
              <div className="table-responsive">
                <table className="table align-middle bg-white shadow-sm rounded-3 overflow-hidden">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Cliente</th>
                      <th>Categoría</th>
                      <th>Ubicación</th>
                      <th>Stock</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((prod) => (
                      <tr key={prod.id}>
                        <td>{prod.id}</td>
                        <td>{prod.nombre}</td>
                        <td>{prod.cliente}</td>
                        <td>{prod.categoria}</td>
                        <td>{prod.ubicacion}</td>
                        <td>{prod.stock}</td>
                        <td>${prod.precio.toLocaleString('es-CL')}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleEliminarProducto(prod.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {seccionActiva === 'categorias' && (
            <div>
              <h3 className="fw-bold mb-4">Categorías Registradas</h3>
              <ul className="list-group shadow-sm">
                {categoriasList.filter(cat => cat !== 'Todas').map((cat) => {
                  const cantidad = productos.filter(p => p.categoria === cat).length;
                  return (
                    <li
                      key={cat}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {cat}
                      <span className="badge bg-primary rounded-pill">
                        {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {seccionActiva === 'usuarios' && (
            <div>
              <h3 className="fw-bold mb-4">Lista de Usuarios</h3>
              <div className="table-responsive">
                <table className="table bg-white shadow-sm rounded-3">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Administrador LogiStock</td>
                      <td>admin@logistock.cl</td>
                      <td><span className="badge bg-danger">Administrador</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jefe de Bodega</td>
                      <td>jefe.bodega@logistock.cl</td>
                      <td><span className="badge bg-primary">Jefe de Bodega</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Coordinador de Inventario</td>
                      <td>coordinador@logistock.cl</td>
                      <td><span className="badge bg-info text-dark">Coordinador</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Bodeguero</td>
                      <td>bodeguero@logistock.cl</td>
                      <td><span className="badge bg-secondary">Bodeguero</span></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Pedro Hacker</td>
                      <td>pedro.hacker20@example.com</td>
                      <td><span className="badge bg-warning text-dark">Cliente · TechStore</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert alert-warning shadow-sm mt-3 mb-0 small">
                <strong>🔐 Alerta de privacidad:</strong> Pedro Hacker intentó revisar el stock de
                ModaHoy. El sistema bloqueó el acceso: cada cliente solo ve la información de sus
                propios productos.
              </div>
            </div>
          )}

          {seccionActiva === 'reportes' && (
            <div>
              <h3 className="fw-bold mb-1">Reportes de Sistema</h3>
              <p className="text-muted mb-4">
                Indicadores de rotación, productos de lento movimiento y proyección de espacio de
                la bodega de San Bernardo.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 h-100">
                    <h6 className="text-muted mb-1">Rotación mensual</h6>
                    <h4 className="fw-bold mb-0">50.000 u</h4>
                    <small className="text-success">+40% en los últimos 2 años</small>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 h-100">
                    <h6 className="text-muted mb-1">Lento movimiento</h6>
                    <h4 className="fw-bold mb-0">12</h4>
                    <small className="text-muted">Productos sin salida en 90 días</small>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 h-100">
                    <h6 className="text-muted mb-1">Ocupación de bodega</h6>
                    <h4 className="fw-bold mb-2">95%</h4>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-danger" style={{ width: '95%' }} />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 h-100">
                    <h6 className="text-muted mb-1">Pérdidas último año</h6>
                    <h4 className="fw-bold mb-0">$15.000.000</h4>
                    <small className="text-danger">Por errores de ubicación</small>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">📉 Productos de lento movimiento</h5>
                  <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Producto</th>
                          <th>Cliente</th>
                          <th>Ubicación</th>
                          <th>Stock</th>
                          <th>Días sin salida</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Chaqueta North Face</td>
                          <td>ModaHoy</td>
                          <td>Estante B-2</td>
                          <td>80</td>
                          <td>112</td>
                        </tr>
                        <tr>
                          <td>Monitor Samsung 24</td>
                          <td>TechStore</td>
                          <td>Estante A-4</td>
                          <td>30</td>
                          <td>98</td>
                        </tr>
                        <tr>
                          <td>Aceite 1L (Pack 6)</td>
                          <td>Alimentos Sanos</td>
                          <td>Pallet 6</td>
                          <td>350</td>
                          <td>91</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="alert alert-info shadow-sm mb-0">
                <h5 className="fw-bold">📊 Proyección de capacidad</h5>
                <p className="mb-0">
                  Al ritmo actual de ingresos, la bodega alcanzará el 100% de ocupación en 6 semanas.
                  Se recomienda liberar los productos de lento movimiento y reorganizar los pallets 5 al 8.
                </p>
              </div>
            </div>
          )}

          {seccionActiva === 'perfil' && (
            <div className="card p-4 shadow-sm border-0" style={{ maxWidth: '400px' }}>
              <h3 className="fw-bold mb-3">Perfil Administrador</h3>
              <div className="mb-3">
                <label className="form-label text-muted small">Nombre de Usuario</label>
                <input type="text" className="form-control" value="Administrador LogiStock" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted small">Correo Electrónico</label>
                <input type="email" className="form-control" value="admin@logistock.cl" readOnly />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
