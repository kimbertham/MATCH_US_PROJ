import React from 'react'
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



const MenuCon = ({ connection, location }) =>  {

  const selected = (s) => {
  
    return location.pathname.includes(s) ? 'm-option selected' : 'm-option'
  }

  const open = (s) => {
    return location.pathname.includes(s) ? 'm-open' : 'display-none'
  }

  const { id } = connection
  return (
    <div className='m-con'>

      <Link to={'/home'}>
        <div className='relative'>
          <img src={arrow} className='m-arrow'/>
        </div>
      </Link>

      <div className='m-profile center'> 
        <div className='center wrap'>
          <img src={connection.partner.profile_image} className='m-img' alt='profile-img'/>
          <img src={connection.partner.profile_image} className='m-img-large' alt='profile-img'/>
        </div>
        <h1>{connection.partner.first_name} {connection.partner.last_name}</h1>
        <small>Connected since {connection.created_at.slice(0,4)}</small>
      </div>

      <div className='m-list'>

        <div className={selected('overview')}>
          <img src={overview} alt='food' className='menu-icon'/>
          <Link to={`/connection/${id}/overview`}>
            <h1 id='overview'>Overview</h1>
          </Link>
        </div>

        <div>
    
          <Link to={`/connection/${id}/food/`}>
            <div className={selected('food')}> 
              <img src={food} alt='food' className='menu-icon'/>
              <h1 id='food'> Food </h1></div>
          </Link>
          <div className={open('food')}>
            <Link to={`/connection/${id}/food`}><h3 className='sub-option'>Swipe Food</h3></Link>
            <Link to={`/connection/${id}/food/results`}> <h3 className='sub-option' >Matched Food</h3></Link>
          </div>

          <Link to={`/connection/${id}/movies`}>
            <div className={selected('movies')} >
              <img src={movies} alt='movies' className='menu-icon'/>
              <h1 id='movies'> Movies </h1>
            </div>
          </Link>
          <div className={open('movies')} >
            <Link to={`/connection/${id}/movies`}><h3 className='sub-option' >Swipe Movies</h3></Link>
            <Link to={`/connection/${id}/movies/results`} ><h3 className='sub-option' >Matched Movies</h3></Link>
          </div>
          
          <Link to={`/connection/${id}/activities`}>
            <div className={selected('activities')}>
              <img src={activities} alt='movies' className='menu-icon'/>
              <h1 id='activities'> Activities</h1>
            </div>
          </Link>
          <div className={open('activities')}>
            <Link to={`/connection/${id}/activities`}> <h3 className='sub-option'> Swipe Activities</h3></Link>
            <Link to={`/connection/${id}/activities/results`}><h3 className='sub-option' >Matched Activities</h3></Link>
          </div>
        </div>
      


        <Link to={`/connection/${id}/locations`}>
          <div className={selected('locations')}>
            <img src={locations} alt='movies' className='menu-icon'/>
            <h1 id='locations'> Locations </h1>
          </div>
        </Link>
        

        <Link to={`/connection/${id}/randomiser`}>
          <div className={selected('random')}>
            <img src={random} alt='movies' className='menu-icon'/>
            <h1 id='random'> Randomiser </h1>
          </div>
        </Link>

  
        <Link to={`/connection/${id}/notes/inbox`}>
          <div className={selected('notes')}>
            <img src={notes} alt='notes' className='menu-icon'/>
            <h1 id='notes'> Notes </h1>
          </div>
        </Link>
        <div className={open('notes')}>
          <Link to={`/connection/${id}/notes/inbox`}><h3 className='sub-option'>Inbox</h3></Link>
          <Link to={`/connection/${id}/notes/outbox`}><h3 className='sub-option'>Outbox</h3></Link>
        </div>
      
        <Link to={`/connection/${id}/wishlist`}>
          <div className={selected('wishlist')}>
            <img src={wishlist} alt='movies' className='menu-icon'/>
            <h1 id='wishlist'> Wishlist </h1>
          </div>
        </Link>

        <Link to={`/connection/${id}/events`}>
          <div className={selected('calendar')}>
            <img src={calender} alt='movies' className='menu-icon'/>
            <h1 id='calendar'> Calendar </h1>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default withRouter(MenuCon)