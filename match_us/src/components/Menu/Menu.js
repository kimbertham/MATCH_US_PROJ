import React from 'react'
import axios from 'axios'

import MenuUser from './MenuUser'

class Menu extends React.Component {
  state ={
    connections: null,
    relationship: null,
    requests: null
  }


getData = async () => {
  const user = this.props.user.id
  const r = await  axios.get(`/api/requests/${user}/`)
  const c = await axios.get(`/api/connections/${user}/`)
  c.data.map(c => c.participants = c.participants.find(u => u.id !== user))
  this.setState({ connections: c.data,requests: r.data })
}

async componentDidMount() {
  this.getData()
}


render(){

  const { connections } = this.state
  const { user, setCon } = this.props

  if (!connections) return null
  return (
    <div className='menu fh'>

      <MenuUser 
        user={user}
        connections={connections}
        setCon={setCon}/>  

    </div>
  )
}
}

export default Menu