import { Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import TradeDetail from './TradeDetail';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  historicalTradeData: UnifiedTrade[] | undefined;
}

const HistoricalDataModal: FC<Props> = ({
  isOpen,
  onClose,
  historicalTradeData,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <div className='fixed inset-0 z-500 flex items-center justify-center '>
        <div
          className='absolute inset-0 bg-gray-500 opacity-75'
          onClick={onClose}
        ></div>

        <div className='relative bg-white rounded-lg shadow-lg overflow-auto hover:scroll-auto max-w-lg w-full  h-[80vh] border border-lg border-black'>
          <div className='p-6 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4'>Historical Trades</h2>

            <ul className='divide-y divide-gray-200'>
              {historicalTradeData && historicalTradeData.length > 0 ? (
                historicalTradeData.map((trade) => (
                  <TradeDetail key={uuidv4()} trade={trade} />
                ))
              ) : (
                <Message variant='error' message='No data available' />
              )}
            </ul>
          </div>

          <div className='bg-gray-100 p-6 flex justify-center'>
            <button
              onClick={onClose}
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

export default HistoricalDataModal;
