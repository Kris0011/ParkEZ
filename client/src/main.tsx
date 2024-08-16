import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider} from 'react-redux'
import store from './store'
import { ThemeProvider } from './reducers/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark'>
        <App />
      </ThemeProvider>
    </Provider>
    
  </StrictMode>,
)
