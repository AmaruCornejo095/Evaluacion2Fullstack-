import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CompraExitosa } from './CompraExitosa';

const ordenData = {
  ordenId: '123456',
  cliente: {
    nombre: 'Ana',
    apellidos: 'Pérez',
    correo: 'ana@test.cl',
    calle: 'Av. Siempre Viva 742',
    departamento: '2B',
    region: 'Metropolitana',
    comuna: 'Santiago',
    indicaciones: 'Dejar en conserjería'
  },
  productos: [
    {
      id: 1,
      nombre: 'Notebook HP 15',
      precio: 399990,
      cantidad: 2,
      imagen: 'https://example.com/notebook.jpg'
    }
  ],
  total: 799980
};

const renderCompra = (props = {}) =>
  render(
    <MemoryRouter>
      <CompraExitosa ordenData={ordenData} {...props} />
    </MemoryRouter>
  );

describe('CompraExitosa', () => {
  it('muestra el resumen de la compra y los datos del cliente', () => {
    renderCompra();

    expect(
      screen.getByRole('heading', { name: /Se ha realizado la compra. nro #123456/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Código orden: ORDER123456')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ana@test.cl')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Av. Siempre Viva 742')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dejar en conserjería')).toBeInTheDocument();
  });

  it('detalla los productos y el total pagado', () => {
    renderCompra();

    const fila = screen.getAllByRole('row')[1];
    expect(within(fila).getByText('Notebook HP 15')).toBeInTheDocument();
    expect(within(fila).getByText('$399.990')).toBeInTheDocument();
    expect(within(fila).getByText('$799.980')).toBeInTheDocument();
    expect(screen.getByText('Total pagado: $799.980')).toBeInTheDocument();
  });

  it('muestra una card flotante al enviar la boleta por email', async () => {
    const user = userEvent.setup();
    renderCompra();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '✉️ Enviar boleta por email' }));

    const aviso = screen.getByRole('status');
    expect(aviso).toHaveTextContent('Boleta enviada');
    expect(aviso).toHaveTextContent('Se envió la boleta al correo ana@test.cl');
    expect(aviso).toHaveClass('d-print-none');
  });

  it('permite cerrar la card de la boleta', async () => {
    const user = userEvent.setup();
    renderCompra();

    await user.click(screen.getByRole('button', { name: '✉️ Enviar boleta por email' }));
    await user.click(screen.getByRole('button', { name: 'Cerrar aviso' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('imprime la boleta en PDF con window.print', async () => {
    const user = userEvent.setup();
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    renderCompra();

    await user.click(screen.getByRole('button', { name: '🖨️ Imprimir boleta en PDF' }));

    expect(printSpy).toHaveBeenCalledTimes(1);
  });

  it('redirige al inicio cuando no existen datos de la orden', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/checkout/resultado']}>
        <CompraExitosa ordenData={null} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('enlaza de vuelta a la tienda', () => {
    renderCompra();

    expect(screen.getByRole('link', { name: 'Ir a la Tienda' })).toHaveAttribute(
      'href',
      '/categorias'
    );
  });
});
