import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the API service to avoid network calls in tests
jest.mock('../services/api', () => ({
  apiService: {
    get: jest.fn(() => Promise.resolve({ data: { status: 'ok' } }))
  }
}));

function renderWithRouter(component) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
}

describe('React Frontend App', () => {
  test('renders app title', () => {
    renderWithRouter(<App />);
    const titleElement = screen.getByText(/{{APP_TITLE}}/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  test('renders welcome message on home page', () => {
    renderWithRouter(<App />);
    const welcomeMessage = screen.getByText(/welcome to {{APP_TITLE}}/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders features section', () => {
    renderWithRouter(<App />);
    const featuresHeading = screen.getByText(/features/i);
    expect(featuresHeading).toBeInTheDocument();
  });

  test('renders API demo section', () => {
    renderWithRouter(<App />);
    const apiButton = screen.getByRole('button', { name: /test api connection/i });
    expect(apiButton).toBeInTheDocument();
  });
});