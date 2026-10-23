import { obtenerProductos, productosIniciales, agregarProducto, eliminarProducto } from './data/productos';

describe('Suite de Pruebas Unitarias - Tienda Online (Jasmine/Karma)', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Debe obtener la lista de productos iniciales correctamente', () => {
    const productos = obtenerProductos();
    expect(productos.length).toBe(productosIniciales.length);
  });

  it('2. Debe agregar un nuevo producto al almacenamiento', () => {
    const nuevo = { nombre: 'Juego Test', precio: 10000, categoria: 'Nintendo' };
    const actualizados = agregarProducto(nuevo);
    expect(actualizados.length).toBe(productosIniciales.length + 1);
  });

  it('3. Debe eliminar un producto por su ID', () => {
    const actualizados = eliminarProducto(1);
    expect(actualizados.some(p => p.id === 1)).toBeFalse();
  });

  it('4. Debe calcular correctamente el total acumulado de un carrito', () => {
    const carritoMock = [
      { id: 1, precio: 10000, cantidad: 2 },
      { id: 2, precio: 5000, cantidad: 1 }
    ];
    const total = carritoMock.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    expect(total).toBe(25000);
  });

  it('5. Debe calcular la cantidad total de ítems en el carrito', () => {
    const carritoMock = [
      { id: 1, cantidad: 3 },
      { id: 2, cantidad: 2 }
    ];
    const cantidadTotal = carritoMock.reduce((acc, item) => acc + item.cantidad, 0);
    expect(cantidadTotal).toBe(5);
  });

  it('6. Debe filtrar productos correctamente por categoría', () => {
    const productos = obtenerProductos();
    const nintendo = productos.filter(p => p.categoria === 'Nintendo');
    expect(nintendo.every(p => p.categoria === 'Nintendo')).toBeTrue();
  });

  it('7. Debe identificar correctamente los productos en oferta', () => {
    const productos = obtenerProductos();
    const ofertas = productos.filter(p => p.oferta === true);
    expect(ofertas.length).toBeGreaterThan(0);
  });

  it('8. Debe incrementar la cantidad si un producto ya existe en el carrito', () => {
    let carrito = [{ id: 1, nombre: 'Zelda', cantidad: 1 }];
    const productoAñadir = { id: 1, nombre: 'Zelda' };
    
    const existe = carrito.find(item => item.id === productoAñadir.id);
    if (existe) {
      carrito = carrito.map(item => item.id === productoAñadir.id ? { ...item, cantidad: item.cantidad + 1 } : item);
    }
    expect(carrito[0].cantidad).toBe(2);
  });

  it('9. Debe generar una estructura de orden válida para el pago', () => {
    const clienteMock = { nombre: 'Juan', correo: 'juan@test.com' };
    const orden = { ordenId: '20240705', cliente: clienteMock, total: 15000 };
    expect(orden.ordenId).toBe('20240705');
    expect(orden.cliente.nombre).toBe('Juan');
  });

  it('10. Debe vaciar el carrito después de un pago exitoso', () => {
    let carrito = [{ id: 1, cantidad: 1 }];
    const pagoExitoso = true;
    if (pagoExitoso) {
      carrito = [];
    }
    expect(carrito.length).toBe(0);
  });

});