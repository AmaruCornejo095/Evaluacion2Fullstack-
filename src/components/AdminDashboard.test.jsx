import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';

const LocationProbe = () => {
  const location = useLocation();
  return <div data-testid="ubicacion">{`${location.pathname}${location.search}`}</div>;
};

const renderAdmin = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <AdminDashboard />
      <LocationProbe />
    </MemoryRouter>
  );

describe('AdminDashboard', () => {
  it('muestra el resumen del dashboard con los productos del inventario', () => {
    renderAdmin();

    expect(screen.getByRole('heading', { level: 2, name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('Productos registrados')).toBeInTheDocument();
    expect(screen.getByText('Unidades en stock')).toBeInTheDocument();
    expect(screen.getByText('1.125')).toBeInTheDocument();
  });

  it('navega entre las secciones del panel', async () => {
    const user = userEvent.setup();
    renderAdmin();

    await user.click(screen.getByRole('button', { name: 'Productos' }));
    expect(screen.getByRole('heading', { name: 'Inventario de Productos' })).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Notebook HP 15' })).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Usuarios' }));
    expect(screen.getByRole('heading', { name: 'Lista de Usuarios' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Categorías' }));
    expect(screen.getByRole('heading', { name: 'Categorías Registradas' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reportes' }));
    expect(screen.getByRole('heading', { name: 'Reportes de Sistema' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Perfil' }));
    expect(screen.getByRole('heading', { name: 'Perfil Administrador' })).toBeInTheDocument();
  });

  it('pide confirmación flotante antes de eliminar y permite cancelar', async () => {
    const user = userEvent.setup();
    renderAdmin();

    await user.click(screen.getByRole('button', { name: 'Productos' }));
    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText('¿Deseas eliminar "Notebook HP 15" del inventario?')
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Notebook HP 15' })).toHaveLength(1);
  });

  it('elimina el producto al confirmar y muestra la card de éxito', async () => {
    const user = userEvent.setup();
    renderAdmin();

    await user.click(screen.getByRole('button', { name: 'Productos' }));
    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Eliminar' })
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: 'Notebook HP 15' })).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Producto eliminado');
    expect(screen.getByRole('status')).toHaveTextContent(
      'Notebook HP 15 se quitó del inventario.'
    );
  });

  it('navega a la tienda desde el menú lateral', async () => {
    const user = userEvent.setup();
    renderAdmin();

    await user.click(screen.getByRole('button', { name: '🏬 Tienda' }));

    expect(screen.getByTestId('ubicacion')).toHaveTextContent('/categorias');
  });

  it('cierra la sesión volviendo al inicio', async () => {
    const user = userEvent.setup();
    renderAdmin();

    await user.click(screen.getByRole('button', { name: 'Cerrar Sesión' }));

    expect(screen.getByTestId('ubicacion')).toHaveTextContent('/');
  });
});
