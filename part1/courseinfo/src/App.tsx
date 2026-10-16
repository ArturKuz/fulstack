interface PartProps {
  name: string,
  exercises: number
}

interface HeaderProps {
  course: string
}

interface TotalProps {
  exercises: number[]
}

interface Course {
  name: string,
  parts: PartProps[]
}

const App = () => {
  const course: Course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const Header = (props: HeaderProps) => (
    <h1>{props.course}</h1>
  )

  const Part = (props: PartProps) =>  (
    <p>
      {props.name} {props.exercises}
    </p>
  )

  const Content = (props: { parts: PartProps[] }) => (
    <>
      {props.parts.map((item: PartProps) => (
        <Part name={item.name} exercises={item.exercises} />
      ))}
    </>
  )

  const Total = (props: TotalProps) =>  (
    <p>Number of exercises {props.exercises.reduce((sum, current) => sum + current, 0)}</p>
  )

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </div>
  )
}

export default App
