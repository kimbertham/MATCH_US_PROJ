import React from 'react'

import MenuUser from './MenuUser'

class Menu extends React.Component {


  render(){

    const { user, setCon, connections } = this.props

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