import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';
import '@testing-library/jest-dom';
import type { ButtonProps } from './button.types';

describe('Button component', () => {
  const renderButton = (props?: Partial<ButtonProps>) => {
    const defaultProps: ButtonProps = {
      children: 'Click me',
      onClick: jest.fn(),
      ...props,
    };
    return render(<Button {...defaultProps} />);
  };

  test('renders with default props', () => {
    renderButton();
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button', 'primary', 'medium');
    expect(button).not.toBeDisabled();
  });

  test('renders with secondary variant and large size', () => {
    renderButton({ variant: 'secondary', size: 'large' });
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('secondary', 'large');
  });

  test('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    renderButton({ onClick: onClickMock });
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const onClickMock = jest.fn();
    renderButton({ onClick: onClickMock, disabled: true });
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('adds ripple element on click', () => {
    renderButton();
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button.querySelector('span')).toBeNull();

    fireEvent.click(button);

    const ripple = button.querySelector('span');
    expect(ripple).toBeInTheDocument();
    expect(ripple).toHaveClass('ripple');

    jest.useFakeTimers();
    fireEvent.click(button);
    jest.advanceTimersByTime(600);
    expect(button.querySelector('span')).toBeNull();
    jest.useRealTimers();
  });
});
