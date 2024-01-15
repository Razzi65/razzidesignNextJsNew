'use client'




// 'src/pages/checkout.tsx'
import { collection, addDoc, deleteDoc, doc, getDocs, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useRouter } from 'next/navigation';



import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  useColorModeValue as mode,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Image, Stack, useToast
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
  

const CheckoutPage = (props: any) => {

  const { searchParams } = props;
  const cartData = JSON.parse(searchParams.cartData || '[]');
  const cartIds = (searchParams.cartIds || '').split(',');
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState(1000);
  const toast = useToast();

  const router = useRouter();

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    mobileNumber: 0,
    paymentMethod: "",
    streetAddress: "",
    townRoadArea: "",
    city: "",
    state: "",
  });

  const getOrderDetails = async () => {
    try {
      const DBCartData: any = [];
      const querySnapshot = await getDocs(collection(db, "Carts"));
      querySnapshot.forEach((doc) => {
        DBCartData.push(doc.id, doc.data());
        console.log(doc.id, " => ", doc.data());
      });

      setOrderData(cartData);

      // Fetch the current order number
      const orderNumberDocRef = doc(db, 'OrderNumber', 'currentOrderNumber');
      const orderNumberSnapshot = await getDoc(orderNumberDocRef);
      const currentOrderNumber = orderNumberSnapshot.data().value;

      // Check if the order number is NaN or not a number
      if (isNaN(currentOrderNumber)) {
        console.error('Invalid order number:', currentOrderNumber);
        // Handle the case where the order number is invalid (e.g., set a default value)
        setOrderNumber(1000);
      } else {
        // Set the order number
        setOrderNumber(currentOrderNumber);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    getOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      if (
        !customerDetails.name ||
        !customerDetails.email ||
        !customerDetails.mobileNumber ||
        !customerDetails.paymentMethod ||
        !customerDetails.streetAddress ||
        !customerDetails.townRoadArea ||
        !customerDetails.city ||
        !customerDetails.state
      ) {
        console.error('Please fill in all required fields.');

        // Display toast notification
        toast({
          title: 'Fill in all fields of the form',
          status: 'error',
          duration: 5000, // in milliseconds
          isClosable: true,
        });

        return;
      }

      // Fetch the current order number
      const orderNumberDocRef = doc(db, 'OrderNumber', 'currentOrderNumber');
      const orderNumberSnapshot = await getDoc(orderNumberDocRef);
      let currentOrderNumber = orderNumberSnapshot.data()?.value;

      // Check if the order number is NaN or not a number
      if (isNaN(currentOrderNumber) || typeof currentOrderNumber !== 'number') {
        console.error('Invalid order number:', currentOrderNumber);
        // Set a default value if the order number is invalid
        currentOrderNumber = 1000;
      }

      const orderDocRef = await addDoc(collection(db, 'Orders'), {
        customerDetails,
        orderData,
        orderNumber: currentOrderNumber, // Use the fetched order number
      });

      

      console.log('Order placed successfully! Order ID: ', orderDocRef.id);

      for (const cartId of cartIds) {
        await deleteDoc(doc(db, 'Carts', cartId));
        console.log(`Cart with ID ${cartId} deleted.`);
      }

      // Increment the order number in the database
      const incrementedOrderNumber = currentOrderNumber + 1;
      await updateDoc(orderNumberDocRef, {
        value: incrementedOrderNumber,
      });
       // Display toast notification
       toast({
        title: `Your order has been places. Order # ${orderNumber}`,
        status: 'success',
        duration: 5000, // in milliseconds
        isClosable: true,
      });

      // Redirect to the thank you page
      router.push(`/thankYouPage?orderNumber=${orderNumber}`);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call the handlePlaceOrder function
    await handlePlaceOrder();
  };

  if (loading || !Array.isArray(orderData) || orderData.length === 0) {
    // Display a loading spinner or message here
    return <div>Loading...</div>;
  }


  return (





    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-r, teal.500, blue.500)"
      color="black"
    >
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
        bg={mode("white", "gray.800")}
        p="6"
        rounded="lg"
        shadow="lg"
        w="100%"
      >
        <Heading fontSize="2xl" fontWeight="extrabold" mb="8">
          Checkout
        </Heading>

        <Flex>
          {/* Customer Details Form */}
          <Box flex="1" pr="8">
            <form onSubmit={handleSubmit}>
              <FormControl mb="4">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  type="number"
                  name="mobileNumber"
                  value={customerDetails.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Payment Method</FormLabel>
                <Select
                  name="paymentMethod"
                  value={customerDetails.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="creditCard">Cash On Delivery</option>
                 
                  {/* Add more payment options as needed */}
                </Select>
              </FormControl>

              <FormControl mb="4">
                <FormLabel>Street Address</FormLabel>
                <Input
                  type="text"
                  name="streetAddress"
                  value={customerDetails.streetAddress}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl mb="4">
                <FormLabel>Town/Road/Area</FormLabel>
                <Input
                  type="text"
                  name="townRoadArea"
                  value={customerDetails.townRoadArea}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl mb="4">
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={customerDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>State</FormLabel>
                <Input
                  type="text"
                  name="state"
                  value={customerDetails.state}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              {/* Add more form fields as needed */}

              <Button colorScheme={'blue'} onClick={handleSubmit}>Place Order</Button>


            </form>
          </Box>

          {/* Order Details */}
          <Box flex="1">
            {orderData.map((product, index) => (
              <Box
                key={index}
                bg={mode('white', 'gray.800')}
                p="6"
                rounded="lg"
                shadow="lg"
                mb="4"
              >



                <Heading fontSize="xl" fontWeight="bold" mb="4">
                  Order Details - Item {index + 1}
                </Heading>

                {/* Check if product exists and has properties */}
                {product && (




                  <Stack direction="row" spacing="5" width="full">
                    <Image
                      rounded="lg"
                      width="100px"
                      height="100px"
                      fit="cover"
                      src={product.image}
                      alt={product.name}
                      draggable="false"
                      loading="lazy"
                    />
                    <Box pt="4">
                      <Text fontSize="sm" color={mode('gray.600', 'gray.400')}>
                        Product: {product && product.Name}
                      </Text>
                      <Text fontSize="sm" color={mode('gray.600', 'gray.400')}>
                        Color: {product && product.colors}
                      </Text>
                      <Text fontSize="sm" color={mode('gray.600', 'gray.400')}>
                        Price: Rs. {product && product.NewPrice}
                      </Text >
                      {/* Add more fields based on your data structure */}
                    </Box>    </Stack>
                )}
              </Box>



            ))}
            <Text fontWeight="bold" fontSize="lg" mt="6">
              Total: Rs.{" "}
              {orderData.reduce((total, product) => {
                const productPrice = product.NewPrice;
                const priceToAdd = productPrice ? parseFloat(productPrice) : 0;
                return total + priceToAdd;
              }, 0).toFixed(2)}
            </Text>

          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default CheckoutPage;
