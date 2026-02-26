import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoProvider } from './context/TodoContext.js'
import { TimerProvider } from './context/TimerContext.jsx'
import SessionProvider from './context/SessionContext.js'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.js'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    
      <SessionProvider>
        <TimerProvider>
          <TodoProvider>
            <RouterProvider router={router}/>
          </TodoProvider>
        </TimerProvider>
      </SessionProvider>
    
  </StrictMode>,
)
