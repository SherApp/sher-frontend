import Handwriting from '../Handwriting';
import SearchBar from '../../features/search/SearchBar';
import AccountMenu from '../../features/auth/AccountMenu';

const Header = () => {
  return (
    <header className="flex px-4 sm:px-6 py-4">
      <Handwriting component="h1" variant="h3">
        Sher
      </Handwriting>
      <SearchBar />
      <AccountMenu className="ml-auto flex items-center" />
    </header>
  );
};

export default Header;
