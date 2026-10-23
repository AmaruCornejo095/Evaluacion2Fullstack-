import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Categorias } from './Categorias';

const LocationProbe = () => {
  const location = useLocation();
  return <div data-testid="ubicacion">{`${location.pathname}${location.search}`}</div>;
};

const renderCategorias = (ruta = '/categorias', props = {}) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Categorias agregarAlCarrito={vi.fn()} {...props} />
      <LocationProbe />
    </MemoryRouter>
  );

describe('Categorias', () => {
  it('muestra todos los productos sin filtro', () => {
    renderCategorias();

    expect(screen.getByRole('heading', { level: 3, name: 'Todas' })).toBeInTheDocument();
    expect(screen.getByText('6 productos')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Añadir' })).toHaveLength(6);
  });

  it('filtra los productos según el parámetro cat de la URL', () => {
    renderCategorias('/categorias?cat=Calzado');

    expect(screen.getByRole('heading', { level: 3, name: 'Calzado' })).toBeInTheDocument();
    expect(screen.getByText('1 producto')).toBeInTheDocument();
    expect(screen.getByText('Zapatillas Nike Air')).toBeInTheDocument();
    expect(screen.queryByText('Notebook HP 15')).not.toBeInTheDocument();
  });

  it('vuelve a Todas cuando la categoría de la URL no existe', () => {
    renderCategorias('/categorias?cat=Inexistente');

    expect(screen.getByRole('heading', { level: 3, name: 'Todas' })).toBeInTheDocument();
    expect(screen.getByText('6 productos')).toBeInTheDocument();
  });

  it('actualiza la URL al seleccionar una categoría', async () => {
    const user = userEvent.setup();
    renderCategorias();

    await user.click(screen.getByRole('button', { name: 'Alimentos' }));

    expect(screen.getByTestId('ubicacion')).toHaveTextContent('/categorias?cat=Alimentos');
    expect(screen.getByRole('heading', { level: 3, name: 'Alimentos' })).toBeInTheDocument();
    expect(screen.getByText('2 productos')).toBeInTheDocument();
  });

  it('limpia el parámetro al volver a Todas', async () => {
    const user = userEvent.setup();
    renderCategorias('/categorias?cat=Vestuario');

    await user.click(screen.getByRole('button', { name: 'Todas' }));

    expect(screen.getByTestId('ubicacion')).toHaveTextContent('/categorias');
    expect(screen.getByRole('heading', { level: 3, name: 'Todas' })).toBeInTheDocument();
  });

  it('muestra un mensaje cuando una categoría no tiene productos', () => {
    localStorage.setItem(
      'logistock_productos_v3',
      JSON.stringify([
        {
          id: 1,
          nombre: 'Solo alimentos',
          precio: 1000,
          categoria: 'Alimentos',
          cliente: 'Alimentos Sanos',
          stock: 1,
          ubicacion: 'Pallet 1'
        }
      ])
    );

    renderCategorias('/categorias?cat=Calzado');

    expect(
      screen.getByText('No hay productos disponibles en esta categoría.')
    ).toBeInTheDocument();
    expect(screen.getByText('0 productos')).toBeInTheDocument();
  });
});
