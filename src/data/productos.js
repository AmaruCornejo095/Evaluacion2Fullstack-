const PRODUCTOS_KEY = 'tienda_productos';

export const productosIniciales = [
  { id: 1, nombre: 'The Legend of Zelda', precio: 52999, categoria: 'Nintendo', imagen: 'https://via.placeholder.com/400x300' },
  { id: 2, nombre: 'Super Mario Odyssey', precio: 42999, categoria: 'Nintendo', imagen: 'https://via.placeholder.com/400x300' },
  { id: 3, nombre: 'Minecraft', precio: 22695, categoria: 'PC / Consolas', imagen: 'https://via.placeholder.com/400x300' },
  { id: 4, nombre: 'Red Dead Redemption 2', precio: 5999, categoria: 'PlayStation', imagen: 'https://via.placeholder.com/400x300' },
  { id: 5, nombre: 'Mortal Kombat 11', precio: 29999, categoria: 'PlayStation', imagen: 'https://via.placeholder.com/400x300' },
  { id: 6, nombre: 'Cuphead', precio: 15000, categoria: 'PC / Consolas', imagen: 'https://via.placeholder.com/400x300' }
];

export const categoriasList = ['Todas', 'Nintendo', 'PlayStation', 'PC / Consolas'];

export const obtenerProductos = () => {
  const data = localStorage.getItem(PRODUCTOS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(productosIniciales));
    return productosIniciales;
  }
  return JSON.parse(data);
};

export const agregarProducto = (nuevoProducto) => {
  const productos = obtenerProductos();
  const productoConId = { ...nuevoProducto, id: Date.now() };
  const actualizados = [...productos, productoConId];
  localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(actualizados));
  return actualizados;
};