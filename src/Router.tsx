import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { SubmissionsPage } from './pages/Submissions.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/submissions',
    element: <SubmissionsPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
