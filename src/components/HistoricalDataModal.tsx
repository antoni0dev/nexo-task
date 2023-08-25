import { Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Array<{ type: string; price: number; timestamp: string }>;
}

const HistoricalDataModal: FC<Props> = ({ isOpen, onClose, data }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
            &#8203;
          </span>

          <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-4'>Historical Trades</h2>
              <ul>
                {data.map((trade, index) => (
                  <li key={index} className='border-t py-2'>
                    <span
                      className={
                        trade.type === 'sell'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {trade.type}
                    </span>
                    <span className='ml-4'>{`$${trade.price.toLocaleString()}`}</span>
                    <span className='ml-4 text-gray-500'>
                      {new Date(trade.timestamp).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                onClick={onClose}
                className='mt-3 bg-blue-500 text-white rounded px-4 py-2'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default HistoricalDataModal;
