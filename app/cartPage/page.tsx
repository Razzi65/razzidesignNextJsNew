'use client'

export const dynamic = 'force-dynamic';

// Import necessary functions and dependencies
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db, auth } from '@/config/firebase';
import { useEffect, useState } from 'react';
import CartOrderSummary from '@/components/cartOrderSummary';
import CartItem from '@/components/cartItem';
import NextLink from 'next/link';
import { Button,useColorModeValue as mode  } from "@chakra-ui/react";
import initAuth from '@/config/authentication';
import {
  Box,
  Flex,
  Heading,
  Stack,
  HStack,
} from '@chakra-ui/react';
import HeaderDisplay from '@/components/headerForDisplay';
import { FaArrowRight } from 'react-icons/fa'


const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetCartHandler = async () => {
    try {
      await initAuth(); // Ensure authentication before proceeding

      const user = auth.currentUser;

      if (!user) {
        console.log('User not authenticated');
        // Redirect or handle the case where the user is not authenticated
        return;
      }

      const querySnapshot = await getDocs(collection(db, 'Carts'));

      const DBCartData = querySnapshot.docs
        .filter(doc => doc.data().userId === user.uid)
        .map(doc => ({ cartId: doc.id, data: doc.data() }));

      setCartData(DBCartData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetCartHandler();
  }, []);

  // Redirect only if cart is not loading and it is empty
  useEffect(() => {
    if (!loading && cartData.length === 0) {
      // router.push('/allProductsPage');
      console.log('Redirecting to allProductsPage');
    }
  }, [cartData, loading]);

  const handleRemoveItem = async (cartId) => {
    try {
      await deleteDoc(doc(db, "Carts", cartId));

      setCartData((prevCartData) =>
        prevCartData.filter((item) => item.cartId !== cartId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const totalAmount: number = cartData.reduce((total, item) => {
    const itemQuantity = item.data.quantity || 1; // Assuming a default quantity of 1 if not specified
    return total + item.data.NewPrice * itemQuantity;
  }, 0);

  return (
    <>
    {console.log(cartData)}
    <HeaderDisplay heading={'Your Shopping Cart'} text={'Want to add more products? Click below'}/>
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        spacing={{ base: "8", md: "16" }}
      >
        <Stack spacing={{ base: "8", md: "10" }} flex="2">
        <Heading fontSize="4xl" lineHeight={1.2} fontWeight="bold" color="Black">
            Shopping Cart ({cartData.length} items)
          </Heading>

          <Stack spacing="6">
            <hr />
            {cartData.map((item, index) => (
                            
              <Flex
                key={index}
                justify="space-between"
                align="center"
                borderBottom="1px"
                borderColor="gray.200"
                pb="2"
              >
                <CartItem
                  name={item.data.Name}
                  price={item.data.NewPrice}
                  quantity={1}
                  image={item.data.image}
                />
                <Button colorScheme="red" onClick={() => handleRemoveItem(item.cartId)}>
                  Remove
                </Button>
              </Flex>
            ))}
          </Stack>
        </Stack>



        

        <Flex mt="10%" direction="column" align="center" flex="1">
          <CartOrderSummary SubTotal={totalAmount} GrandTotal={totalAmount} />
          <NextLink
            href={{
              pathname: "/checkoutPage",
              query: {
                cartData: JSON.stringify(cartData.map((item) => item.data)),
                cartIds: cartData.map((item) => item.cartId).join(","),
              },
            }}
          >
            <Button as="a" colorScheme="teal" mt="4" size="lg" rightIcon={<FaArrowRight/>}> {/* Increased button size */}
              Proceed to checkout
            </Button>
          </NextLink>
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <NextLink color={mode('blue.500', 'blue.200')} href="/allProductsPage">Continue Shopping</NextLink>
          </HStack>
        </Flex>
      </Stack>
    </Box>
 </> );
};

export default CartPage;
