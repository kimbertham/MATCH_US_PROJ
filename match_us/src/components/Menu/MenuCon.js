import React from 'react'
import MenuProfile from './MenuProfile'
import { Link } from 'react-router-dom'

class MenuCon extends  React.Component  {
  state ={
    section: {
      movies: 'display-none'
    }
  }

  toggleSection =(e) => {
    const change =  this.state.section[e.target.id] === 'display-none' ?  'display-block' : 'display-none' 
    const section = { ...this.state.section, [e.target.id]: change }
    this.setState({ section })
  }


  render(){
    const { section } = this.state
    const { connection } = this.props
    const { id } = connection 
    return (
      <>

        <MenuProfile
          user ={connection.partner}/>    

        <Link to={`/connection/${id}/overview`}><h1>Overview</h1></Link>
        <Link to={`/connection/${id}/food/`}><h1>Food</h1></Link>
        <Link to={`/connection/${id}/movies`}>
          <h1> Movies <span id='movies' onClick={this.toggleSection}> &gt;</span></h1> 
        </Link>
        <div className={section.movies}>
          <Link to={`/connection/${id}/movies`}><h3>Matched Movies</h3></Link>
          <Link to={`/connection/${id}/movieswipe`}><h3>Swipe Movies</h3></Link>
        </div>
        <Link to={`/connection/${id}/activities`}> <h1>Activities</h1></Link>
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