import React from 'react' 
import axios from 'axios'
import { Switch, Route, withRouter } from 'react-router-dom'
import { getUserId } from '../../Lib/auth'

import Menu from '../Menu/Menu'
import ConOverview from './ConOverview'
import Events from '../Events/Events'
import Movies from '../MatchView/Movies/Movies'
import ActivitiesList from '../MatchView/Activites/ActivitesList'
import Activities from '../MatchView/Activites/Activites'
import Food from '../MatchView/FoodMatch/Food'
import Results from '../MatchView/Results'
import Randomiser from '../Randomiser/Randomiser'
import Notes from '../Notes/Notes'
import Wishlist from '../Wishlist/Wishlist'
import Locations from '../Locations/Locations'

const userId = getUserId()

class Connection extends React.Component {
  state = {
    modal: true,
    connection: null,
    user: {}
  }

  async componentDidMount() {
    this.getConnection()
  }

  getConnection = async () => {
    const c = await axios.get(`/api/connection-full/${this.props.match.params.id}/`)
    c.data['user'] = c.data.participants.find(u => u.id === userId )
    c.data['partner'] =  c.data.participants.find(u => u.id !== userId )
    delete c.data['participants']
    this.setState({ connection: c.data })
  }

  render(){
    const { connection } = this.state
    const { user } = this.props
    if (!connection) return null
    return (

      <div className='flex'>

        <Menu connection={connection} user={user}/>

        <div className='main'>
          <Switch>

            <Route path='/connection/:id/overview' render={() => 
              <ConOverview connection={connection}/> }/>

            <Route path='/connection/:id/:section/results' render={() => 
              <Results connection={connection}/> }/>
            <Route path='/connection/:id/food/' render={() => 
              <Food 
                connection={connection}/> }/>
            <Route path='/connection/:id/movies' render={() => 
              <Movies connection={connection}/> }/>
            <Route path='/connection/:id/activities' render={() => 
              <ActivitiesList connection={connection}/> }/>
            <Route path='/connection/:id/activity/:activity' render={() => 
              <Activities connection={connection}/> }/>

            <Route path='/connection/:id/randomiser' render={() => 
              <Randomiser connection={connection}/> }/>
              
            <Route path='/connection/:id/notes/:box' render={() => 
              <Notes connection={connection}/> }/>
                
            <Route path='/connection/:id/events' render={() => 
              <Events user={connection.user} connection={connection}/> }/>
              
            <Route path='/connection/:id/wishlist' render={() => 
              <Wishlist name={connection.partner.first_name} id={connection.partner.id}/> }/>

            <Route path='/connection/:id/locations' render={() => 
              <Locations connection={connection}/> }/>
                
          </Switch>
        </div>
      </div>
    )
  }
}
export default withRouter(Connection)