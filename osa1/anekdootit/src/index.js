import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: [0, 0, 0, 0, 0, 0]
        }
    }

    // randomly chooses the next anecdote from the list
    pickAnecdote = () => {
        const number = Math.floor(Math.random() * (anecdotes.length))
        this.setState({
            selected: number
        })
    }

    // allows you to vote for the next anecdote
    voteAnecdote = () => {
        const kopio = [...this.state.pisteet]
        kopio[this.state.selected] += 1
        this.setState({
            pisteet: kopio
        })
    }

    render() {
            return (
                <div>
                    <Display selected={this.state.selected} pisteet={this.state.pisteet} />
                    <Button handleClick={this.voteAnecdote} text="vote"/>
                    <Button handleClick={this.pickAnecdote} text="next anecdote"/>
                    <Statistic  pisteet={this.state.pisteet}/>
                </div>
            )
        }
}
// displays the anecdote and its votes
const Display = ({selected, pisteet}) => {
    return (
        <div>
            <div>{anecdotes[selected]}</div>
            <div>has {pisteet[selected]} votes</div>
        </div>
    )
}
// used for vote and next anecdote buttons
const Button = ({handleClick, text}) => {
    return (   
        <button onClick={handleClick}>{text}</button>
    )
}
// used for statistic on which anecdote has most votes
const Statistic = ({pisteet}) => {

    const eniten = pisteet.indexOf(Math.max(...pisteet));
    const maara = Math.max(...pisteet);
    console.log(maara)
    if (maara > 0) {
        return (
            <div>
                <h2>anecdote with most votes:</h2>
                <div>{anecdotes[eniten]}</div>
                <div>has {maara} votes</div>
            </div>
        )
    }
    return (
        <div>
            <h2>anecdote with most votes:</h2>
            <div>
                there are no votes yet  
            </div>
        </div>
    )
    

}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));;
