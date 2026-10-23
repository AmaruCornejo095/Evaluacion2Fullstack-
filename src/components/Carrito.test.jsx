import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Carrito } from './Carrito';

const carrito = [
  { id: 1, nombre: 'Notebook HP 15', precio: 399990, cantidad: 2 },
  { id: 2, nombre: 'Arroz 1kg (Pack 10)', precio: 1990, cantidad: 1 }
];

const renderCarrito = (props = {}) => {
  const setCarrito = vi.fn();
  const procesarPago = vi.fn();

  const utils = render(
    <MemoryRouter>
      <Carrito
        carrito={carrito}
        setCarrito={setCarrito}
        procesarPago={procesarPago}
        {...props}
      />
    </MemoryRouter>
  );

  return { ...utils, setCarrito, procesarPago };
};

// Orden de los campos de texto del formulario de cliente.
const CAMPOS = {
  nombre: 0,
  apellidos: 1,
  correo: 2,
  calle: 3,
  departamento: 4,
  region: 5,
  comuna: 6,
  indicaciones: 7
};

describe('Carrito', () => {
  it('muestra el estado vacío y el enlace al catálogo', () => {
    renderCarrito({ carrito: [] });

    expect(screen.getByText('El carrito de compras está vacío.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver productos' })).toHaveAttribute(
      'href',
      '/categorias'
    );
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('lista los productos con subtotales y el total', () => {
    renderCarrito();

    expect(screen.getByRole('cell', { name: 'Notebook HP 15' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '$799.980' })).toBeInTheDocument();
    expect(screen.getByText('Total: $801.970')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pagar ahora $801.970' })).toBeInTheDocument();
  });

  it('elimina un producto del carrito', async () => {
    const user = userEvent.setup();
    const { setCarrito } = renderCarrito();

    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

    expect(setCarrito).toHaveBeenCalledTimes(1);
    expect(setCarrito).toHaveBeenCalledWith([carrito[1]]);
  });

  it('envía los datos del cliente al procesar el pago', async () => {
    const user = userEvent.setup();
    const { procesarPago } = renderCarrito();
    const campos = screen.getAllByRole('textbox');

    await user.type(campos[CAMPOS.nombre], 'Ana');
    await user.type(campos[CAMPOS.apellidos], 'Pérez');
    await user.type(campos[CAMPOS.correo], 'ana@test.cl');
    await user.type(campos[CAMPOS.calle], 'Av. Siempre Viva 742');
    await user.clear(campos[CAMPOS.region]);
    await user.type(campos[CAMPOS.region], 'Metropolitana');
    await user.type(campos[CAMPOS.comuna], 'Santiago');
    await user.click(screen.getByRole('button', { name: /Pagar ahora/ }));

    expect(procesarPago).toHaveBeenCalledTimes(1);
    expect(procesarPago).toHaveBeenCalledWith(
      {
        nombre: 'Ana',
        apellidos: 'Pérez',
        correo: 'ana@test.cl',
        calle: 'Av. Siempre Viva 742',
        departamento: '',
        region: 'Metropolitana',
        comuna: 'Santiago',
        indicaciones: ''
      },
      true
    );
  });

  it('no procesa el pago si el formulario está incompleto', async () => {
    const user = userEvent.setup();
    const { procesarPago } = renderCarrito();

    await user.click(screen.getByRole('button', { name: /Pagar ahora/ }));

    expect(procesarPago).not.toHaveBeenCalled();
  });
});
