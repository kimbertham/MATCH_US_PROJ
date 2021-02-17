/* eslint-disable no-unused-vars */
import React from 'react'
import MovieDetails from '../Movies/MovieDetails'
import FoodDetails from '../FoodMatch/FoodDetails'
import NewEvent from '../Events/NewEvent'

class Details extends React.Component {
state= {
  data: false
}

setData = (e) => {
  this.setState({ data: e })
}

closeModal = () => {
  this.setState({ data: false })
}
render(){
  const { data } = this.state
  const { getDetail, section, r, connection } = this.props

  return (
    <>
      {data ?  
        <div className='modal' onClick={this.closeModal}>
          <div className='m-pop' onClick={e=>{
            e.stopPropagation()
          }}> <NewEvent data={data} connection={connection}/> 
          </div>
        </div>
        : 
        <div onClick={getDetail} className='details modal column'>
          {section === 'movies' ?
            <MovieDetails r={r} setData={this.setData}/>
            : 
            <FoodDetails r={r} setData={this.setData}/>}
        </div>}
    </>
  )
}
}
export default Details