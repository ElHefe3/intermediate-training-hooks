import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';

import { ActivityLoader } from '@project/components';

describe('ActivityLoader test suite', () => {
  test('Should render ActivityLoader', () => {
    const { container } = render(<ActivityLoader isLoading />);
    expect(container).toBeTruthy();
    expect(container.childElementCount).toBe(1);
  });

  test('Should not render ActivityLoader', () => {
    const { container } = render(<ActivityLoader isLoading={false} />);
    expect(container).toBeTruthy();
    expect(container.childElementCount).toBe(0);
  });
});
