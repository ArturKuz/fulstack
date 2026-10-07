interface PartProps {
  part: string,
  exercises: number
}

interface HeaderProps {
  course: string
}

interface TotalProps {
  exercises: number[]
}


const Header = (props: HeaderProps) => (
  <h1>{props.course}</h1>
)

const Part = (props: PartProps) =>  (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = (props: { parts: PartProps[] }) => (
  <>
    {props.parts.map((item: PartProps) => (
      <Part part={item.part} exercises={item.exercises} />
    ))}
  </>
)

const Total = (props: TotalProps) =>  (
  <p>Number of exercises {props.exercises.reduce((sum, current) => sum + current, 0)}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    { part: part1, exercises: exercises1 },
    { part: part2, exercises: exercises2 },
    { part: part3, exercises: exercises3 }
  ] 

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={parts.map((part) => part.exercises)} />
    </div>
  )
}

export default App
