import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = (ruta = '/') =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>
  );

describe('App', () => {
  it('renderiza la home con el navbar y el footer', () => {
    renderApp();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Retail y Tecnología' })).toBeInTheDocument();
    expect(screen.getByText(/LogiStock · Retail y tecnología con inventario/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '🛒 Carrito (0) - $0' })).toBeInTheDocument();
  });

  it('agrega un producto al carrito y lo muestra en la vista del carrito', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getAllByRole('button', { name: 'Añadir' })[0]);

    const enlaceCarrito = screen.getByRole('link', { name: '🛒 Carrito (1) - $399.990' });
    expect(enlaceCarrito).toBeInTheDocument();

    await user.click(enlaceCarrito);

    expect(screen.getByRole('heading', { name: 'Carrito de Compras' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Notebook HP 15' })).toBeInTheDocument();
    expect(screen.getByText('Total: $399.990')).toBeInTheDocument();
  });

  it('acumula la cantidad al agregar el mismo producto dos veces', async () => {
    const user = userEvent.setup();
    renderApp();

    const botones = screen.getAllByRole('button', { name: 'Añadir' });
    await user.click(botones[0]);
    await user.click(botones[0]);

    expect(screen.getByRole('link', { name: '🛒 Carrito (2) - $799.980' })).toBeInTheDocument();
  });

  it('oculta el navbar y el footer en el panel de administración', () => {
    renderApp('/admin');

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByText(/LogiStock · Retail y tecnología con inventario/)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Dashboard' })).toBeInTheDocument();
  });

  it('completa el flujo de compra desde el carrito hasta la boleta', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getAllByRole('button', { name: 'Añadir' })[0]);
    await user.click(screen.getByRole('link', { name: '🛒 Carrito (1) - $399.990' }));

    const campos = screen.getAllByRole('textbox');
    await user.type(campos[0], 'Ana');
    await user.type(campos[1], 'Pérez');
    await user.type(campos[2], 'ana@test.cl');
    await user.type(campos[3], 'Av. Siempre Viva 742');
    await user.type(campos[6], 'Santiago');
    await user.click(screen.getByRole('button', { name: 'Pagar ahora $399.990' }));

    expect(
      screen.getByRole('heading', { name: /Se ha realizado la compra\. nro #\d+/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Total pagado: $399.990')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ana@test.cl')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '🛒 Carrito (0) - $0' })).toBeInTheDocument();
  });

  it('muestra la página 404 para rutas desconocidas', () => {
    renderApp('/ruta-que-no-existe');

    expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver al Inicio' })).toHaveAttribute('href', '/');
  });
});
