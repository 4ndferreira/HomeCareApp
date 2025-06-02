import { render } from '@testing-library/react';
import { describe, it } from 'vitest'
import LoginPage from './loginPage';

describe('LoginPage component', () => {
  it('should renders', () => {
    render(<LoginPage />);
  });
})