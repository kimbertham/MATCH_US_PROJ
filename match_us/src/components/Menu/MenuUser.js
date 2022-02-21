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
  
  if (!user) return null
  return (
    <>
      <div className='m-profile'>
        <div className='img-wrap'>
          <div className='l-cont'>
            <div  className='m-img' style={{  
              backgroundImage: `url(${user.profile_image})` }}/>
          </div>
        </div>
        <h3> {user.first_name} {user.last_name}</h3>
        <p>@{user.username}</p>
      </div>

      <Search 
        getCons={getCons} 
        connections={connections}/>
      
      <div className='m-con'>
        <h1>My Connections</h1>
        {connections.length <= 1 && connections.map(c => {
          if (c.request === null) { 
            const friend = c.participants.filter(f => f.id !== user.id)[0]
            return <Link
              key={friend.id} to={`/connection/${c.id}/overview`}>  
              <div className='m-option-h' id={friend.id}>
                <div className='m-img-cont'>
                  <div  className='m-img' style={{  
                    backgroundImage: `url(${friend.profile_image})` }}/>
                </div>
                <h1>{friend.first_name} {friend.last_name}</h1>
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