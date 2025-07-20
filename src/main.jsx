import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes.jsx'
import 'react-tooltip/dist/react-tooltip.css';
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // <-- FIXED

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer theme='dark' />
      </StrictMode>
    </AuthProvider>
  </QueryClientProvider>
)