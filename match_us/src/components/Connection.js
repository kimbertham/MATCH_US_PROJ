import React from 'react' 
import axios from 'axios'

import Events from './Events/Events'

import { getUserId } from '../Lib/auth'
const userId = getUserId()

class Home extends React.Component {
  state = {
    modal: true,
    connection: null,
    user: {},
    partner: {}
  }

  async componentDidMount() {
    this.getConnection()
  }

  getConnection = async ( ) => {
    const id = this.props.match.params.id
    const c = await axios.get(`/api/connection-full/${id}/`)

    this.setState({ 
      connection: c.data, 
      partner: c.data.participants.find(u => u.id !== userId ),
      user: c.data.participants.find(u => u.id === userId ) 
    })
  }

  render(){

    const { connection, user, partner } = this.state

    if (!connection) return null
    return (

      <div className='flex'>

        
        <div className='main'>

          <h1>{user.first_name} & {partner.first_name}&apos;s Overview </h1>

          <Events 
            user={user}
            connection={connection}
            page='r'/>

        </div> 
      </div>
    )
  }
}
export default Home