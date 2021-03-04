/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { headers } from '../../Lib/auth'
import Events from '../Events/Events'
import NoteCard from '../Notes/NoteCard'
import food from '../../styles/assets/menu-icons/food.jpg'
import activities from '../../styles/assets/menu-icons/activities.jpg'
import movies from '../../styles/assets/menu-icons/movies.jpg'
import OverviewEvents from '../Events/OverviewEvents'

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
  
      <div className='con-over flex'>
        
        <div className='o-side'>
          <h2 className='o-title'>{connection.user.first_name} & {connection.partner.first_name}&apos;s Overview </h2>

          <div className='o-calendar'>
            <Events
              user={connection.user}
              connection={connection}/>
          </div>
  
          <div className='o-notes'>
            <h3>Recent Notes</h3>
            <div className='flex'>
              {data.note.map(n => 
                <Link key={n.id} 
                  to={`/connection/${n.connection.id}/notes/inbox`}>
                  <NoteCard n={n} connection={connection}/>
                </Link>
              )}
            </div>
          </div>
        </div> 
        
        <div className='o-main'>
          <div className='o-border'>
            
            <div>
              <OverviewEvents events={data.events} req={data.req}/>
            </div>

            <div>
              <h2> Latest Matches:</h2>
              <div className='latest-matches'>
                <Link to={`/connection/${connection.id}/food/results`}>
                  <div className='ov'>
                    <img src={food} alt='food'/>
                    <p> {data.food.name}</p>
                  </div>
                </Link>
                <Link to={`/connection/${connection.id}/activities/results`}>
                  <div className='ov'>
                    <img src={activities} alt='acti'/>
                    <p> {data.activity.name}</p>
                  </div>
                </Link>
                <Link to={`/connection/${connection.id}/movies/results`}>
                  <div className='ov'>
                    <img src={movies} alt='movies'/>
                    <p>{data.movie.name}</p>
                  </div>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div> 
    )
  }
}

export default ConOverview