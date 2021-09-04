import ContainedTextInput from '../../components/TextInput/ContainedTextInput';

const SearchBar = () => {
  return (
    <ContainedTextInput
      placeholder="szukaj wszędzie"
      pill
      className="w-full sm:w-1/3 mx-4 sm:mx-8"
    />
  );
};

export default SearchBar;
