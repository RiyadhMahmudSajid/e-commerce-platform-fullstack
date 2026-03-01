import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.jsx'
import ThemeProvider from './providers/ThemeProvider.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ModalProvider from './providers/ModalProvider.jsx'
import CartProvider from './providers/CartProvider.jsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <ThemeProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 1000,
              }}
            />
            <CartProvider>


              <RouterProvider router={router}>
                
              </RouterProvider>

            </CartProvider>

          </ThemeProvider>
        </ModalProvider>
      </QueryClientProvider>
    </AuthProvider>

  </StrictMode>,
)
