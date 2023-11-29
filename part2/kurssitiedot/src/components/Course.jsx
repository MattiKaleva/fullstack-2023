const Course =({course}) => {
    return(
      <div>
        {course.map(course =>
        <div key={course.id}>
        <Header anme={course.name}/>
        <Content parts={course.parts}/>
          </div>
        )}
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <div>
        <ul>
          {parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
            <Total parts={parts}/>
        </ul>
      </div>
    )
  }
  
  const Header = ({anme}) => {
    return(
      <div>
        <h1>{anme}</h1>
      </div>
    )
  }
  
  const Part = ({part, exercises}) => {
    return (
      <div>
        <li>{part} {exercises}</li>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    let initialValue = 0
    const sum = parts.reduce(function(accumulator, curValue){
      return accumulator + curValue.exercises
    }, initialValue)
    return (
      <div>
        <li>
          Total of {sum} exercises
        </li>
      </div>
    )
  }

  export default Course