import React from 'react'
import axios from 'axios'
import { getCoordinates, typeList } from '../../Lib/com'
import { headers } from '../../Lib/auth'
import Loader from '../Common/Loader'
import NewEvent from '../Events/NewEvent'

import foodIcon from '../../styles/assets/menu-icons/food.jpg'
import activityIcon from '../../styles/assets/menu-icons/activities.jpg'
import moviesIcon from '../../styles/assets/menu-icons/movies.jpg'

class Randomiser extends React.Component {
state= {
  activity: '',
  movie: '',
  food: '',
  payer: '',
  loader: false,
  event: false
}

connection = this.props.connection

getFood = async (data) => {
  const r = await axios.post('/api/food/random/', data, headers())
  this.setState({ food: r.data, loader: false })
  console.log(r)
}

getActivity = async (d) => {
  console.log('active')
  const activity = typeList[ Math.floor(Math.random() * 41) + 1] 
  const data = { 
    'partner': this.connection.partner.id, 
    'connection': this.connection.id ,
    'random': d,
    'location': await this.getLocation(), 
    'rankby': 'distance', 
    'keyword': activity 
  }
  const r = (await axios.post('/api/activities/random/', data, headers())).data
  console.log(r)
  this.setState({ activity: r },() => {
    this.getFood({
      'random': d,
      'partner': this.connection.partner.id, 
      'connection': this.connection.id ,
      'location': `${r.geometry.location.lat}, ${r.geometry.location.lng}`, 
      'rankby': 'distance',
      'keyword': ['restaurant', 'food'] 
    })
  })
}

getMovie = async (d) => {
  console.log('movie')
  const data = { 
    'random': d, 
    'partner': this.connection.partner.id, 
    'connection': this.connection.id }
  const r = await axios.post('/api/movies/random/', data, headers()) 
  console.log(r)
  this.setState({ movie: r.data })
  this.getFood({ 
    'random': d,
    'partner': this.connection.partner.id, 
    'connection': this.connection.id,
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
  const action = Math.floor(Math.random() * 2)  
  action === 1 ? this.getMovie(d) : this.getActivity(d)
  this.setState({ loader: true, food: false, payer: false })
}

whoPays = () => {
  const action = Math.floor(Math.random() * 2) + 1 
  const payer = action === 1 ? 
    this.connection.partner.first_name : this.connection.user.first_name
  this.setState({ payer })
}

handleEvent = () => {
  this.setState({ event: !this.state.event })
}
render() {
  const {  food, activity, movie, payer, loader, event } = this.state
  const { connection } = this

  if (loader) return  <Loader type='Bars'/>

  if (event) return (
    <div className='swipeview'>
      <div className='modal' onClick={this.handleEvent}>
        <div onClick={e=>{
          e.stopPropagation()
        }} className='m-pop'>

          <NewEvent 
            connection={connection} 
            closeModal={this.handleEvent}
            data={{ location: food.formatted_address, 
              notes: ` ${food.name} & ${movie ? movie.title : activity.name}` }} /> 

        </div>
      </div>
    </div>
  )

  return (
    <div className='full center scroll'>

      {!food ?  <div className={loader ? 'display-none' : 'column'}>

        <button className='random-button' onClick={()=>{
          this.getRandom(true)
        }}><b> Generate a completely random date</b> </button>
        <button  className='random-button' onClick={()=>{
          this.getRandom(false)
        }}> <b> Generate a random date from your matches!</b></button>
      </div>
        :
        <div className='random-results'>
          <div className='random'>
            <div className='flex'>
              <img src={foodIcon} alt='food' className='random-icon'/>
              <h2 className='r-title'>Date Meal</h2>
            </div>
            <h2>{food.message || food.name}</h2>
            <a href={food.website}>{food.website}</a>
            <p>{food.formatted_phone_number}</p>
            <p>{food.formatted_address}</p>
          </div>

          {activity ?
            <div className='random'>
              <div className='flex'>
                <img src={activityIcon} alt='activity' className='random-icon'/>
                <h2 className='r-title'>Date Activity</h2>
              </div>
              <h2>{activity.message || activity.name}</h2>
              <a href={activity.website}> {activity.website}</a>
              <p>{activity.formatted_phone_number}</p>
              <p>{activity.formatted_address}</p>
              {activity.types ? activity.types.map(t => <p key={t}> ‣ {t.replace(/_/g, ' ')}</p>) : null}
            </div>
            :
            <div className='random'> 
              <div className='flex'>
                <img src={moviesIcon} alt='movies' className='random-icon'/>
                <h2 className='r-title'>Date Movie</h2>
              </div>      
              <h2>{movie.message || movie.title}</h2>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          }
        
          {payer ? <div className='random'> <h1>Payer: {payer} </h1></div> : null}
            
          <div>
            <button className='button' onClick={this.whoPays}>Who pays?</button>
            <button className='button' onClick={this.handleEvent}>Create Event</button>
            <br/>
            <button className='button' onClick={()=>{
              this.getRandom(true)
            }}>New Random date</button>
            <button className='button' onClick={()=>{
              this.getRandom(false)
            }}>New Match Date</button>
          </div>
        </div>
      }
    </div>
  )
}
}

export default Randomiser