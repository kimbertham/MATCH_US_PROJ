
import React from 'react'
import MovieGenre from './Movies/MovieGenre'
import FoodFilter from './FoodMatch/FoodFilter'

const FoodSearch = ({ section, getResults, handleLoader }) => {

  return (
    <div className='m-search'>
      
      <div className='search'>
        <section>
          {section === 'movies' ?
            <MovieGenre 
              getResults={getResults}/>
            :
            <FoodFilter 
              handleLoader={handleLoader}
              getResults={getResults}/>
          }
        </section>
      </div>
    </div>

  )
}


export default FoodSearch