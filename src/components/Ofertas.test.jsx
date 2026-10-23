import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Ofertas } from './Ofertas';

const PRODUCTOS_KEY = 'logistock_productos_v3';

describe('Ofertas', () => {
  it('muestra solo los productos en oferta', () => {
    render(<Ofertas agregarAlCarrito={vi.fn()} />);

    expect(screen.getByRole('heading', { name: '🔥 Productos en Oferta' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Añadir' })).toHaveLength(3);
    expect(screen.getByText('Notebook HP 15')).toBeInTheDocument();
    expect(screen.getByText('Zapatillas Nike Air')).toBeInTheDocument();
    expect(screen.getByText('Arroz 1kg (Pack 10)')).toBeInTheDocument();
    expect(screen.queryByText('Monitor Samsung 24"')).not.toBeInTheDocument();
  });

  it('agrega al carrito el producto seleccionado', async () => {
    const user = userEvent.setup();
    const agregarAlCarrito = vi.fn();
    render(<Ofertas agregarAlCarrito={agregarAlCarrito} />);

    await user.click(screen.getAllByRole('button', { name: 'Añadir' })[0]);

    expect(agregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(agregarAlCarrito.mock.calls[0][0]).toMatchObject({
      id: 1,
      nombre: 'Notebook HP 15',
      enOferta: true
    });
  });

  it('muestra un mensaje cuando no hay ofertas activas', () => {
    localStorage.setItem(
      PRODUCTOS_KEY,
      JSON.stringify([
        {
          id: 2,
          nombre: 'Monitor Samsung 24"',
          precio: 180000,
          categoria: 'Electrónica',
          cliente: 'TechStore',
          stock: 30,
          enOferta: false
        }
      ])
    );

    render(<Ofertas agregarAlCarrito={vi.fn()} />);

    expect(screen.getByText('No hay ofertas activas en este momento.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Añadir' })).not.toBeInTheDocument();
  });
});
