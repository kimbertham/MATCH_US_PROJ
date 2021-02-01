import React from 'react'
import MenuProfile from './MenuProfile'
import { Link } from 'react-router-dom'

class MenuCon extends  React.Component  {
  state = {
    section: ''
  }

toggleSection =(e) => {
  this.setState({ section: e.target.id })
}


render(){
  const { section } = this.state
  const { id } = this.props.connection

  return (
    <>

      <MenuProfile
        user ={this.props.connection.partner}/>    

      <Link to={`/connection/${id}/overview`}><h1>Overview</h1></Link>

      <div>
        <Link to={`/connection/${id}/food/`}><h1 id='food' onClick={this.toggleSection}> Food </h1></Link>
        <div className={section === 'food' ? null : 'display-none'}>
          <Link to={`/connection/${id}/food`}><h3>Swipe Food</h3></Link>
          <Link to={`/connection/${id}/food/results`}><h3>Matched Food</h3></Link>
        </div>
        <Link to={`/connection/${id}/movies`}><h1 id='movies' onClick={this.toggleSection}> Movies </h1></Link>
        <div className={section === 'movies' ? null : 'display-none'}>
          <Link to={`/connection/${id}/movies`}><h3>Swipe Movies</h3></Link>
          <Link to={`/connection/${id}/movies/results`}><h3>Matched Movies</h3></Link>
        </div>
        <Link to={`/connection/${id}/activities`}> <h1 id='activities' onClick={this.toggleSection}> Activities</h1></Link>
        <div className={section === 'activities' ? null : 'display-none'}>
          <Link to={`/connection/${id}/activities`}><h3>Swipe Activities</h3></Link>
          <Link to={`/connection/${id}/activities/results`}><h3>Matched Activities</h3></Link>
        </div>
      </div>

      <h1>Locations</h1>
      <h1>Randomiser</h1>
      <h1>Notes</h1>
      <h1>Wishlist</h1>
      <Link to={`/connection/${id}/events`}><h1>Calender</h1></Link>


    </>
  )
}
}

export default MenuCon