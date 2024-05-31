import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import HomePage from './Components/HomePage.jsx'
import About from './Components/About.jsx'
import FavouritePage from './Components/FavouritePage.jsx'
import Movies from './Components/Movies.jsx'
import MoviesDetail from './Components/MoviesDetail.jsx'
import { FavoriteProvider } from './Components/FavoriteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FavoriteProvider>
    <BrowserRouter>
      <nav
        className='flex justify-end font-bold font-serif text-xl bg-gray-300 rounded-md shadow-lg m-4 p-1.5'>
        <Link to=''
              className='p-4 hover:text-blue-500 active:text-teal-100 transform scale-110'>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
               className="icon icon-tabler icons-tabler-outline icon-tabler-movie mr-auto">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/>
            <path d="M8 4l0 16"/>
            <path d="M16 4l0 16"/>
            <path d="M4 8l4 0"/>
            <path d="M4 16l4 0"/>
            <path d="M4 12l16 0"/>
            <path d="M16 8l4 0"/>
            <path d="M16 16l4 0"/>
          </svg>
        </Link>
        <Link to='/About'
              className='p-4 hover:text-blue-500 active:text-teal-100'>About</Link>
        <Link to='/Favourite'
              className='p-4 hover:text-blue-500 active:text-teal-100'>Favourite</Link>
        <Link to='/Movies'
              className='p-4 hover:text-blue-500 active:text-teal-100'>All
          Movies</Link>
      </nav>

      <Routes>
        <Route path='' element={<HomePage/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Favourite' element={<FavouritePage/>}/>
        <Route path='/Movies' element={<Movies/>}/>
        <Route path='/Movies/:id' element={<MoviesDetail/>}/>
      </Routes>
    </BrowserRouter>
  </FavoriteProvider>
)