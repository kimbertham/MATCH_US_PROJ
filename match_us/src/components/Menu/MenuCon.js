import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

import movies from '../../styles/assets/menu-icons/movies.jpg'
import food from '../../styles/assets/menu-icons/food.jpg'
import activities from '../../styles/assets/menu-icons/activities.jpg'
import locations from '../../styles/assets/menu-icons/location.jpg'
import random from '../../styles/assets/menu-icons/random.jpg'
import notes from '../../styles/assets/menu-icons/notes.jpg'
import wishlist from '../../styles/assets/menu-icons/wishlist.jpg'
import calender from '../../styles/assets/menu-icons/calender.jpg'
import overview from '../../styles/assets/menu-icons/overview.jpg'
import arrow from '../../styles/assets/menu-icons/arrow.jpg'
import unmatch from '../../styles/assets/menu-icons/unmatch.jpg'


const MenuCon = ({ connection, location , user, history, getCons }) =>  {
  const { id } = connection

  const selected = (s) => {
    return location.pathname.includes(s) ? 'm-option selected' : 'm-option'
  }

  const open = (s) => {
    return location.pathname.includes(s) ? 'm-open' : 'display-none'
  }

  const handleUnmatch = async () => {
    await axios.delete(`/api/connections/${id}/`)
    history.push('/home')
    getCons()
  }


  if (!connection || !user) return null 

  return (
    <div className='m-con'>

      <Link to={'/home'}>
        <div className='relative'>
          <img src={arrow} className='m-arrow'/>
        </div>
      </Link>

      <div className='m-profile'> 
      
        <div className='img-wrap'>
          <div className='m-img-cont'>
            <div className='m-img' style={{ backgroundImage: `url(${user.profile_image})` }}/>
          </div>
          <div className='l-cont'>
            <div className='p-img' style={{ backgroundImage: `url(${connection.partner.profile_image})` }}/>
          </div>
        </div>

        <h1>{connection.partner.first_name} {connection.partner.last_name}</h1>
        <small>Connected since {connection.created_at.slice(0,4)}</small>
      </div>

      <div>
        <div className={selected('overview')}>
          <img src={overview} alt='food' className='m-icon'/>
          <Link to={`/connection/${id}/overview`}>
            <h1 id='overview'>Overview</h1>
          </Link>
        </div>

        <div>
    
          <Link to={`/connection/${id}/food/`}>
            <div className={selected('food')}> 
              <img src={food} alt='food' className='m-icon'/>
              <h1 id='food'> Food </h1></div>
          </Link>
          <div className={open('food')}>
            <Link to={`/connection/${id}/food`}><h3 className='s-option'>Swipe Food</h3></Link>
            <Link to={`/connection/${id}/food/results`}> <h3 className='s-option' >Matched Food</h3></Link>
          </div>

          <Link to={`/connection/${id}/movies`}>
            <div className={selected('movies')} >
              <img src={movies} alt='movies' className='m-icon'/>
              <h1 id='movies'> Movies </h1>
            </div>
          </Link>
          <div className={open('movies')} >
            <Link to={`/connection/${id}/movies`}><h3 className='s-option' >Swipe Movies</h3></Link>
            <Link to={`/connection/${id}/movies/results`} ><h3 className='s-option' >Matched Movies</h3></Link>
          </div>
          
          <Link to={`/connection/${id}/activities`}>
            <div className={selected('activities')}>
              <img src={activities} alt='movies' className='m-icon'/>
              <h1 id='activities'> Activities</h1>
            </div>
          </Link>
          <div className={open('activities')}>
            <Link to={`/connection/${id}/activities`}> <h3 className='s-option'> Swipe Activities</h3></Link>
            <Link to={`/connection/${id}/activities/results`}><h3 className='s-option' >Matched Activities</h3></Link>
          </div>
        </div>
      
        <Link to={`/connection/${id}/locations`}>
          <div className={selected('locations')}>
            <img src={locations} alt='movies' className='m-icon'/>
            <h1 id='locations'> Locations </h1>
          </div>
        </Link>
        
        <Link to={`/connection/${id}/randomiser`}>
          <div className={selected('random')}>
            <img src={random} alt='movies' className='m-icon'/>
            <h1 id='random'> Randomiser </h1>
          </div>
        </Link>

        <Link to={`/connection/${id}/notes/inbox`}>
          <div className={selected('notes')}>
            <img src={notes} alt='notes' className='m-icon'/>
            <h1 id='notes'> Notes </h1>
          </div>
        </Link>
        <div className={open('notes')}>
          <Link to={`/connection/${id}/notes/inbox`}><h3 className='s-option'>Inbox</h3></Link>
          <Link to={`/connection/${id}/notes/outbox`}><h3 className='s-option'>Outbox</h3></Link>
        </div>
      
        <Link to={`/connection/${id}/wishlist`}>
          <div className={selected('wishlist')}>
            <img src={wishlist} alt='movies' className='m-icon'/>
            <h1 id='wishlist'> Wishlist </h1>
          </div>
        </Link>

        <Link to={`/connection/${id}/events`}>
          <div className={selected('calendar')}>
            <img src={calender} alt='movies' className='m-icon'/>
            <h1 id='calendar'> Calendar </h1>
          </div>
        </Link>

        <img src={unmatch} alt='unmatch' className='unmatch' onClick={handleUnmatch}/>

      </div>
    </div>
  )
}

export default withRouter(MenuCon)