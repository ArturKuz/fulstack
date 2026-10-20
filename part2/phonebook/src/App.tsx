import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import type { Person } from './models'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [FilterTerm, setFilterTerm] = useState('')

  const filteredPersons: Person[] = persons.filter(person =>
    person.name.toLowerCase().includes(FilterTerm.toLowerCase())
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
    return persons.some(person => person.name === name)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterTerm={FilterTerm}
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