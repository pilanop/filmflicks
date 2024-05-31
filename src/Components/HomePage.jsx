import {useState} from 'react'
import Movies from './Movies'

function HomePage(){

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h1 className='text-white font-serif font-bold text-4xl text-center mt-11'>Film Flicks</h1>

      <div className='flex justify-center mt-11'>
        <input
          className='border-[2px] h-[2.5rem] w-[50%] rounded-lg font-serif text-xl p-3'
          type="text"
          placeholder='Search ...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {searchTerm && <Movies searchTerm={searchTerm} />}
    </div>
  )
}

export default HomePage
