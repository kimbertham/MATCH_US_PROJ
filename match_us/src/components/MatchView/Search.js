
import React from 'react'
import MovieGenre from '../Movies/MovieGenre'
import FoodFilter from '../FoodMatch/FoodFilter'

const FoodSearch = ({ section, getResults }) => {

  return (
    <div className='m-search'>
      <h3> Filter </h3>
      
      <div>
        <section>
          {section === 'movies' ?
            <MovieGenre 
              getResults={getResults}/>
            :
            <FoodFilter 
              getResults={getResults}/>
          }
        </section>
      </div>
    </div>
  )
}


export default FoodSearch