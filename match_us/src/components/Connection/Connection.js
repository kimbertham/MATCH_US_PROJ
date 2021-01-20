import React from 'react' 
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import { getUserId } from '../../Lib/auth'

import Menu from '../Menu/Menu'
import ConOverview from './ConOverview'
import Events from '../Events/Events'
import Movies from '../Movies/Movies'
import ActivitiesList from '../Activites/ActivitesList'
import Activities from '../Activites/Activites'
import Food from '../FoodMatch/Food'


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

    if (!connection) return null
    return (
      <>
        <div className='fp flex'>
          <Menu connection={connection}/>
          

          <div className='main'>
            <Switch>

              <Route path='/connection/:id/food/' render={() => 
                <Food 
                  connection={connection}/> }/>

              <Route path='/connection/:id/movies/' render={() => 
                <Movies 
                  connection={connection}
                  section='movies'/> }/>
                
              <Route path='/connection/:id/overview' render={() => 
                <ConOverview connection={connection}/> }/>
          
              <Route path='/connection/:id/events' render={() => 
                <Events 
                  user={connection.user}
                  connection={connection}/> }/>

              <Route path='/connection/:id/movies' render={() => 
                <Movies connection={connection}/> }/>

              <Route path='/connection/:id/food' render={() => 
                <Food connection={connection}/> }/>
                

              <Route path='/connection/:id/activities' render={() => 
                <ActivitiesList connection={connection}/> }/>
              <Route path='/connection/:id/:activity' render={() => 
                <Activities connection={connection}/> }/>
                

            </Switch>
          </div>
        </div>
  
      </>
    )
  }
}
export default Connection