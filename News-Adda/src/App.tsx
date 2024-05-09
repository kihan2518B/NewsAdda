import router from './routes';
import { RouterProvider } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <div className='h-screen w-full bg-purple-100'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
