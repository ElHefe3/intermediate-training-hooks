import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';

import { Button } from '@project/components';
import { ButtonPropsType } from './types';

describe('Button test suite', () => {
  let onClickMock: Mock<any, []>;

  const renderButton = (props: ButtonPropsType) => render(<Button {...props} />);

  beforeEach(() => {
    onClickMock = vi.fn();
  });

  test('Should render default button and execute onClick once', () => {
    const { getByText } = renderButton({
      onClick: onClickMock,
      children: 'Click me!',
    });

    const button = getByText('Click me!');
    button.click();

    expect(button).toBeTruthy();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('Should render disabled button and not execute onClick', () => {
    const { getByText } = renderButton({
      onClick: onClickMock,
      children: 'Click me!',
      disabled: true,
    });
    const button = getByText('Click me!');
    button.click();

    expect(button).toBeTruthy();
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });

  test('Should render button with contained variant style', () => {
    const { getByText } = renderButton({
      onClick: onClickMock,
      children: 'Click me!',
      variant: 'contained',
    });

    const button = getByText('Click me!');

    expect(button).toBeTruthy();
    expect(button.className).toContain('bg-primary');
  });

  test('Should render button with outlined variant style', () => {
    const { getByText } = renderButton({
      onClick: onClickMock,
      children: 'Click me!',
      variant: 'outlined',
    });

    const button = getByText('Click me!');

    expect(button).toBeTruthy();
    expect(button.className).toContain('border-primary');
  });

  test('Should render button with text variant style', () => {
    const { getByText } = renderButton({
      onClick: onClickMock,
      children: 'Click me!',
      variant: 'text',
    });

    const button = getByText('Click me!');

    expect(button).toBeTruthy();
    expect(button.className).toContain('text-blue-600');
  });
});
