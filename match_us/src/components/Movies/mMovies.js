/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import { poster, key, detailUrl, genreUrl } from '../../Lib/common'

import MovieDetails from './MovieDetails'

class Movies extends React.Component {
state = {
  movies: [],
  details: null,
  genres: [],
  m: null
}

async componentDidMount(){
  // const genres = (await axios.get(genreUrl)).data.genres
  // this.setState({ genres })
  // console.log(genres)
  // this.getMovies()
}

getMovies = async() => {
  const movies = []
  const m = await axios.get(`/api/movies/${this.props.connection.partner.id}/`, headers())
  Promise.all( 
    m.data.map(async x => {
      const d = ((await axios.get(`${detailUrl}${x}?api_key=${key}&language=en-US`)).data)
      movies.push(d),
      this.setState({ movies, m: movies })
    }))
}

setGenre = (e) => {
  if (e.target.value === 'all') {
    this.setState({ m: this.state.movies })
  } else {
    const m = this.state.movies.filter(m => m.genres.find(x => x.id === Number(e.target.value)))
    this.setState({ m })
  }
}

setDetails = (d) => {
  this.setState({ details: d })
}


render(){
  const { connection } = this.props
  const { m, details, genres } = this.state
  if (!genres || !m ) return null

  return (
    <div className=' m-match-cont'>


      <MovieDetails 
        details={details}
        setDetails={this.setDetails}/>

      <div className='margin m-match'>
        <h1> {connection.user.first_name} & {connection.partner.first_name} &apos;s Movies</h1>
      
        <select className='m-options' onChange={this.setGenre}>  
          <option disabled selected hidden> Genre </option> 
          <option value='all'> All </option>  
          {genres.map(g => <option key={g.id}value={g.id} >{g.name} </option> )}
        </select>
        <select className='m-options' onChange={this.setSort}>  
          <option disabled selected hidden> Sort by </option> 
          <option value='date'> Date Added </option> 
          <option value='rating'> Rating </option>  
          <option value='ppopularity'> Popularity </option> 
          <option value='name'> Name </option> 
        </select>
    
        <div className='m-movies'>
          {m.map(m => {
            return <div key={m.id} className='match-cont'
              onClick={() => {
                this.setDetails(m) 
              }}> <h1>{m.title}</h1>
              <img alt='poster' className='m-poster'
                src={`${poster}${m.poster_path}`}/>
            </div>
          })}
        </div>
      </div>


    </div>
  )
}
}
export default Movies