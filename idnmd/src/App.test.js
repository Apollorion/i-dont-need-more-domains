import { render, screen } from '@testing-library/react';
import App from './App';

test('renders image', async () => {
  render(<App />);
  const image = screen.getByAltText('meme');
  expect(image).toBeInTheDocument();
});
