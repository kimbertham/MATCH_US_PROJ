/* eslint-disable no-unused-vars */
import React from 'react'

import MenuUser from './MenuUser'
import MenuCon from './MenuCon'
import { withRouter } from 'react-router-dom'

class Menu extends React.Component {

  render(){
    const { user, setCon, connections, connection, getCons } = this.props

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
              connection={connection}/>
          }
        </div>


      </div>
    )
  }
}

export default withRouter(Menu)