import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    // Note: App likely needs a Router and maybe some providers (Zustand, etc.)
    // For a minimal test, we just check if it renders.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
