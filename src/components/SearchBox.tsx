interface SearchBoxProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
    />
  );
};

export default SearchBox;
