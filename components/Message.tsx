import { Message as Msg } from '../types/types';
import { Box, Text } from '@chakra-ui/react';


const Message = ({ message, self }: { message: Msg; self: boolean }) => {
  const split = message.author.username.split('@');
  const username = split[0];
  return (
    <>
      <Box minH="70px" borderBlockEnd="1px solid rgba(254,254,254,0.3)">
        <Text pt="12px" color={self ? 'red.600' : 'brand.500'} fontWeight="bold">
          {self ? 'Me' : username}
        </Text>
        <Text pb="15px" color="brand.700">
          {message.message}
        </Text>
      </Box>
    </>
  );
};

export default Message;