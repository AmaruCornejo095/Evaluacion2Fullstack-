const PRODUCTOS_KEY = 'logistock_productos_v3';

export const productosIniciales = [
  {
    id: 1,
    nombre: 'Notebook HP 15',
    precio: 450000,
    categoria: 'Electrónica',
    cliente: 'TechStore',
    ubicacion: 'Estante A-3',
    stock: 45,
    enOferta: true,
    precioOferta: 399990,
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    nombre: 'Monitor Samsung 24"',
    precio: 180000,
    categoria: 'Electrónica',
    cliente: 'TechStore',
    ubicacion: 'Estante A-4',
    stock: 30,
    enOferta: false,
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    nombre: 'Zapatillas Nike Air',
    precio: 65000,
    categoria: 'Calzado',
    cliente: 'ModaHoy',
    ubicacion: 'Estante B-1',
    stock: 120,
    enOferta: true,
    precioOferta: 54990,
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    nombre: 'Chaqueta North Face',
    precio: 120000,
    categoria: 'Vestuario',
    cliente: 'ModaHoy',
    ubicacion: 'Estante B-2',
    stock: 80,
    enOferta: false,
    imagen: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    nombre: 'Arroz 1kg (Pack 10)',
    precio: 2500,
    categoria: 'Alimentos',
    cliente: 'Alimentos Sanos',
    ubicacion: 'Pallet 5',
    stock: 500,
    enOferta: true,
    precioOferta: 1990,
    imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    nombre: 'Aceite 1L (Pack 6)',
    precio: 3200,
    categoria: 'Alimentos',
    cliente: 'Alimentos Sanos',
    ubicacion: 'Pallet 6',
    stock: 350,
    enOferta: false,
    imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
  }
];

export const categoriasList = ['Todas', 'Electrónica', 'Calzado', 'Vestuario', 'Alimentos'];

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

export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const actualizados = productos.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(actualizados));
  return actualizados;
};