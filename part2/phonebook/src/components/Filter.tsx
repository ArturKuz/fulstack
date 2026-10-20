interface FilterProps {
  filterTerm: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({ filterTerm: searchTerm, handleFilterChange: handleSearchChange }: FilterProps) => {
  return (
    <>
      filter names <input value={searchTerm} onChange={handleSearchChange} />
    </>
  )
}

export default Filter