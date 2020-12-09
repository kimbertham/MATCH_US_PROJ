import React from 'react'
import axios from 'axios'
import { poster, baseURL }  from '../../Lib/common'
import { headers } from '../../Lib/auth'
import MovieSwipeDetails from './MovieSwipeDetails'

class MovieSwipe extends React.Component { 
  state= {
    movies: [],
    details: false,
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
  const data = { m_id: this.state.m.id, title: this.state.m.title, 
    direction: d }
  await  axios.post('/api/movies/', data, headers())
  this.nextMovie()
}

nextMovie = () => {
  const { i, p, movies } = this.state
  if (i <= 19) {
    this.setState({ p: p + 1, i: 0 })
    this.getMovies()
  } else {
    this.setState({ m: movies[i + 1],i: i + 1 })
  }
}

toggleDetails = async () => {
  this.setState({ details: !this.state.details })
}

render(){
  const { m, details } = this.state
  if (!m) return null
  return (
    <>
      <div className='flex'>
        <div className='sw fh center column'>
          <div className='m-card-cont' onClick={this.toggleDetails}>
            <img 
              alt='poster' className='m-poster'
              src={`${poster}${m.poster_path}`}/>
            <h1> {m.title}, <span> {m.release_date.slice(0,4)}</span></h1>
          </div>

          <div className='flex'>
            <button className='accept' onClick={()=>{
              this.swipeMovie('True')
            }}> Yes </button>
            <button className='decline' onClick={()=>{
              this.swipeMovie('False')
            }}> No </button>
          </div>  
        </div>  

        <div className={details ? 'm-detail-cont' : 'display-none'}>
          <MovieSwipeDetails 
            toggleDetails={this.toggleDetails}
            details={m}/>
        </div>
      </div>

    </>
  )
}
}

export default MovieSwipe