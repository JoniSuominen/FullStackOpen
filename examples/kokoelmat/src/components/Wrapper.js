import NoteForm from "./NoteForm";
import React from 'react'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formInput: ''
    }
  }

  onChange = (e) => {
    this.setState({ formInput: e.target.value})
  }

  render() {
    return (
    <NoteForm
      newNote={this.state.formInput}
      addNote={this.props.onSubmit}
      handleNoteChange={this.onChange}
      />
    )
  }
}

export default Wrapper