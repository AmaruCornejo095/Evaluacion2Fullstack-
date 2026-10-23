const STORAGE_KEY = 'tienda_productos_v1';

export const productosIniciales = [
  { id: 1, nombre: 'The Legend of Zelda', precio: 52999, categoria: 'Nintendo', oferta: true, precioOferta: 42999, imagen: 'https://via.placeholder.com/400x300' },
  { id: 2, nombre: 'Super Mario Odyssey', precio: 42999, categoria: 'Nintendo', oferta: false, precioOferta: 42999, imagen: 'https://via.placeholder.com/400x300' },
  { id: 3, nombre: 'Minecraft', precio: 22695, categoria: 'PC / Consolas', oferta: true, precioOferta: 18000, imagen: 'https://via.placeholder.com/400x300' },
  { id: 4, nombre: 'Red Dead Redemption 2', precio: 5999, categoria: 'PlayStation', oferta: false, precioOferta: 5999, imagen: 'https://via.placeholder.com/400x300' },
  { id: 5, nombre: 'Mortal Kombat 11', precio: 29999, categoria: 'PlayStation', oferta: true, precioOferta: 19999, imagen: 'https://via.placeholder.com/400x300' },
  { id: 6, nombre: 'Cuphead', precio: 15000, categoria: 'PC / Consolas', oferta: false, precioOferta: 15000, imagen: 'https://via.placeholder.com/400x300' }
];

export const categoriasList = ['Todas', 'Nintendo', 'PlayStation', 'PC / Consolas'];

export const obtenerProductos = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productosIniciales));
    return productosIniciales;
  }
  return JSON.parse(data);
};

export const agregarProducto = (nuevo) => {
  const productos = obtenerProductos();
  const productoConId = { ...nuevo, id: Date.now() };
  const actualizados = [...productos, productoConId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
  return actualizados;
};

export const actualizarProducto = (id, datosActualizados) => {
  const productos = obtenerProductos();
  const actualizados = productos.map(p => p.id === id ? { ...p, ...datosActualizados } : p);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
  return actualizados;
};

export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const actualizados = productos.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
  return actualizados;
};