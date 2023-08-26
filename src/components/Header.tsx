import headerImg from '/headerImg.jpeg';

const Header = () => {
  return (
    <header className='bg-black text-white shadow-lg'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='h-20 w-20 flex items-center justify-center'>
            <img className='rounded-2xl' src={headerImg} alt='logo' />
          </div>
        </div>
        <h1 className='text-2xl text-gray-300 font-bold'>
          Crypto Pair Detective
        </h1>
      </div>
    </header>
  );
};

export default Header;
