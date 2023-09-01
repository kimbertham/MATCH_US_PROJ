import React from 'react'
import axios from 'axios'
import { Switch, BrowserRouter,Route } from 'react-router-dom'
import { getUserId } from './Lib/auth'

import Auth from './components/Auth/Auth'
import Home from './components/Home.js'
import Connection from './components/Connection/Connection'
// import Test from './components/Test'

const userId = getUserId()

class App extends React.Component {
  state = {
    user: null,
    connections: null
  }

  async componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    const res = await axios.get(`/api/profile/${userId}/`)
    this.setState({ user: res.data })
  }

  render() {
    const { user, connections } = this.state
    return (
      <>

        <BrowserRouter >
          <Switch>

            <Route path='/login' component={Auth}/>

            <Route path='/home' render={() => 
              <Home 
                user={user} 
                connections={connections} 
                getCons={this.getCons} 
                getUser={this.getUser}/> }/>

            <Route path='/connection/:id' render={() => 
              <Connection 
                user={user}
                getCons={this.getCons}/> }/>
                
          </Switch>
        </BrowserRouter>
      </>

    )
  }
}

export default App
