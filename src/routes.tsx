import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './lib/constants';
import App from './App';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: PATHS.home,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        element: <DetailsPage />,
        path: PATHS.detailsPage,
      },
    ],
  },
]);
