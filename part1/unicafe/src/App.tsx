import { useState } from 'react'

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

interface StatisticLineProps {
  text: string;
  value: number | string;
}

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
  all: number;
  average: number;
  positive: number;
}

const StatisticLine = (props: StatisticLineProps) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props: ButtonProps) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }: StatisticsProps) => {
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all: number = good + neutral + bad;
  const average: number = (good - bad) / all;
  const positive: number = (good / all) * 100;

  const handleGoodClick: () => void = () => setGood(good + 1);
  const handleNeutralClick: () => void = () => setNeutral(neutral + 1);
  const handleBadClick: () => void = () => setBad(bad + 1);

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </>
  )
}

export default App