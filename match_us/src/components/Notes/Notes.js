import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { headers } from '../../Lib/auth'
import SendNote from './SendNote'
import NoteCard from './NoteCard'

class Notes extends React.Component {
  state = { 
    notes: '',
    send: false
  }

  async componentDidMount(){
    this.getNotes()
  }

  componentDidUpdate(prevProps) {
    const box = this.props.match.params.box
    const boxId = prevProps.match.params.box
    boxId !== box ? this.getNotes() : null
  }

  getNotes = async () => {
    const { connection, match } = this.props
    const r = await axios.get(`/api/notes/${connection.id}/${match.params.box}/`, headers())
    this.setState({ notes: r.data })
  }

  sendNote= () => {
    this.setState({ send: !this.state.send })
  }

  deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}/none/`)
    this.getNotes
  }

  render(){
    const { notes, send } = this.state
    const { connection, match } = this.props
    if (!notes) return null
    return (
      <>

        {send ? <SendNote connection={connection} sendNote={this.sendNote} /> : null}

        <button onClick={this.sendNote}>New Love Note</button>
        {match.params.box === 'inbox' ? 
          <h1>{connection.partner.first_name}&apos;s Love Notes to {connection.user.first_name}</h1> :
          <h1> {connection.user.first_name}&apos;s Love Notes to {connection.partner.first_name} </h1>}

        <div className='flex wrap center'>
          {notes.map(n=>{
            return <NoteCard key={n.id} connection={connection} n={n} deleteNote={this.deleteNote} />
          })}
        </div>
      </>
    )
  }
}

export default withRouter(Notes)