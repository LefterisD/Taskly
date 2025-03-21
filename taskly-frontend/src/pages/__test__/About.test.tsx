import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import About from '../About';
import { ThemeProvider } from '@mui/material';
import theme from '../../assets/theme';
import { SnackbarProvider } from '../../context/SnackbarContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../api/QueryClient';

describe('About page test', () => {
  it('Should render about page with texts', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <MemoryRouter>
              <About />
            </MemoryRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );

    const descriptionParagraph: HTMLElement = screen.getByText(
      /Taskly is a simple yet powerful to-do app designed to help you stay organized and boost productivity/i
    );

    expect(descriptionParagraph).toBeInTheDocument();
  });

  it('Should render mock todos', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <MemoryRouter>
              <About />
            </MemoryRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );

    const todos: HTMLElement[] = Array.from(screen.getAllByTestId('todo-card'));

    expect(todos.length).toEqual(4);
  });
});
