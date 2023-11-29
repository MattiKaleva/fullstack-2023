import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/PersonPrint'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNamber, setNewNamber] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [filterCondition, setFilterCondition] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [failureMessage, setFailureMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
    if(errorMessage) {
    return (
      <div className="success">
        {message}
      </div>
    )
    } else {
      return (
        <div className="failure">
          {message}
        </div>
      )
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName, number: newNamber}
    if(persons.some(p => p.name === newName)){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        axios.put(`http://localhost:3001/persons/${persons.find(person => person.name === newName).id}`, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.name !== nameObject.name ? person : response.data))
          setErrorMessage(`Person ${newName}'s number has been updated`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        })
        .catch(error => {
          setFailureMessage(`Infomation of ${newName} has already been removed from the server`)
          setTimeout(() => {
            setFailureMessage(null)
          }, 3000)
        })
      }
    } else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNamber('')
    setErrorMessage(`Person ${returnedPerson.name} has been added to the phonebook. Congratilations!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
    })
    }
  }

  const personToDelete = id => {
    if(window.confirm(`Do you really want to delete ${persons.find(person => person.id === id).name}??!??!?!??!!`)){
    personService
      .sayonara(id)
        .then(()=> {
          personService
          .getAll()
          .then(response => {
            setPersons(response)
          })
        })
        setErrorMessage(`Person ${persons.find(person => person.id === id).name} has been deleted forever`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
        
  }

  const personsToShow = showAll
      ? persons
      : persons.filter(person => person.name.match(filterCondition))
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNamber = (event) => {
    setNewNamber(event.target.value)
  }

  const handleCondition = (event) => {
    setFilterCondition(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Notification message={failureMessage} />
      <Filter filterCondition={filterCondition} handleCondition={handleCondition}/>
      <Form addName={addName} newName={newName} handleNewName={handleNewName} newNamber={newNamber} handleNewNamber={handleNewNamber} />
      <h2>Numbers</h2>
      <ul>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} deletePerson={() => personToDelete(person.id)}/>
        )}
        </ul>
    </div>
  )

}

export default App
