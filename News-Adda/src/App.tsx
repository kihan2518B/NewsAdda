import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './context/theme';
import './App.css'

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme == 'dark' ? "dark" : "bg-gray-200"} h-full w-full`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
