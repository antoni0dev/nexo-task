import { FC } from 'react';

type MessageType = 'success' | 'error' | 'neutral';

interface Props {
  variant: MessageType;
  message: string;
}

const variantClasses = {
  success: 'bg-green-100 text-green-700',
  error: 'bg-red-100 text-red-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const Message: FC<Props> = ({ variant = 'neutral', message }) => {
  return (
    <div
      className={`border rounded-lg shadow-md p-4 bg-white ${variantClasses[variant]}`}
    >
      {message}
    </div>
  );
};

export default Message;
