/* eslint-disable no-unused-vars */
import React from 'react' 
import axios from 'axios'
import { Link } from 'react-router-dom'
import { headers } from '../Lib/auth'

import Events from './Events/Events'
import OverviewEvents from './Events/OverviewEvents'
import NoteCard from './Notes/NoteCard'

import food from '../styles/assets/menu-icons/food.jpg'
import activities from '../styles/assets/menu-icons/activities.jpg'
import movies from '../styles/assets/menu-icons/movies.jpg'
import wishlist from '../styles/assets/menu-icons/wishlist.jpg'
import settings from '../styles/assets/menu-icons/settings.jpg'
import background from '../styles/assets/background2.jpg'

class  Overview extends React.Component {
  state= {
    data: false
  }
  
  async componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const r = await axios.post(`/api/profile/${this.props.user.id}/`, headers())
    this.setState({ data: r.data })
  }

  render(){
    
    const { user, connections } = this.props
    const { data } = this.state
    if (!data) return null

    return (
      <div className='overview' style={{ backgroundImage: `url(${background})` }}>
          
        <div className='o-side'>
          <h1 className='o-title'>
            {user.first_name}&apos;s Overview
          </h1>
          <div className='o-calendar'>
            <Events
              connections={connections}
              user={user}/>
          </div>
          <div className='o-notes'>
            <h3>Recent Notes</h3>
            <div className='flex'>
              {data.note.map(n=>{
                return  <NoteCard key={n.id} n={n}/>
              })}
            </div>
          </div> 
        </div>
          
        <div className='o-main'>

          <div>
            <h3>My Recents Swipes</h3>
            <div className='o-container'>
              {data.movie.map(m => {
                return <div key={m.id} className='o-recent' >
                  <img src={movies} alt='movies'/>
                  <p>{m.name}</p>
                </div>
              })}
              {data.food.map(m => {
                return <div key={m.id} className='o-recent'>
                  <img src={food} alt='food'/>
                  <p>{m.name}</p>
                </div>
              })}
              {data.activity.map(m => {
                return  <div key={m.id} className='o-recent'>
                  <img src={activities} alt='activities'/>
                  <p>{m.name}</p>
                </div>
              })}
            </div>
          </div>

          <div>
            <h3>Connection Requests</h3>
            <div className='o-container'>
            </div>
          </div>

          <div className='flex wrap'>
            <OverviewEvents events={data.events} req={data.req}/>
          </div>
  
          <Link to={'/home/wishlist'}>
            <div className='o-button'>
              <img src={wishlist} alt='food'/>
              <h3>My Wishlist</h3></div>
          </Link>

          <div className='o-button'>
            <img src={settings} alt='food'/>
            <h3>Settings</h3>
          </div>
    
        </div>
      </div> 
    )
  }
}

export default Overview