/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import MovieDetails from '../Movies/MovieDetails'
import FoodDetails from '../FoodMatch/FoodDetails'
import NewEvent from '../Events/NewEvent'

class Details extends React.Component {
state= {
  data: false
}

delMatch = async (e, id) =>{
  e.stopPropagation()
  await axios.post(`/api/match/${this.props.section}/${this.props.connection.id}/`, { id: id }, headers())
  this.props.getDetail()
  this.props.getMatches()
}

setData = (e, i) => {
  e.stopPropagation()
  this.setState({ data: i })
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
            <MovieDetails r={r} setData={this.setData} delMatch={this.delMatch}/>
            : 
            <FoodDetails r={r} setData={this.setData} delMatch={this.delMatch}/>}
        </div>}
    </>
  )
}
}
export default Details