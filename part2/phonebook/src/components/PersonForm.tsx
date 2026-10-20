interface AddContactProps {
  newName: string;
  addContact: (event: React.SubmitEvent<HTMLFormElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newNumber: string;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonForm = ({
  newName,
  addContact,
  handleNameChange,
  newNumber,
  handleNumberChange
}: AddContactProps) => {
  
  return (
    <form onSubmit={addContact}> 
      <table>
        <tbody>
          <tr> 
            <td>name:</td> 
            <td><input value={newName} onChange={handleNameChange} /></td>
          </tr>
          <tr>
            <td>number:</td>
            <td><input value={newNumber} onChange={handleNumberChange} /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm