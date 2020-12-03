import React from 'react'

import MenuUser from './MenuUser'
import MenuCon from './MenuCon'

class Menu extends React.Component {


  render(){

    const { user, setCon, connections, connection } = this.props

    return (
      <div className='menu fh'>

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
    )
  }
}

export default Menu