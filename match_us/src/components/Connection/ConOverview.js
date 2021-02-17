import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { headers } from '../../Lib/auth'

import Events from '../Events/Events'
import NoteCard from '../Notes/NoteCard'
import food from '../../styles/assets/menu-icons/food.jpg'
import activities from '../../styles/assets/menu-icons/activities.jpg'
import movies from '../../styles/assets/menu-icons/movies.jpg'

class ConOverview extends React.Component{
  state = {
    data: ''
  }

  async componentDidMount(){
    const { connection } = this.props
    const r =  (await axios.post(`/api/connection-full/${connection.id}/`,
      { partner: connection.partner.id }, 
      headers())).data
    this.setState({ data: r })
  }

  render () {
    const  { connection } = this.props
    const { data } = this.state

    if (!data) return null
    return (
      <div className='center fh'>
        <div className='flex'>

          <div className='event-cont'>
            <h1 className='o-border'>
              {connection.user.first_name} & {connection.partner.first_name}&apos;s Overview
            </h1>
            <Events 
              page='c'
              user={connection.user}
              connection={connection}/>
          </div>


          <div className='column'>
            <div className='upcoming-dates o-border'>
              <h2> Upcoming Date</h2>
              {data.events.map(e => {
                return <div key={e.id} className='o-date'>
                  <h3> {e.type} {e.title}</h3>
                  <p> {e.date} {e.time.slice(0,5)}</p>
                  <small> {e.location.split(',')[0]}</small>
                  <br/>
                  <small> - {e.notes}</small>
                </div>
              })}
            </div>

            <div className='upcoming-dates o-border'>
              <h2> Date Requests</h2>
              {data.req.map(e => {
                return <div key={e.id} className='o-req o-date'>
                  <h3> {e.type} {e.title}</h3>
                  <p> {e.date} {e.time.slice(0,5)}</p>
                  <small> {e.location.split(',')[0]}</small>
                  <br/>
                  <small> - {e.notes}</small>
                </div>
              })}
            </div>
          </div>
          
          <div className='o-border center column'>
            <h2> Notes</h2>
            {data.note.map(n => <NoteCard key={n.id} n={n} connection={connection}/>)}
          </div>
        </div>
    
        <div className='latest-matches o-border flex'>
          <h2> Latest Matches:</h2>
          <Link to={`/connection/${connection.id}/food/results`}>
            <div className='ov flex'>
              <img src={food} alt='food'/>
              <p> {data.food.name}</p>
            </div>
          </Link>
          <Link to={`/connection/${connection.id}/activities/results`}>
            <div className='ov flex'>
              <img src={activities} alt='acti'/>
              <p> {data.activity.name}</p>
            </div>
          </Link>
          <Link to={`/connection/${connection.id}/movies/results`}>
            <div className='ov flex'>
              <img src={movies} alt='movies'/>
              <p>{data.movie.name}</p>
            </div>
          </Link>
        </div>

      </div>

    )
  }
}

export default ConOverview