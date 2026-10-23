import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductoCard } from './ProductoCard';

const productoBase = {
  id: 1,
  nombre: 'Notebook HP 15',
  precio: 450000,
  categoria: 'Electrónica',
  cliente: 'TechStore',
  ubicacion: 'Estante A-3',
  stock: 45,
  enOferta: false,
  imagen: 'https://example.com/notebook.jpg'
};

describe('ProductoCard', () => {
  it('no renderiza nada cuando no recibe producto', () => {
    const { container } = render(<ProductoCard />);

    expect(container).toBeEmptyDOMElement();
  });

  it('muestra los datos del producto y el precio normal', () => {
    render(<ProductoCard producto={productoBase} />);

    expect(screen.getByText('Notebook HP 15')).toBeInTheDocument();
    expect(screen.getByText('TechStore')).toBeInTheDocument();
    expect(screen.getByText(/Estante A-3/)).toBeInTheDocument();
    expect(screen.getByText(/Electrónica/)).toBeInTheDocument();
    expect(screen.getByText('Stock: 45 uds.')).toBeInTheDocument();
    expect(screen.getByText('$450.000')).toHaveClass('text-success');
    expect(screen.getByRole('img', { name: 'Notebook HP 15' })).toHaveAttribute(
      'src',
      productoBase.imagen
    );
  });

  it('muestra el precio de oferta y tacha el precio original', () => {
    render(<ProductoCard producto={{ ...productoBase, enOferta: true, precioOferta: 399990 }} />);

    expect(screen.getByText('$450.000')).toHaveClass('text-decoration-line-through');
    expect(screen.getByText('$399.990')).toHaveClass('text-danger');
  });

  it('destaca el stock bajo con el color de advertencia', () => {
    render(<ProductoCard producto={{ ...productoBase, stock: 5 }} />);

    expect(screen.getByText('Stock: 5 uds.')).toHaveClass('text-warning');
  });

  it('llama a agregarAlCarrito con el producto al presionar Añadir', async () => {
    const user = userEvent.setup();
    const agregarAlCarrito = vi.fn();
    render(<ProductoCard producto={productoBase} agregarAlCarrito={agregarAlCarrito} />);

    await user.click(screen.getByRole('button', { name: 'Añadir' }));

    expect(agregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(agregarAlCarrito).toHaveBeenCalledWith(productoBase);
  });

  it('no falla si no se entrega agregarAlCarrito', async () => {
    const user = userEvent.setup();
    render(<ProductoCard producto={productoBase} />);

    await user.click(screen.getByRole('button', { name: 'Añadir' }));

    expect(screen.getByRole('button', { name: 'Añadir' })).toBeInTheDocument();
  });
});
