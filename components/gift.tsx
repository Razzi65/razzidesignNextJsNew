'use client'
import {
    chakra,
    Stack,
    Flex,
    useColorModeValue,
    Container,
    Link,
    List,
    ListIcon,
    ListItem,
    Box
  } from '@chakra-ui/react';
  // Here we have used react-icons package for the icon
  import { BsCheck } from 'react-icons/bs';
  
  const data = {
    heading: 'I want to gift it, What are the payment options?',
    subHeading: 'Other than Cash On Delivery, we accept Bank Transfer, Jazz Cash and  Easy Paisa as mode of payments.',
    features: ['Contact us on Whatsapp', 'Call us on 0321-7646894'],
    image:
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80'
  };
  
  const Gift = () => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');

    return (
      <Box bg={bgColor} minHeight="40vh">
      <Container maxW="5xl" p={{ base: 5, md: 10 }}  bg={useColorModeValue('gray.100', 'gray.700')}>
        <Flex
          boxShadow={useColorModeValue(
            '0 4px 6px rgba(160, 174, 192, 0.6)',
            '0 4px 6px rgba(9, 17, 28, 0.9)'
          )}
          backgroundSize="cover"
          backgroundImage={`url(${data.image})`}
          p={{ base: 4, sm: 8 }}
          rounded="lg"
        >
          <Stack direction="column" spacing={5} textAlign="left" flexGrow={3}>
            <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              {data.heading}
            </chakra.h1>
            <chakra.h1 fontSize="xl" lineHeight={1.2} fontWeight="bold">
              {data.subHeading}
            </chakra.h1>
            <List spacing={3}>
              {data.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListIcon as={BsCheck} color="green.700" />
                  {feature}
                </ListItem>
              ))}
            </List>
            <Link
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              fontSize="md"
              fontWeight="500"
              p={3}
              lineHeight={1.2}
              h={10}
              w="max-content"
              rounded="md"
              textDecoration="none"
              color="white"
              bg="blackAlpha.400"
              shadow="lg"
            >
              Message on Whatsapp
            </Link>
          </Stack>
        </Flex>
      </Container>
      </Box>
    );
  };
  
  export default Gift;