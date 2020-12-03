import React from 'react'
import { Link } from 'react-router-dom'
import MenuProfile from './MenuProfile'

const MenuUser = ({ user, connections }) => {

  return (
    <>

      <MenuProfile 
        user={user}/>


      <div className='m-connections'>
        <h1>My Connections</h1>
        {connections.map(c => {
          return <Link  key={c.id} to={`/connection/${c.id}`}>  
            <div className='menu-c' id={c.id}>
              <img src={c.participants.profile_image} className='c-img'/>
              {c.participants.first_name} {c.participants.last_name}
            </div>
          </Link>
        })}
      </div>
    </>
  )
}

export default MenuUser