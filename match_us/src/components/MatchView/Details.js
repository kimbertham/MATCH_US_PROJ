/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { proxyurl, fDetails, GImages, detailUrl, tmdbKey, poster } from '../../Lib/common'

class FoodDetails extends React.Component {
  state ={
    r: null
  }

  componentDidMount() {
    this.getFullDetails()
  }

getFullDetails = async () => {
  const { section, selected } = this.props
  if (section === 'movies') {
    const r = (await axios.get(`${detailUrl}${selected}?api_key=${tmdbKey}`)).data
    this.setState({ r })
  } else {
    const r = (await axios.get(`/api/food/${this.props.selected}/`)).data.result
    this.setState({ r })
  }
}

render() {
  const { r } = this.state
  if (!r) return null

  const foodDetails = () => {
    return (
      <>
        <h1>{r.name}</h1>
        <p> {r.website}</p>
        <p> {r.formatted_address}</p>
        <p> {r.formatted_phone_number}</p>
        <p> {r.opening_hours ? 
          <>
            <p>{r.opening_hours.open_now} </p>
            {r.opening_hours.weekday_text.map((w,i) => <p key={i}> {w}</p>)}
          </> : null}</p>

        <p>{r.price_level}</p>
        <p>{r.rating}</p>
        {r.photos ? r.photos.slice(0,3).map(p => <div key={p.photo_reference} className='f-detail-img'
          style={{ backgroundImage: `url(${GImages}${p.photo_reference})` }}/>) : null}
        {r.reviews ? <p>{r.reviews[0].author_name} {r.reviews[0].rating} {r.reviews[0].text} </p> : null}
      </>
    )
  }

  const movieDetails = () => {
    return (
      <>
        <img 
          alt='poster' className='m-poster' src={`${poster}${r.poster_path}`}/>
        <h1>{r.release_date}</h1>
        <h1>{r.title} </h1>
        <h1>{r.tagline} </h1>
        <p>{r.overview} </p>
        <h1> {r.homepage}</h1>
        <p>{r.production_companies.map(x=> x.name )}</p>
        <p>{r.vote_average}</p>
        <p>{r.runtime} mins </p>
        {r.genres ? r.genres.map(g=> g.name) : null }
      </>
    )
  }
  
  if (!r) return null
  return (

    <div onClick={this.props.getDetail} className='modal f-details column'>
      {this.props.section === 'movies' ? movieDetails() : foodDetails()}
    </div>
      

  )
}
}
export default FoodDetails