import React from 'react'

import MenuUser from './MenuUser'
import MenuCon from './MenuCon'

class Menu extends React.Component {


  render(){

    const { user, setCon, connections, connection } = this.props

    return (
      <div className='fh menu-cont'>
        <div className='menu'>

          {connections ?

            <MenuUser 
              user={user}
              connections={connections}
              setCon={setCon}/> 
            :

            <MenuCon
              connection={connection}/>
          }
        </div>
      </div>
    )
  }
}

export default Menu