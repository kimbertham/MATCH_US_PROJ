import React from 'react'
import { Link } from 'react-router-dom'
import movies from '../../styles/assets/menu-icons/movies.jpg'
import food from '../../styles/assets/menu-icons/food.jpg'
import activities from '../../styles/assets/menu-icons/activities.jpg'
import location from '../../styles/assets/menu-icons/location.jpg'
import random from '../../styles/assets/menu-icons/random.jpg'
import notes from '../../styles/assets/menu-icons/notes.jpg'
import wishlist from '../../styles/assets/menu-icons/wishlist.jpg'
import calender from '../../styles/assets/menu-icons/calender.jpg'
import overview from '../../styles/assets/menu-icons/overview.jpg'
// import arrow from '../../styles/assets/menu-icons/arrow.jpg'


class MenuCon extends  React.Component  {
  state = {
    section: ''
  }

toggleSection =(e) => {
  this.setState({ section: e.target.id })
}


render(){
  const { section } = this.state
  const { connection } = this.props
  const { id } = connection
  return (
    <div className='m-con'>


      <div className='m-profile center'>   
        <div className='center wrap'>
          <img src={connection.partner.profile_image} className='m-img' alt='profile-img'/>
          <img src={connection.partner.profile_image} className='m-img m-img-con' alt='profile-img'/>
        </div>
        <h1>{connection.partner.first_name} {connection.partner.last_name}</h1>
        <small>Connected since {connection.created_at.slice(0,4)}</small>
      </div>

      <div className='m-list'>

        <div className='m-option'>
          <img src={overview} alt='food' className='menu-icon'/>
          <Link to={`/connection/${id}/overview`}>
            <h1 id='overview' onClick={this.toggleSection}>Overview</h1>
          </Link>
        </div>

        <div>
          <Link to={`/connection/${id}/food/`}>
            <div className='m-option'>
              <img src={food} alt='food' className='menu-icon'/>
              <h1 id='food' onClick={this.toggleSection}> Food </h1>
            </div>
          </Link>
          <div className={section === 'food' ? 'm-open' : 'display-none'}>
            <Link to={`/connection/${id}/food`} ><h3 className='sub-option'>Swipe Food</h3></Link>
            <Link to={`/connection/${id}/food/results`} ><h3 className='sub-option' >Matched Food</h3></Link>
          </div>

          <Link to={`/connection/${id}/movies`}>
            <div className='m-option'>
              <img src={movies} alt='movies' className='menu-icon'/>
              <h1 id='movies' onClick={this.toggleSection}> Movies </h1>
            </div>
          </Link>
          <div className={section === 'movies' ? 'm-open' : 'display-none'} >
            <Link to={`/connection/${id}/movies`} ><h3 className='sub-option' >Swipe Movies</h3></Link>
            <Link to={`/connection/${id}/movies/results`} ><h3 className='sub-option' >Matched Movies</h3></Link>
          </div>
        
          <Link to={`/connection/${id}/activities`}> 
            <div className='m-option'>
              <img src={activities} alt='movies' className='menu-icon'/>
              <h1 id='activities' onClick={this.toggleSection}> Activities</h1>
            </div>
          </Link>
          <div className={section === 'activities' ? 'm-open' : 'display-none'}>
            <Link to={`/connection/${id}/activities`} ><h3 className='sub-option' >Swipe Activities</h3></Link>
            <Link to={`/connection/${id}/activities/results`} ><h3 className='sub-option' >Matched Activities</h3></Link>
          </div>
        </div>

        <Link to={`/connection/${id}/locations`}>
          <div className='m-option'>
            <img src={location} alt='movies' className='menu-icon'/>
            <h1 id='locations' onClick={this.toggleSection}> Locations </h1>
          </div>
        </Link>
        
        <Link to={`/connection/${id}/randomiser`}>
          <div className='m-option'>
            <img src={random} alt='movies' className='menu-icon'/>
            <h1 id='random' onClick={this.toggleSection}> Randomiser </h1>
          </div>
        </Link>

        <Link to={`/connection/${id}/notes/inbox`}>
          <div className='m-option'>
            <img src={notes} alt='notes' className='menu-icon'/>
            <h1 id='notes' onClick={this.toggleSection}> Notes </h1>
          </div>
        </Link>
        <div className={section === 'notes' ? 'm-open' : 'display-none'}>
          <Link to={`/connection/${id}/notes/inbox`}><h3 className='sub-option' >Inbox</h3></Link>
          <Link to={`/connection/${id}/notes/outbox`}><h3 className='sub-option' >Outbox</h3></Link>
        </div>
      
        <Link to={`/connection/${id}/wishlist`}>
          <div className='m-option'>
            <img src={wishlist} alt='movies' className='menu-icon'/>
            <h1 id='wishlist' onClick={this.toggleSection}> Wishlist </h1>
          </div>
        </Link>

        <div className='m-option'>
          <img src={calender} alt='movies' className='menu-icon'/>
          <Link to={`/connection/${id}/events`}><h1>Calender</h1></Link>
        </div>

      </div>
    </div>
  )
}
}

export default MenuCon