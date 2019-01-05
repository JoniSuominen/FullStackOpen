import React from 'react'

const NoteForm = ({addNote, newNote, handleNoteChange}) => (
  <div>
    <h2>Luo uusi muistiinpano</h2>

    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button>tallenna</button>
    </form>
  </div>
)
export default NoteForm

