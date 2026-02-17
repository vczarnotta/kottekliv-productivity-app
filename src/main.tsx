import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TodoProvider } from './context/TodoContext.js'
import { TimerProvider } from './context/TimerContext.jsx'
import SessionProvider from './context/SessionContext.js'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <TimerProvider>
          <TodoProvider>
            <App />
          </TodoProvider>
        </TimerProvider>
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>,
)
