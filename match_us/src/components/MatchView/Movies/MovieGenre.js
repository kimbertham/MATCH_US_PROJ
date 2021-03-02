import React from 'react'
import axios from 'axios'
import { genreUrl } from '../../../Lib/common'

class MovieGenre extends React.Component { 
  state = {
    genres: '',
    chosen: ''
  }

  async componentDidMount(){
    const genres = (await axios.get(genreUrl)).data.genres
    this.setState({ genres })
  }
  
  setGenre = (e) => {
    this.props.getResults(e.target.value)
  }

  render() {
    const { genres } = this.state
    if (!genres) return null

    return (
      <>
        <select className='m-options' onChange={this.setGenre}>  
          <option disabled selected hidden> Genre </option> 
          <option value='all'> All </option>  
          {genres.map(g => <option key={g.id}value={g.id} >{g.name} </option> )}
        </select>
      </>
    )
  }
}

export default MovieGenre
