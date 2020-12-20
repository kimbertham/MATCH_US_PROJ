import React from 'react'
import { Link } from 'react-router-dom'
import MenuProfile from './MenuProfile'

const MenuUser = ({ user, connections }) => {

  return (
    <div className='m-user'>

      <MenuProfile 
        user={user}/>

      <div className='m-connections'>
        <h1>My Connections</h1>
        {connections.map(c => {
          return <Link  key={c.id} to={`/connection/${c.id}/overview`}>  
            <div className='menu-c' id={c.id}>
              <img alt='profile-img' className='con-img' 
                src={c.participants.profile_image} />
              {c.participants.first_name} {c.participants.last_name}
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}

export default MenuUser