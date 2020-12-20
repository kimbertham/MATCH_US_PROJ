import React from 'react'

import MenuUser from './MenuUser'
import MenuCon from './MenuCon'

class Menu extends React.Component {
state = { colour: '#FF0000' }

setColour = (colour) => {
  this.setState({ colour })
}

render(){
  const { user, setCon, connections, connection } = this.props
  const { colour } = this.state
  return (

    <div className='menu-cont'>
      <div className='menu fh' style={{ background: colour }}>
      

        {connections ?

          <MenuUser 
            user={user}
            setCon={setCon}
            connections={connections}
            setColour={this.setColour}/> 
          :

          <MenuCon
            connection={connection}
            setColour={this.setColour}/>
        }

      </div>
    </div>
  )
}
}

export default Menu