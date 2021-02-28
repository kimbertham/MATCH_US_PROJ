import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { headers } from '../../Lib/auth'
import SendNote from './SendNote'
import NoteCard from './NoteCard'
import NotesModal from './NotesModal'

class Notes extends React.Component {
  state = { 
    notes: '',
    send: false,
    enlarge: false
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

  sendNote = () => {
    this.setState({ send: !this.state.send })
  }

  deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}/none/`)
    this.getNotes()
  }

  readNote = async (e) => {
    await axios.patch(`/api/notes/${e.currentTarget.id}/none/`,null, headers())
    this.getNotes()
  }

  enlarge = (n) => {
    this.setState({ enlarge: n  })
  }

  render(){
    const { notes, send, enlarge } = this.state
    const { connection, match } = this.props
    
    if (!notes) return null
    return (
      <div className='swipeview center'>

        {enlarge ? <NotesModal note={enlarge} enlarge={this.enlarge}/>  : null }
        

        {send ? 
          <SendNote 
            connection={connection} 
            sendNote={this.sendNote} /> : null}

        {match.params.box === 'inbox' ? 
          <h1 className='r-title'>{connection.partner.first_name}&apos;s Love Notes to {connection.user.first_name}</h1> :
          <h1 className='r-title'> {connection.user.first_name}&apos;s Love Notes to {connection.partner.first_name} </h1>}

        <button className='button' onClick={this.sendNote}>New Love Note</button>

        <div className='notes-cont'>
          {notes.map(n=>{
            return (
              <div className='n-cont' key={n.id}  id={n.id} onClick={e=>{
                n.read ? this.enlarge(n) : this.readNote(e)
              }}>
                <NoteCard n={n}  
                  connection={connection} 
                  deleteNote={this.deleteNote} />
              </div>
            )
          })}
        </div>
      </div>

    )
  }
}

export default withRouter(Notes)