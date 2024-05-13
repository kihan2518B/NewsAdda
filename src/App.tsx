import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './context/theme';
import { MatchesProvider } from './context/LiveMatches/context';
import './App.css'

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme == 'dark' ? "dark" : "bg-gray-200"} h-full w-full`}>
      <MatchesProvider>
        <RouterProvider router={router} />
      </MatchesProvider>
    </div>
  )
}

export default App
