'use client'

export const dynamic = 'force-dynamic';

import { Box, Image as ChakraImage, Text, Button } from "@chakra-ui/react";
import AllProducts from "@/components/allProducts";
import HeaderDisplay from "@/components/headerForDisplay";
import Link from "next/link";

const AllProductsPage = () => {
  
  return (
    <>
      <HeaderDisplay heading={'Explore Our Artistic Collection'} text={'Choose from our 100+ premium designs'}
      
      
      buttons={<>
      
      <Link href={{
          pathname: "/allProductsPage",
          }}> 
              <Button
                h={10}
                px={6}
                color="white"
                fontSize="md"
                variant="solid"
                rounded="md"
                lineHeight={1}
                bg="gray.800"
                _hover={{ bg: 'blue.800' }}
              >
               All Products
              </Button>

                </Link>
      
      
      
                <Link href={{
          pathname: "/displayCategory",
          query: {
            category:JSON.stringify('Premium Acrylic')}}}> 
              <Button
                h={10}
                px={6}
                color="white"
                fontSize="md"
                variant="solid"
                rounded="md"
                lineHeight={1}
                bg="gray.800"
                _hover={{ bg: 'blue.800' }}
              >
               Premium Acrylic
              </Button>

                </Link>


                <Link href={{
          pathname: "/displayCategory",
          query: {
            category:JSON.stringify('Plywood')}}}> 
              <Button
                h={10}
                px={6}
                color="white"
                fontSize="md"
                variant="solid"
                rounded="md"
                lineHeight={1}
                bg="gray.800"
                _hover={{ bg: 'blue.800' }}
              >
               Premium Plywood
              </Button>

                </Link>
             
                <Link href={{
          pathname: "/displayCategory",
          query: {
            category:JSON.stringify('Car Hangings')}}}> 
              <Button
                h={10}
                px={6}
                color="white"
                fontSize="md"
                variant="solid"
                rounded="md"
                lineHeight={1}
                bg="gray.800"
                _hover={{ bg: 'blue.800' }}
              >
               Car Hangings
              </Button>

                </Link>
             

          </>
} />

      
      {/* Render your AllProducts component below the image */}
      <AllProducts />
    </>
  );
};

export default AllProductsPage;
