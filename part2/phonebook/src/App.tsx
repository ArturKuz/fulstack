import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import type { Person } from './models'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  const filteredPersons: Person[] = persons.filter(person =>
    person?.name?.toLowerCase().includes(filterTerm.toLowerCase())
  )
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTerm(event.target.value)
  }

  const addContact = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (checkIfContactExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    savePerson({ name: newName, number: newNumber })
  }

  const checkIfContactExists = (name: string) => {    
    return persons.some(person => person?.name === name)
  }

  const savePerson = ({ name, number }: Omit<Person, 'id'>) => {
    const personObject = {
      name: name,
      number: number,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3003/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(persons.concat(response.data))
      })
  }

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterTerm={filterTerm}
        handleFilterChange={handleFilterChange}
      /> 
      <h3>Add Contact</h3>
      <PersonForm 
        newName={newName}
        addContact={addContact}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App