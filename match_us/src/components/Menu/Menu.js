import React from 'react'

import MenuUser from './MenuUser'
import MenuCon from './MenuCon'
import { withRouter } from 'react-router-dom'

const Menu = ( { user, setCon, connections, connection, getCons }) => {

  return (
    <div className='m-cont'>
      <div>

        {connections ? 
          <MenuUser 
            user={user}
            setCon={setCon}
            getCons={getCons}
            connections={connections}/> 
          :
          <MenuCon
            getCons={getCons}
            user={user}
            connection={connection}/>
        }
          
      </div>
    </div>
  )
}

export default withRouter(Menu)