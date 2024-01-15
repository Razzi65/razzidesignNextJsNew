'use client'

export const dynamic = 'force-dynamic';
export const revalidate = 0

import CategoryDisplay from "@/components/categoryDisplay";
import HeaderDisplay from "@/components/headerForDisplay";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

const DisplayCategory = (props: any) => {
  const { searchParams } = props;
  const category = JSON.parse(searchParams.category || '[]');
  console.log('category', category);
  

  return (
    <>
    <HeaderDisplay heading={category} text={`Our collection of exclusive designs in Premium ${category} `} 
    buttons={<Link href={{
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
               See All Products
              </Button>

                </Link>}/>
      {/* Pass the retrieved category name to CatagoryDisplay component */}
      <CategoryDisplay category={category} numProducts={Infinity} />
    </>
  );
};

export default DisplayCategory;
