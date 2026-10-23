import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PagoResultado } from './PagoResultado';

const datosOrden = {
  ordenId: '654321',
  cliente: {
    nombre: 'Ana',
    apellidos: 'Pérez',
    correo: 'ana@test.cl',
    calle: 'Av. Siempre Viva 742',
    comuna: 'Santiago'
  },
  productos: [
    { id: 1, nombre: 'Notebook HP 15', precio: 399990, cantidad: 1 },
    { id: 2, nombre: 'Arroz 1kg (Pack 10)', precio: 1990, cantidad: 3 }
  ],
  total: 405960
};

const renderResultado = (props = {}) =>
  render(
    <MemoryRouter>
      <PagoResultado exito={false} datosOrden={datosOrden} {...props} />
    </MemoryRouter>
  );

describe('PagoResultado', () => {
  it('muestra el error cuando el pago no se pudo procesar', () => {
    renderResultado();

    expect(
      screen.getByRole('heading', { name: '❌ No se pudo realizar el pago' })
    ).toBeInTheDocument();
    expect(screen.getByText('Nro de Orden Intentado: #654321')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver a Intentar el Pago' })).toHaveAttribute(
      'href',
      '/carrito'
    );
    expect(screen.getByRole('link', { name: 'Ir a Categorías' })).toHaveAttribute(
      'href',
      '/categorias'
    );
  });

  it('muestra el resumen cuando el pago fue exitoso', () => {
    renderResultado({ exito: true });

    expect(
      screen.getByRole('heading', { name: 'Se ha realizado la compra' })
    ).toBeInTheDocument();
    expect(screen.getByText('Código ORDER: #654321')).toBeInTheDocument();
    expect(screen.getByText('Ana Pérez')).toBeInTheDocument();
    expect(screen.getByText('ana@test.cl')).toBeInTheDocument();
    expect(screen.getByText(/Av\. Siempre Viva 742, Santiago/)).toBeInTheDocument();
    expect(screen.getByText('Notebook HP 15 (x1)')).toBeInTheDocument();
    expect(screen.getByText('Arroz 1kg (Pack 10) (x3)')).toBeInTheDocument();
    expect(screen.getByText('Total Pagado: $405.960')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver a la Tienda' })).toHaveAttribute(
      'href',
      '/categorias'
    );
  });

  it('redirige al inicio cuando no existen datos de la orden', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/checkout/resultado']}>
        <PagoResultado exito={false} datosOrden={null} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
