/* eslint-disable no-unused-vars */
import React from 'react'

import MenuUser from './MenuUser'
import MenuCon from './MenuCon'
import { withRouter } from 'react-router-dom'

class Menu extends React.Component {

  render(){
    const { user, setCon, connections, connection } = this.props

    let colour 
    const pathname = this.props.location.pathname

    return (

      <div className='menu-cont relative'>
    
        <div>
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

export default withRouter(Menu)