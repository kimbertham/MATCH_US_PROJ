import React from 'react' 

const NotesModal = ({ note, enlarge }) => {

  return (

    <div className='modal' onClick={()=>{
      enlarge(null)
    }}>
      <div className='m-pop' id='n-pop'  style={{ backgroundColor: note.color }}>
        <h1> {note.notes}</h1>
        <p> {note.created_at}</p>
      </div>
    </div>
  )
}
export default NotesModal