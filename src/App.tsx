import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './context/theme';
import { MatchesProvider } from './context/LiveMatches/context';
import './App.css'
import { YourNewsProvider } from './context/YourNews/context';
import { PreferencesProvider } from './context/Preferences/context';

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme == 'dark' ? "dark" : "bg-gray-200"} h-full w-full`}>
      <PreferencesProvider>
        <YourNewsProvider>
          <MatchesProvider>
            <RouterProvider router={router} />
          </MatchesProvider>
        </YourNewsProvider>
      </PreferencesProvider>
    </div>
  )
}

export default App
