import React from 'react' 
import Events from './Events/Events'

import axios from 'axios'

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
    const connection = this.props.match.params.id
    const partner = c.data.participants.find(x=>x.id !== userId )
    const user = c.data.participants.find(x=>x.id === userId )
    const c = await axios.get(`/api/connection-full/${connection}/`)
    this.setState({ connection: c.data, partner, user  })
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