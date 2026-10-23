import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmacionFlotante } from './ConfirmacionFlotante';

const renderConfirmacion = (props = {}) => {
  const onConfirmar = vi.fn();
  const onCancelar = vi.fn();

  const utils = render(
    <ConfirmacionFlotante
      mensaje='¿Deseas eliminar "Notebook HP 15" del inventario?'
      titulo="Eliminar producto"
      onConfirmar={onConfirmar}
      onCancelar={onCancelar}
      {...props}
    />
  );

  return { ...utils, onConfirmar, onCancelar };
};

describe('ConfirmacionFlotante', () => {
  it('no renderiza nada cuando no hay mensaje', () => {
    const { container } = render(
      <ConfirmacionFlotante mensaje={null} onConfirmar={vi.fn()} onCancelar={vi.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('muestra el título, el mensaje y los botones de acción', () => {
    renderConfirmacion();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Eliminar producto')).toBeInTheDocument();
    expect(
      screen.getByText('¿Deseas eliminar "Notebook HP 15" del inventario?')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
  });

  it('ejecuta onConfirmar al presionar Confirmar', async () => {
    const user = userEvent.setup();
    const { onConfirmar, onCancelar } = renderConfirmacion();

    await user.click(screen.getByRole('button', { name: 'Confirmar' }));

    expect(onConfirmar).toHaveBeenCalledTimes(1);
    expect(onCancelar).not.toHaveBeenCalled();
  });

  it('ejecuta onCancelar al presionar Cancelar', async () => {
    const user = userEvent.setup();
    const { onConfirmar, onCancelar } = renderConfirmacion();

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(onCancelar).toHaveBeenCalledTimes(1);
    expect(onConfirmar).not.toHaveBeenCalled();
  });

  it('ejecuta onCancelar al cerrar con la ×', async () => {
    const user = userEvent.setup();
    const { onConfirmar, onCancelar } = renderConfirmacion();

    await user.click(screen.getByRole('button', { name: 'Cerrar confirmación' }));

    expect(onCancelar).toHaveBeenCalledTimes(1);
    expect(onConfirmar).not.toHaveBeenCalled();
  });

  it('permite personalizar los textos de los botones', () => {
    renderConfirmacion({ textoConfirmar: 'Eliminar', textoCancelar: 'Volver' });

    expect(screen.getByRole('button', { name: 'Eliminar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Volver' })).toBeInTheDocument();
  });

  it('no se imprime en la boleta PDF', () => {
    renderConfirmacion();

    expect(screen.getByRole('dialog').closest('.position-fixed')).toHaveClass('d-print-none');
  });
});
