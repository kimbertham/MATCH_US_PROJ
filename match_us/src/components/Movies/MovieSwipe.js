import React from 'react'
import axios from 'axios'
import { poster, baseURL ,genreUrl }  from '../../Lib/common'
import { headers } from '../../Lib/auth'

class MovieSwipe extends React.Component { 
  state= {
    movies: [],
    genres: [],
    m: '',
    i: 0,
    p: 8
  }

  async componentDidMount(){
    const g = await axios.get(genreUrl)
    this.setState({ genres: g.data.genres })
    this.getMovies()
  }

  getMovies = async () => {
    const r = await axios.get(`${baseURL}${this.state.page}`)
    this.setState({ movies: r.data.results, m: r.data.results[this.state.i] })
  }

  swipeMovie = async (d) => {
    const data = { m_id: this.state.m.id, title: this.state.m.title, genres: this.setGenre(), direction: d }
    await  axios.post('/api/movies/', data, headers())
    this.nextMovie()
  }

nextMovie = () => {
  const { i, p, movies } = this.state
  if (i >= 19) {
    this.setState({ p: p + 1, i: 0 })
    this.getMovies()
  } else {
    this.setState({ m: movies[i + 1],i: i + 1 })
  }
}

  setGenre = () => {
    return this.state.m.genre_ids.map(id => {
      return this.state.genres.find(x => x.id === id).name
    })
  }

  render(){

    const { m } = this.state

    if (!m) return null
    return (

      <div className='sw column center'>

        <div className='m-card-cont'>
          <img 
            alt='poster' className='m-poster'
            src={`${poster}${m.poster_path}`}/>
          <h1> {m.title}</h1>
          <h2> {m.release_date.slice(0,4)}</h2>
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
    )
  }
}

export default MovieSwipe