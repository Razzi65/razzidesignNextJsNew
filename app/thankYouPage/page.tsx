
'use client'

export const dynamic = 'force-dynamic';

import React from "react";
import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";
import { useSearchParams   } from 'next/navigation';


 




const ThankyouPage = () => {
    
    const searchParams = useSearchParams()      
      const orderNumber = searchParams.get('orderNumber')

  return (
    <Box
      as="section"
      p={8}
      mx="auto"
      maxWidth="7xl"
      textAlign="center"
      fontSize="lg"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="lg"
    >
      <Heading as="h1" fontSize="2xl" mb={4}>
        Thank you for your order! 
      </Heading>
      <Text mb={6}>
        Your order number is: {orderNumber}
      </Text>
      <Stack spacing={4} justify="center">
        <Button colorScheme="teal" as="a" href="/">
          Continue Shopping
        </Button>
      </Stack>
    </Box>
  );
};

export default ThankyouPage;