import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext.jsx'
import { TimerProvider } from './context/TimerContext.jsx'
import SessionProvider from './context/SessionProvider.js'

// TodoProvider gör så att den går att använda hela vägen neråt i DOM trädet. det blir som en antenn

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <TimerProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </TimerProvider>
    </SessionProvider>
  </StrictMode>,
)
