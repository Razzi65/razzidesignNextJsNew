'use client'

import { Box, Flex, Image, Text, Stack, useColorModeValue as mode } from '@chakra-ui/react';
import CartOrderSummary from './cartOrderSummary';

const CartItem = (props:any) => {
    
        return (
          <Stack direction="row" spacing="5" width="full">
       
        <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={props.image}
        alt={props.ame}
        draggable="false"
        loading="lazy"
      />
      
      <Box pt="4">

        <Stack spacing="0.5">
          <Text fontWeight="medium">{props.name}</Text>
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            {props.description}
          </Text>
          <Text fontSize="sm" color={mode('gray.600', 'gray.400')}>
           {props.price} x {props.quantity}
          </Text>
          <Text fontWeight="bold" fontSize="lg" pr="4" color={mode('gray.800', 'white')}>
           Rs.{props.price * props.quantity}/-
        </Text>

          </Stack> </Box> </Stack>


  );
};

export default CartItem;
