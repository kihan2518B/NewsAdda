import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { useContext, Suspense } from 'react';
import { ThemeContext } from './context/theme';
import { MatchesProvider } from './context/LiveMatches/context';
import './App.css'
import { YourNewsProvider } from './context/YourNews/context';
import { PreferencesProvider } from './context/Preferences/context';
import { ArticlesProvider } from './context/NewArticles/context';

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme == 'dark' ? "dark" : "bg-gray-200"} h-full w-full`}>
      <ArticlesProvider>
        <PreferencesProvider>
          <YourNewsProvider>
            <MatchesProvider>
              <Suspense fallback={<>Loading...</>}>
                <RouterProvider router={router} />
              </Suspense>
            </MatchesProvider>
          </YourNewsProvider>
        </PreferencesProvider>
      </ArticlesProvider>
    </div>
  )
}

export default App
