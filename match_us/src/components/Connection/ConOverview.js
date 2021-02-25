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
      <div className='container'>
        <div className='flex'>
          
          <div>
            <h1 className='o-border'>
              {connection.user.first_name} & {connection.partner.first_name}&apos;s Overview
            </h1>

            <div className='o-border'>
              <Link to={`/connection/${connection.id}/notes/inbox`}>
                <h2> Notes</h2>
                <div className='flex'>
                  {data.note.map(n => <NoteCard key={n.id} n={n} connection={connection}/>)}
                </div>
              </Link>
            </div>
 

            <div className='latest-matches o-border'>
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

          <div className='o-border'>
            <Events
              user={connection.user}
              connection={connection}/>
            <OverviewEvents events={data.events} req={data.req}/>
          </div>

        </div>
      </div>
    )
  }
}

export default ConOverview