import React from 'react'
import axios from 'axios'

import MenuUser from './MenuUser'

class Menu extends React.Component {
  state ={
    connections: null,
    requests: null
  }

connections = async () => {
  const user = this.props.user.id
  const c = await axios.get(`/api/connections/${user}/`)
  c.data.map(c => c.participants = c.participants.find(u => u.id !== user))
  this.setState({ connections: c.data })
}

requests = async () => {
  const r = axios.get(`/api/requests/${this.props.user.id}/`)
  this.setState({ requests: r.data })
}

async componentDidMount() {
  this.connections()
}

render(){

  const { user, setCon } = this.props
  const { connections } = this.state
  // console.log(connections)

  if (!connections) return null
  return (
    <div className='menu fh'>

      <MenuUser user={user}/>

      <div className='m-connections'>
        <h1>My Connections</h1>
        {connections.map(c => {
          return <div onClick={() => {
            setCon(c.id)
          }} className='menu-c' key={c.id}>
            <img src={c.participants.profile_image} className='c-img'/>
            {c.participants.first_name} {c.participants.last_name}
          </div>
        })}
      </div>

    </div>
  )
}
}

export default Menu