import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos, eliminarProducto } from '../data/productos';

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

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icono: '⏱️' },
    { key: 'ordenes', label: 'Órdenes', icono: '🛒' },
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
            <h5 className="fw-bold mb-4 text-light">Company name</h5>
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
                <p className="text-muted mb-0">Resumen de las actividades diarias</p>
              </div>

              {/* Tarjetas de Métricas */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                  <div className="card bg-primary text-white p-3 shadow-sm rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-white-50 mb-1">Compras</h6>
                        <h2 className="fw-bold mb-0">1,234</h2>
                      </div>
                      <span className="fs-1">🛒</span>
                    </div>
                    <small className="mt-2 d-block text-white-50">Probabilidad de aumento: 20%</small>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card bg-success text-white p-3 shadow-sm rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-white-50 mb-1">Productos Registrados</h6>
                        <h2 className="fw-bold mb-0">{productos.length}</h2>
                      </div>
                      <span className="fs-1">📦</span>
                    </div>
                    <small className="mt-2 d-block text-white-50">Inventario activo en localStorage</small>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card bg-warning text-dark p-3 shadow-sm rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-dark-50 mb-1">Usuarios</h6>
                        <h2 className="fw-bold mb-0">890</h2>
                      </div>
                      <span className="fs-1">👥</span>
                    </div>
                    <small className="mt-2 d-block text-dark-50">Nuevos usuarios este mes: 120</small>
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
              <h3 className="fw-bold mb-4">Órdenes de Compra</h3>
              <table className="table bg-white shadow-sm rounded-3 overflow-hidden">
                <thead className="table-dark">
                  <tr>
                    <th>N° Orden</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#20240705</td>
                    <td>Pedro Hacker</td>
                    <td>2024-07-05</td>
                    <td>$28.775</td>
                    <td><span className="badge bg-success">Completado</span></td>
                  </tr>
                  <tr>
                    <td>#628460</td>
                    <td>Juan Pérez</td>
                    <td>2024-07-04</td>
                    <td>$52.999</td>
                    <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {seccionActiva === 'productos' && (
            <div>
              <h3 className="fw-bold mb-4">Inventario de Productos</h3>
              <table className="table align-middle bg-white shadow-sm rounded-3 overflow-hidden">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.nombre}</td>
                      <td>{prod.categoria}</td>
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
          )}

          {seccionActiva === 'categorias' && (
            <div>
              <h3 className="fw-bold mb-4">Categorías Registradas</h3>
              <ul className="list-group shadow-sm">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Nintendo <span className="badge bg-primary rounded-pill">Activa</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  PlayStation <span className="badge bg-primary rounded-pill">Activa</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  PC / Consolas <span className="badge bg-primary rounded-pill">Activa</span>
                </li>
              </ul>
            </div>
          )}

          {seccionActiva === 'usuarios' && (
            <div>
              <h3 className="fw-bold mb-4">Lista de Usuarios</h3>
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
                    <td>Admin General</td>
                    <td>admin@tienda.com</td>
                    <td><span className="badge bg-danger">Administrador</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Pedro Hacker</td>
                    <td>pedro.hacker20@example.com</td>
                    <td><span className="badge bg-secondary">Cliente</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {seccionActiva === 'reportes' && (
            <div>
              <h3 className="fw-bold mb-4">Reportes de Sistema</h3>
              <div className="alert alert-info shadow-sm">
                <h5 className="fw-bold">📊 Informe Resumido</h5>
                <p className="mb-0">El total acumulado de ventas registradas en la plataforma supera el presupuesto estimado.</p>
              </div>
            </div>
          )}

          {seccionActiva === 'perfil' && (
            <div className="card p-4 shadow-sm border-0" style={{ maxWidth: '400px' }}>
              <h3 className="fw-bold mb-3">Perfil Administrador</h3>
              <div className="mb-3">
                <label className="form-label text-muted small">Nombre de Usuario</label>
                <input type="text" className="form-control" value="Admin System" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted small">Correo Electrónico</label>
                <input type="email" className="form-control" value="admin@tienda.com" readOnly />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};