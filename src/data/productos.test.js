import { describe, it, expect, beforeEach } from 'vitest';
import {
  productosIniciales,
  categoriasList,
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} from './productos';

const PRODUCTOS_KEY = 'logistock_productos_v3';

describe('data/productos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('siembra los productos iniciales cuando no hay datos guardados', () => {
    const productos = obtenerProductos();

    expect(productos).toHaveLength(productosIniciales.length);
    expect(JSON.parse(localStorage.getItem(PRODUCTOS_KEY))).toHaveLength(productosIniciales.length);
  });

  it('devuelve los datos persistidos sin volver a sembrar', () => {
    const personalizados = [
      { id: 99, nombre: 'Producto de prueba', precio: 1000, categoria: 'Calzado' }
    ];
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(personalizados));

    expect(obtenerProductos()).toEqual(personalizados);
    expect(obtenerProductos()).toHaveLength(1);
  });

  it('agregarProducto asigna un id y persiste el listado', () => {
    obtenerProductos();

    const actualizados = agregarProducto({
      nombre: 'Producto nuevo',
      precio: 500,
      categoria: 'Alimentos'
    });
    const nuevo = actualizados.at(-1);

    expect(actualizados).toHaveLength(productosIniciales.length + 1);
    expect(nuevo.nombre).toBe('Producto nuevo');
    expect(nuevo.id).toBeTypeOf('number');
    expect(JSON.parse(localStorage.getItem(PRODUCTOS_KEY)).at(-1)).toEqual(nuevo);
  });

  it('actualizarProducto modifica solo el producto indicado', () => {
    obtenerProductos();

    const actualizados = actualizarProducto(2, { stock: 999, ubicacion: 'Pallet 9' });
    const actualizado = actualizados.find(p => p.id === 2);
    const intacto = actualizados.find(p => p.id === 1);

    expect(actualizado.stock).toBe(999);
    expect(actualizado.ubicacion).toBe('Pallet 9');
    expect(actualizado.nombre).toBe('Monitor Samsung 24"');
    expect(intacto).toEqual(productosIniciales[0]);
    expect(JSON.parse(localStorage.getItem(PRODUCTOS_KEY)).find(p => p.id === 2).stock).toBe(999);
  });

  it('eliminarProducto quita el producto por id', () => {
    obtenerProductos();

    const actualizados = eliminarProducto(1);

    expect(actualizados).toHaveLength(productosIniciales.length - 1);
    expect(actualizados.find(p => p.id === 1)).toBeUndefined();
    expect(JSON.parse(localStorage.getItem(PRODUCTOS_KEY)).find(p => p.id === 1)).toBeUndefined();
  });

  it('expone las categorías disponibles del catálogo', () => {
    expect(categoriasList).toEqual(['Todas', 'Electrónica', 'Calzado', 'Vestuario', 'Alimentos']);
  });
});
