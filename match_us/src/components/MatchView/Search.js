
import React from 'react'
import MovieGenre from '../Movies/MovieGenre'
import FoodFilter from '../FoodMatch/FoodFilter'

const FoodSearch = ({ section, getResults }) => {

  return (
    <div className='flex'>
      <div> Filter</div>
      <div className= 'inline'>
        <section className='f-search'>

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