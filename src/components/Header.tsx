import logo from '/images.jpeg';

const Header = () => {
  return (
    <header className='bg-black text-white shadow-md'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='h-20 w-20 flex items-center justify-center'>
            <img className='rounded-2xl' src={logo} alt='logo' />
            <span className='text-lg font-semibold'></span>
          </div>
        </div>

        <h1 className='text-2xl font-bold'>Ultimate Crypto Scanner</h1>
      </div>
    </header>
  );
};

export default Header;
