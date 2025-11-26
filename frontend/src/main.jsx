import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { InfoContextProvider } from './context/info.jsx'
import { AddPersonProvider } from './context/modals/addPerson.jsx'

createRoot(document.getElementById('root')).render(
  <InfoContextProvider>
    <AddPersonProvider>
      <App />
    </AddPersonProvider>
  </InfoContextProvider>,
)
