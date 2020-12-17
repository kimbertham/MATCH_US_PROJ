import React from 'react' 
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import { getUserId } from '../../Lib/auth'

import Menu from '../Menu/Menu'
import ConOverview from './ConOverview'
import Events from '../Events/Events'
import Movies from '../Movies/Movies'
import MovieSwipe from '../Movies/MovieSwipe'
import Food from '../Food/Food'

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
        <div className='flex'>

          <Menu connection={connection}/>
  
          <div className='sh sw main'>
            <Switch>
              <Route path='/connection/:id/overview' render={() => 
                <ConOverview connection={connection}/> }/>
          
              <Route path='/connection/:id/events' render={() => 
                <Events 
                  user={connection.user}
                  connection={connection}/> }/>


              <Route path='/connection/:id/movies' render={() => 
                <Movies connection={connection}/> }/>
            
              <Route path='/connection/:id/movieswipe' render={() => 
                <MovieSwipe connection={connection}/> }/>

              <Route path='/connection/:id/food' render={() => 
                <Food connection={connection}/> }/>
            </Switch>
          </div>
        </div>
      </>
    )
  }
}
export default Connection