import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const modalContent = useSelector((state: RootState) => state.modal.children);

  return (
    <>
      <Header />
      <div className='container mx-auto px-4'>
        <Outlet />
      </div>
      <Modal isOpen={isOpen}>{modalContent}</Modal>
      <ToastContainer />
    </>
  );
};

export default App;
