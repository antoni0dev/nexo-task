import { Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';

import { closeModal } from '../features/modalSlice';
import { useDispatch } from 'react-redux';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: FC<Props> = ({ isOpen, children }) => {
  const dispatch = useDispatch();

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div
          className='absolute inset-0 bg-gray-500 opacity-75'
          onClick={() => dispatch(closeModal())}
        ></div>
        <div className='relative overflow-auto hover:scroll-auto  bg-white rounded-lg shadow-lg max-w-lg w-full h-[80vh]'>
          {children}
          <div className='bg-gray-100 p-6 flex justify-center'>
            <button
              onClick={() => dispatch(closeModal())}
              className='bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
