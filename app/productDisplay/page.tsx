'use client'




// Import necessary functions and dependencies
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import {
    Box,
    Flex,
    Text,
    Image,
    Button,
    Spacer,
    Heading,
    List,
    ListItem,
    ListIcon, Stack, Spinner 
} from '@chakra-ui/react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { CheckIcon, CheckCircleIcon } from '@chakra-ui/icons';
import HeaderDisplay from '@/components/headerForDisplay';



const ProductDisplayPage = ({searchParams}) => { 
  
    const productId = JSON.parse(searchParams.productData || '[]');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch product details based on the productId from the route
        const fetchProductDetails = async () => {
            try {
                // Create a query to get a specific product document from the "Products" collection
                const productQuery = collection(db, 'Products');
                const productSnapshot = await getDocs(productQuery);

                // Find the product with the matching ID
                const productDetails = productSnapshot.docs.find(
                    (doc) => doc.id === productId
                );

                if (productDetails) {
                    // Extract data from the product document
                    setSelectedProduct({
                        id: productDetails.id,
                        data: productDetails.data(),
                    });
                } else {
                    console.error('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        // Call the function to fetch data when the component mounts or when productId changes
        fetchProductDetails();
    }, [productId]); // Include productId as a dependency to re-run the effect when it changes

    const handleBuyNow = async () => {
        try {
            if (!selectedProduct || !selectedProduct.id) {
                console.error('Invalid product data.');
                return;
            }

            const user = auth.currentUser;
            if (!user) {
                await signInAnonymously(auth);
            }

            const cartDocRef = await addDoc(collection(db, 'Carts'), {
                userId: user.uid,
                productId: selectedProduct.id,
                Name: selectedProduct.data.Name,
                OldPrice: selectedProduct.data.OldPrice,
                availability: selectedProduct.data.Availability || false,
                category: selectedProduct.data.Category || "",
                description: selectedProduct.data.Description || "",
                colors: selectedProduct.data.color || "",                
                size: selectedProduct.data.size || "",
                NewPrice: selectedProduct.data.NewPrice || "",
                image: selectedProduct.data.image || "",
                
                // Add more details as needed
            });

            // Redirect to cartPage with the selected product's ID
            router.push(`/cartPage?productId=${selectedProduct.id}`);

            console.log('Product added to cart successfully! Cart ID:', cartDocRef.id);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div>

            {selectedProduct ? (
                <>
                    <HeaderDisplay heading={selectedProduct.data.Name} text={'Premium Product By Razzi Designs'} />
                    <Flex mt={20} justify="center">
                        <Flex direction={{ base: 'column', sm: 'row' }} align="center">
                            <Box
                                p={7}
                                bg="gray.200"
                                rounded="lg"
                                shadow="md"
                                boxSize={{ base: 'full', sm: '500px' }}
                                marginEnd={{ base: '0', sm: '5' }}
                            >
                                <Image
                                    src={selectedProduct.data.image}
                                    alt=""
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </Box>

                            <Spacer />

                            <Box
                                p={7}
                                bg="gray.200"
                                rounded="lg"
                                shadow="md"
                                boxSize={{ base: 'full', sm: '500px' }}
                                marginStart={{ base: '0', sm: '5' }}
                            >
                                <Stack direction="column" gap="2" align="center">
                                    <Stack direction="row" align="center" justify="center">

                                        <Text
                                            fontSize="3xl"
                                            fontWeight="800"
                                            color={'gray.600'}
                                        >
                                            {selectedProduct.data.Name}
                                        </Text>
                                    </Stack>
                                    <Text color="gray.500" fontSize="md">

                                    </Text>
                                    <Text color="gray.600" fontSize="sm">
                                        {selectedProduct.data.Description}
                                    </Text>
                                </Stack>

                                <Flex flexDir="column" gap="2" align="left" mt={5}>
                                    <Text fontSize="3xl" fontWeight={500} color="gray.600">
                                        Product Details
                                    </Text>
                                    <List spacing={3}>
                                        <ListItem>
                                            <ListIcon as={CheckCircleIcon} color="gray.400" />
                                            Material: {''}
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={CheckCircleIcon} color="gray.400" />
                                            Category: {selectedProduct.data.Category}
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={CheckCircleIcon} color="gray.400" />
                                            Size: {''}
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={CheckCircleIcon} color="gray.400" />
                                            Colors: {''}
                                        </ListItem>
                                    </List>
                                </Flex>

                                <Spacer />

                                <Flex direction="column" mt={10}>
                                    <Flex gap="2" items="center" pb="2" fontWeight="semibold">
                                        <Text fontSize={'2xl'} fontWeight={600} color={'green.800'}>
                                            Price:{' '}

                                            Rs.
                                        </Text>
                                        <Text fontSize={'2xl'} fontWeight={600} color={'green.800'}>
                                            {selectedProduct.data.NewPrice}/-
                                        </Text>
                                    </Flex>
                                    <Flex gap="2" items="center" pb="2">
                                        <Text fontSize={{ base: 'sm', sm: 'md' }} color="gray.600" textDecoration="line-through">
                                            Old Price: Rs.{selectedProduct.data.OldPrice}/-
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex direction="row" align="center" justifyContent={'stretch'} >
                                    <Box>
                                        <Button
                                            colorScheme="teal.100"
                                            onClick={handleBuyNow}

                                            bgGradient="linear(to-r, teal.800,gray.500)"
                                            size="md"
                                        >
                                            Buy Now
                                        </Button>
                                    </Box>
                                    <Box >
                                        <Button
                                            as="a"
                                            rounded="none"  // Remove rounded corners
                                            px={0}          // Set minimal horizontal padding
                                            bg="transparent"  // Set background to transparent
                                            color="teal.800"  // Set text color
                                            _hover={{ textDecoration: 'underline' }}  // Add underline on hover
                                            onClick={() => { }}
                                            marginStart={10}
                                        >
                                            Continue Shopping...
                                        </Button>
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>
                </>) : (
                 <Spinner size="l" color="teal.500" thickness="5px" />
            )}
        </div>
    );
};

export default ProductDisplayPage;