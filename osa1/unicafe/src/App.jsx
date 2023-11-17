import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
    </button>
)

const StatisticLine = ({text, value}) => {
  if (text==='Positive') {
    return(
      <tr>
        <td>{text}</td> 
       <td>{value} %</td>
     </tr>
    )
  }
  return(
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if(good+bad+neutral==0) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given
      </div>
    )
  }
  
  return(
  <div>
  <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good}/>
          <StatisticLine text='Neutral' value={neutral}/>
          <StatisticLine text='Bad' value={bad}/>
          <StatisticLine text='Good' value={good+bad+neutral}/>
          <StatisticLine text='Average' value={(good-bad)/(good+bad+neutral)}/>
          <StatisticLine text='Positive' value={(good/(good+bad+neutral))*100}/>
        </tbody>
      </table>
      
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = () => {
    setGood(good+1)
  }

  const neutralReview = () => {
    setNeutral(neutral+1)
  }

  const badReview = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h2> Give feedback </h2>
      <Button handleClick={goodReview} text='Good' />
      <Button handleClick={neutralReview} text='Neutral' />
      <Button handleClick={badReview} text='Bad' />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App