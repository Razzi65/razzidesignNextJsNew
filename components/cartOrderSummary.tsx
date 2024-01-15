'use client'
import React from "react";
import { Stack, Flex, Heading, Text, Button,useColorModeValue as mode } from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";


const CartOrderSummary = (props: any) => {

  
    return (


        <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>
  
        <Stack spacing="6">
        <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        Subtotal: {props.SubTotal}

        </Text> </Flex>
          
        <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
       Shipping: Free Shipping 

        </Text> </Flex>
          
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total: {props.GrandTotal}
            </Text>
           
          </Flex>
        </Stack>
      
      </Stack>











    );
};

export default CartOrderSummary;
