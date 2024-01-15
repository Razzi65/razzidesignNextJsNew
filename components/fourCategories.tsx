'use client'

import React from 'react';
import { Box, Flex, Image, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';


interface CategoryCardProps {
  name: string;
  imageURL: string;
}

const categoryData = [
  {
    name: 'Premium Acrylic',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/razzidesigns-baad9.appspot.com/o/productImages%2FLohe%20qurani%20acrylic.jpeg?alt=media&token=187ee870-1e3b-4341-90d7-a49056ae9ec8',
  },
  {
    name: 'Plywood',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/razzidesigns-baad9.appspot.com/o/productImages%2Fkaaba%20design.jpeg?alt=media&token=57ead1f9-9bb2-473e-ad4a-881292ab2904',
  },
  {
    name: 'Table Tops',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/razzidesigns-baad9.appspot.com/o/productImages%2FLohe%20qurani%20acrylic.jpeg?alt=media&token=187ee870-1e3b-4341-90d7-a49056ae9ec8',
  },
  {
    name: 'Car Hangings',
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/razzidesigns-baad9.appspot.com/o/productImages%2FLohe%20qurani%20acrylic.jpeg?alt=media&token=187ee870-1e3b-4341-90d7-a49056ae9ec8',
  },
];

function CategoryCard({ name, imageURL }: CategoryCardProps) {
  
  
  return (
   
      <Box
        
        maxW="3xl"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        overflow="hidden"
        transition="transform 0.5s, box-shadow 0.8s"
        _hover={{
          transform: 'scale(1.15)',
        }}
        m={10}
        
      >
      <Box position="relative" roundedTop="lg" overflow="hidden">
        <Image src={imageURL} alt={`Picture of ${name}`} maxH="300px" objectFit="cover" w="full" h="full" />

        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.7)"
          opacity="0.9"
          _hover={{
            opacity: 0.4,
          }}
        >
          <Flex h="full" align="center" justify="center" pt={40}>
            <Text color="white" fontWeight="semibold" fontSize="xl">
              {name}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  
);
}
export default function ProductDisplay() {
  const bgColor = useColorModeValue('gray.200', 'gray.600')

  return (

   

    <Flex direction="column" align="center" bg={bgColor} mt={10}>
      <Heading
        textAlign="center"
        fontSize={{ base: '2xl', md: '4xl' }}
        bgGradient="linear(to-l, #00bfff, #008080)"
        bgClip="text"
        marginY="4"
      >
        Explore our famous categories
      </Heading>
      <Flex p={6} w="full" alignItems="center" justifyContent="center" padding={10} direction={{ base: 'column', md: 'row' }}>
        {categoryData.map((category) => (
        <Link  key={category.name} 
        href={{
          pathname: "/displayCategory",
          query: {
            category:JSON.stringify(category.name)}}}> 
            
             <CategoryCard   key={category.name}  {...category} /> </Link>
        ))}
      </Flex>
    </Flex>
  );
}




