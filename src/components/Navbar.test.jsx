import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

const renderNavbar = (props = {}) =>
  render(
    <MemoryRouter>
      <Navbar {...props} />
    </MemoryRouter>
  );

describe('Navbar', () => {
  it('muestra el total y la cantidad de ítems formateados en es-CL', () => {
    renderNavbar({ totalCarrito: 449990, cantidadItems: 3 });

    expect(
      screen.getByRole('link', { name: '🛒 Carrito (3) - $449.990' })
    ).toBeInTheDocument();
  });

  it('usa cero por defecto cuando no recibe props', () => {
    renderNavbar();

    expect(
      screen.getByRole('link', { name: '🛒 Carrito (0) - $0' })
    ).toBeInTheDocument();
  });

  it('enlaza a las secciones principales de la tienda', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Catálogo' })).toHaveAttribute('href', '/categorias');
    expect(screen.getByRole('link', { name: 'Ofertas 🔥' })).toHaveAttribute('href', '/ofertas');
    expect(screen.getByRole('link', { name: '⚙️ Admin' })).toHaveAttribute('href', '/admin');
    expect(screen.getByRole('link', { name: /Carrito/ })).toHaveAttribute('href', '/carrito');
  });

  it('muestra la marca LogiStock', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: /LogiStock/ })).toBeInTheDocument();
  });
});
