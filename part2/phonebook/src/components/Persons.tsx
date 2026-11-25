import type { Person } from "../models";

interface PersonsProps {
  persons: Person[];
  removePerson: (id: number) => void;
}

const Persons = ({ persons, removePerson }: PersonsProps ) => {
  return (
    <table>
      <tbody>
        {persons.map(person => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => removePerson(person.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Persons 