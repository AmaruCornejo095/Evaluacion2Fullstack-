// Simulación de almacenamiento en localStorage para LogiStock
const PRODUCTOS_KEY = 'logistock_productos';

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
    imagen: 'https://via.placeholder.com/400x300?text=Notebook+HP'
  },
  {
    id: 2,
    nombre: 'Monitor Samsung 24',
    precio: 180000,
    categoria: 'Electrónica',
    cliente: 'TechStore',
    ubicacion: 'Estante A-4',
    stock: 30,
    enOferta: false,
    imagen: 'https://via.placeholder.com/400x300?text=Monitor+Samsung'
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
    imagen: 'https://via.placeholder.com/400x300?text=Nike+Air'
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
    imagen: 'https://via.placeholder.com/400x300?text=Chaqueta+North+Face'
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
    imagen: 'https://via.placeholder.com/400x300?text=Arroz+1kg'
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
    imagen: 'https://via.placeholder.com/400x300?text=Aceite+1L'
  }
];

export const categoriasList = ['Todas', 'Electrónica', 'Calzado', 'Vestuario', 'Alimentos'];

// Operaciones CRUD
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

export const actualizarProducto = (id, datosActualizados) => {
  const productos = obtenerProductos();
  const actualizados = productos.map(p => p.id === id ? { ...p, ...datosActualizados } : p);
  localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(actualizados));
  return actualizados;
};

export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const actualizados = productos.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(actualizados));
  return actualizados;
};