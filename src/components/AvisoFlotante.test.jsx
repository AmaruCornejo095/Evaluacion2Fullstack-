import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AvisoFlotante } from './AvisoFlotante';

describe('AvisoFlotante', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('no renderiza nada cuando no hay mensaje', () => {
    const { container } = render(<AvisoFlotante />);

    expect(container).toBeEmptyDOMElement();
  });

  it('muestra título, mensaje e icono según el tipo', () => {
    render(
      <AvisoFlotante tipo="success" titulo="Boleta enviada" mensaje="Se envió la boleta al correo" />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Boleta enviada')).toBeInTheDocument();
    expect(screen.getByText('Se envió la boleta al correo')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
  });

  it('usa el icono de advertencia para el tipo warning', () => {
    render(<AvisoFlotante tipo="warning" mensaje="El carrito está vacío" />);

    expect(screen.getByText('⚠️')).toBeInTheDocument();
    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
  });

  it('se cierra automáticamente después de 4 segundos', () => {
    const onClose = vi.fn();
    render(<AvisoFlotante mensaje="Mensaje de prueba" onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3999);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('respeta una duración personalizada', () => {
    const onClose = vi.fn();
    render(<AvisoFlotante mensaje="Mensaje" duracion={1000} onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('se puede cerrar manualmente con el botón ×', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<AvisoFlotante mensaje="Mensaje" onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Cerrar aviso' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('no se imprime en la boleta PDF', () => {
    render(<AvisoFlotante mensaje="Mensaje" />);

    expect(screen.getByRole('status')).toHaveClass('d-print-none');
  });

  it('aplica el color del tipo al borde de la card', () => {
    render(<AvisoFlotante tipo="danger" mensaje="Error" />);

    expect(screen.getByText('❌').closest('.card')).toHaveClass('border-danger');
  });
});
