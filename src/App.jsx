import { useState } from 'react'
import './App.css'
import AppLayout from './layout/AppLayout'
import Homepage from './pages/Homepage/Homepage'
import MoviePage from './pages/Movies/MoviePage'
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage'
import { Route, Routes } from 'react-router-dom'
import NotFoundpage from './pages/NotFoundpage/NotFoundpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Homepage/>}/>  
            <Route path="movies">
              <Route index element={<MoviePage/>}/>
              <Route path=":id" element={<MovieDetailPage/>}/>
            </Route>
        </Route>

        <Route path="*" element={<NotFoundpage/>}/>
      </Routes>
   
    </div>
  )
}

export default App
