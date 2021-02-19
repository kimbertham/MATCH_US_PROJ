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
    console.log(e)
    await axios.patch(`/api/notes/${e.currentTarget.id}/none/`,null, headers())
    this.getNotes()
  }

  enlarge = (n) => {
    console.log('called')
    this.setState({ enlarge: n  })
  }

  render(){
    const { notes, send, enlarge } = this.state
    const { connection, match } = this.props
    if (!notes) return null

    return (
      <div className='fh center'>

        {enlarge ? <NotesModal note={enlarge} enlarge={this.enlarge}/>  : null }
        

        {send ? 
          <SendNote 
            connection={connection} 
            sendNote={this.sendNote} /> 
          : null}

        {match.params.box === 'inbox' ? 
          <h1 className='title'>{connection.partner.first_name}&apos;s Love Notes to {connection.user.first_name}</h1> :
          <h1 className='title'> {connection.user.first_name}&apos;s Love Notes to {connection.partner.first_name} </h1>}

        <button className='button' onClick={this.sendNote}>New Love Note</button>

        <div className='notes-cont scroll relative wrap center'>
          {notes.map(n=>{
            return <NoteCard n={n}  key={n.id} 
              connection={connection} 
              enlarge={this.enlarge}
              readNote={this.readNote} 
              deleteNote={this.deleteNote} />
          })}
        </div>
      </div>

    )
  }
}

export default withRouter(Notes)