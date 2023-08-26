import { Link } from 'react-router-dom';
import { PATHS } from '../lib/constants';
import logo from '/logo.png';

const Header = () => {
  return (
    <header className='bg-gray-700 text-white shadow-lg'>
      <div className='container mx-auto px-4 py-4 flex items-center '>
        <Link to={PATHS.home}>
          <img className='rounded-full' src={logo} width={100} height={100} />
        </Link>
        <h1 className='text-2xl text-gray-100 font-bold p-4'>
          Crypto Pair Detective
        </h1>
      </div>
    </header>
  );
};

export default Header;
