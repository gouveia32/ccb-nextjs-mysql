import { useState } from 'react';
import { Input } from '@chakra-ui/react';

const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState('');

  const submitOnEnter = (event) => {
    // Watch for enter key

    if (event.key === 'Enter' && messageText.trim().length > 0) {
      onSubmit(messageText);
      setMessageText('');
    }
  };

  return (
    <>
      <Input
        h="40px"
        variant="outline"
        color="brand.700"
        mt="15px"
        p=".8rem 1rem"
        type="text"
        placeholder="pigeons await..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </>
  );
};

export default MessageInput;