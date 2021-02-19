import React from 'react'
import axios from 'axios'
import ListCard from './ListCard'
import MatchModal from './MatchModal'
import { headers } from '../../Lib/auth'
import view from '../../styles/assets/swipe-buttons/view-icon.jpg'

class List extends React.Component {

  state = {
    modal: false,
    error: '',
    view: false
  }

  getDetail = async (e) => {
    if (this.state.detail) {
      this.setState({ detail: null })
    } else {
      const r = (await axios.get(`/api/${this.props.section}/${e.target.id}/`)).data
      this.setState({ detail: r })
    }
  }

  like = async (d, i) => {
    try {
      this.props.results[i].like = true
      const data  = this.props.swipeData(d,i)
      await  axios.post(`/api/${this.props.section}/`, data, headers())
      this.setState({ modal: true, error: 'Added to Matches!' })
    } catch (err) {
      err.response.status === 422 ? 
        this.setState({ modal: true, error: 'Already In Matches!' }) 
        :
        this.setState({ modal: true, errors: 'Something went wrong, try again later!' })
    }
  }

  modal = () => {
    this.setState({ modal: false })
  }



  render() {
    const { results, section, changeView } = this.props
    return (

      <>
        <img src={view} className='list-icon right' alt='list-view' onClick={changeView}/>
  
        <div className='swipeview'>
          {this.state.modal ? 
            <MatchModal
              error={this.state.error}
              modal={this.modal} /> : null}

          <div className='list-cont scroll'>
  
            <h1 className='title'> Results</h1>

            {results.map((r,i) => ( 
              <ListCard r={r} i={i}
                key={i}
                section={section}
                like={this.like}/> 
              
            ))}
          </div>
        </div>
      </>
    )
  }
}
export default List