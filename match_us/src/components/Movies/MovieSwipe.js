import React from 'react'
import axios from 'axios'

import { poster, baseURL }  from '../../Lib/common'
import { headers } from '../../Lib/auth'

import MovieSwipeDetails from './MovieSwipeDetails'
import Match from '../Common/Match'
import MovieSwipeCard from './MovieSwipeCard'

class MovieSwipe extends React.Component { 
  state= {
    movies: [],
    details: false,
    match: false,
    m: '',
    i: 0,
    p: 2
  }

  async componentDidMount(){
    this.getMovies()
  }

getMovies = async () => {
  let m
  do {
    const r = await axios.get(`${baseURL}${this.state.p}`)
    const list = await axios.get('/api/movies/', headers())
    m = r.data.results.filter(m => !list.data.includes(m.id))
    m.length <= 0 ? this.setState({ p: this.state.p + 1 }) : null
  } while (m.length <= 0)
  this.setState({ movies: m, m: m[this.state.i] })
}

swipeMovie = async (d) => {
  const data = { m_id: this.state.m.id, name: this.state.m.title, 
    direction: d }
  await  axios.post('/api/movies/', data, headers())
  d === 'True' ? this.checkMatch() : this.nextMovie()
}

checkMatch = async () => {
  const { connection } = this.props
  const data = { m_id: this.state.m.id }
  const r = await axios.post(`/api/movies/${connection.partner.id}/`, data )
  r ? this.setState({ match: { name: this.state.m.title } }) : this.nextMovie()
}

nextMovie = () => {
  const { i, p, movies } = this.state
  i <= 19 ? this.setState({ p: p + 1, i: 0 }, () => {
    this.getMovies()
  }) : this.setState({ m: movies[i + 1],i: i + 1 })
}

toggleDetails = async () => {
  this.setState({ details: !this.state.details })
}

clearMatch = () => {
  this.setState({ match: false })
  this.nextMovie()
}

render(){
  const { m, details, match } = this.state
  const { connection } = this.props

  if (!m) return null
  return (

    <div className='flex'>
      <div className='sw fh relative center column'>
        
        <Match match={match}
          connection={connection}
          clear={this.clearMatch}
          getDetail={this.toggleDetails}
          img={`${poster}${m.poster_path}`}/>

  
        <MovieSwipeCard m={m}
          toggleDetails={this.toggleDetails}
          swipeMovie={this.swipeMovie}/>
      </div>  

      <div className={details ? 'm-detail-cont' : 'display-none'}>
        <MovieSwipeDetails 
          toggleDetails={this.toggleDetails}
          details={m}/>
      </div>
    </div>

  )
}
}

export default MovieSwipe