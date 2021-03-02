import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logout from '../../styles/assets/menu-icons/logout.jpg'


import Search from './Search'

const MenuUser = ({ user, connections,history, getCons }) => {

  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/login')
    window.location.reload()
  }

  return (
    <>
      <div className='m-profile'>
        <img src={user.profile_image}  className='m-img-large' alt='profile-img'/>
        <h3> {user.first_name} {user.last_name}</h3>
        <p>@{user.username}</p>
      </div>

      <Search getCons={getCons} connections={connections}/>
      
      <div className='m-con'>
        <h1>My Connections</h1>
        {connections.map(c => {
          if (!c.request) { 
            return <Link  key={c.id} to={`/connection/${c.id}/overview`}>  
              <div className='m-option-h' id={c.id}>
                <img alt='profile-img' className='m-img' 
                  src={c.participants.profile_image} />
                <h1>{c.participants.first_name} {c.participants.last_name}</h1>
              </div>
            </Link>
          }
        })}
      </div>

      <img alt='profile-img' className='logout-icon' src={logout} onClick={handleLogout} />
    </>
  )
}

export default withRouter(MenuUser)