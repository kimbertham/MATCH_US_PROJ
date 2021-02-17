import React from 'react'
import axios from 'axios'
import { getCoordinates, typeList } from '../../Lib/com'
import { GImages, noPlaces, poster } from '../../Lib/common'
import { headers } from '../../Lib/auth'
import Loader from '../Common/Loader'
import NewEvent from '../Events/NewEvent'


class Randomiser extends React.Component {
  state= {
    activity: '',
    movie: '',
    food: '',
    payer: '',
    loader: false,
    event: false
  }

  getFood = async (data) => {
    const r = await axios.post('/api/food/random/', data, headers())
    this.setState({ food: r.data, loader: false })
  }

  getActivity = async (d) => {
    const activity = typeList[ Math.floor(Math.random() * 41) + 1] 
    const { connection } = this.props
    const data = { 
      'partner': connection.partner.id, 
      'connection': connection.id ,
      'random': d,
      'location': await this.getLocation(), 
      'rankby': 'distance', 
      'keyword': activity 
    }
    const r = (await axios.post('/api/activities/random/', data, headers())).data
    this.setState({ activity: r },() => {
      this.getFood({
        'random': d,
        'partner': connection.partner.id, 
        'connection': connection.id ,
        'location': r.geometry ? 
          `${r.geometry.location.lat}, ${r.geometry.location.lng}` : null, 
        'rankby': 'distance',
        'keyword': ['restaurant', 'food'] 
      })
    })
  }

  getMovie = async (d) => {
    const { connection } = this.props
    const data = { 
      'random': d, 
      'partner': connection.partner.id, 
      'connection': connection.id }
    const r = await axios.post('/api/movies/random/', data, headers()) 
    this.setState({ movie: r.data })
    this.getFood({ 
      'random': d,
      'partner': connection.partner.id, 
      'connection': connection.id,
      'location': await this.getLocation(), 
      'rankby': 'distance',
      'keyword': ['meal_takeaway', 'meal_delivery'] 
    })
  }

  getLocation = async () => {
    const p = await getCoordinates()
    return `${p.coords.latitude}, ${p.coords.longitude}`
  }

  getRandom = (d) => {
    const action = Math.floor(Math.random() * 2) + 1 
    action === '1' ? this.getMovie(d) : this.getActivity(d)
    this.setState({ loader: true, food: false, payer: false })
  }

  whoPays =() => {
    const action = Math.floor(Math.random() * 2) + 1 
    const payer = action === '1' ? this.props.connection.partner.first_name : this.props.connection.user.first_name
    this.setState({ payer })
  }

  handleEvent = () => {
    this.setState({ event: !this.state.event })
  }
  render() {
    const {  food, activity, movie,payer, loader, event } = this.state
    const { connection } = this.props
    return (
      <div className='fh center'>

        {loader ? <Loader/> : null}

        {event ? <NewEvent 
          connection={connection} 
          data={{ location: food.formatted_address }} 
          closeModal={this.handleEvent}/> : null}

        {!food ? <div className={loader ? 'display-none' : 'random-buttons'}>
          <button className='random-button' onClick={()=>{
            this.getRandom(true)
          }}><b> Generate a completely random date</b> </button>
          <button  className='random-button' onClick={()=>{
            this.getRandom(false)
          }}> <b> Generate a random date from your matches</b></button>
        </div>
      
          :

          <div className='random-results'>

            <div className='random-food'>
              <h1>Date Meal</h1>
              <p>{food.message || food.name}</p>
              <p>{food.website}</p>
              <p>{food.formatted_phone_number}</p>
              <p>{food.formatted_address}</p>
              <div className='r-food-img' style={{ backgroundImage: `url(${GImages}${food.photos ?
                food.photos[0].photo_reference : noPlaces })` }}/>
            </div>

            {activity ?
              <div className='random-activity'>
                <h1>Date Activity</h1>
                <p>{activity.message || activity.name}</p>
                <p>{activity.website}</p>
                <p>{activity.formatted_phone_number}</p>
                <p>{activity.formatted_address}</p>
                <div className='r-activity-img' style={{ backgroundImage: `url(${GImages}${activity.photos ?
                  activity.photos[0].photo_reference : noPlaces })` }}/>
                {activity.types ? activity.types.map(t => <p key={t}>{t}</p>) : null}
              </div>
              :
              <div className='random-movie'>
                <h1>Date Movie</h1>
                {movie.message || movie.title}
                {movie.release_date}
                {movie.overview}
                <div className='r-activity-img' style={{ backgroundImage: `url(${poster}${movie.poster_path})` }}/>
              </div>
            }

            {payer ? <h1>Payer: {payer} </h1> : <button onClick={this.whoPays}>Who pays?</button>}
            <button onClick={this.handleEvent}>Create Event</button>
            <button onClick={()=>{
              this.getRandom(true)
            }}>New Random date</button>
            <button onClick={()=>{
              this.getRandom(false)
            }}>New Match Date</button>
        
          </div>
        }
      </div>


    )
  }
}

export default Randomiser