import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
    </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const pointsArray = [0,0,0,0,0,0,0,0]

  const [points, setPoints] = useState(pointsArray)

  const[mostPopular, setPopular] = useState(0)

  const getRandom = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const getAnecdote = () => {
    setSelected(getRandom)
  }

  const vote = () => {
    const copy = [...points]
      copy[selected] += 1
      setPoints(copy)
      console.log(points)
      console.log(mostPopular)
        if (copy[selected] > copy[mostPopular]) {
          setPopular(selected)
        }
      
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br />
      has {points[selected]} votes <br />
      <Button handleClick={getAnecdote} text='Next anaconda' />
      <Button handleClick={vote} text='Vote' />
      <h2>Anecdote with the most votes</h2>
      {anecdotes[mostPopular]}
    </div>
  )
}

export default App
