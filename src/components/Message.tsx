import { FC } from 'react';

interface Props {
  message: string;
  variant: 'info' | 'error' | 'success';
}

const Message: FC<Props> = ({ message, variant = 'info' }) => {
  let bgColor = 'bg-blue-500';

  switch (variant) {
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'success':
      bgColor = 'bg-green-500';
      break;
    default:
      break;
  }

  return (
    <aside
      role='alert'
      className={`p-4 rounded ${bgColor}`}
      aria-live='assertive'
    >
      {message}
    </aside>
  );
};

export default Message;
