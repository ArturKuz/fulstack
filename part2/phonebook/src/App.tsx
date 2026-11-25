import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import type { Person } from './models'
import personsService from './services/persons'

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
    
    const existingPerson: Person | undefined = checkIfContactExists(newName)

    if (existingPerson) {
      askToUpdatePerson(existingPerson)
      return
    }

    savePerson({ name: newName, number: newNumber })
  }

  const askToUpdatePerson = (existingPerson: Person) => {
    const confirmResult = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    if (confirmResult) {
      const updatedPerson = { ...existingPerson, number: newNumber }
      updatePerson(existingPerson.id, updatedPerson)
    }
  }

  const checkIfContactExists = (name: string): Person | undefined => {    
    return persons.find(person => person.name === name)
  }

  const updatePerson = (id: number, updatedPerson: Omit<Person, 'id'>) => {
    personsService
      .update(id, updatedPerson)
      .then((response: Person): void => {
        setPersons(persons.map(person => person.id !== id ? person : response))
        resetForm()
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }

  const createPerson = (personObject: Omit<Person, 'id'>) => {
    personsService
      .create(personObject)
      .then((response: Person): void => {
        setPersons(persons.concat(response))
        resetForm()
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const savePerson = ({ name, number }: Omit<Person, 'id'>) => {
    const personObject: Omit<Person, 'id'> = {
      name: name,
      number: number,
    }

    createPerson(personObject)
  }

  const removePerson = (id: number) => {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }

  const hook = () => {
    personsService
      .getAll()
      .then((response: Person[]): void => {
        setPersons(persons.concat(response))
      })
      .catch((error: Error) => {
        console.error(error)
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
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App