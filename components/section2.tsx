"use client";

import React from 'react';
import { SimpleGrid, Flex, Image, chakra, Box, Icon, Button } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

const Section2 = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
      <Flex bg="blue.100"> {/* Changed image overlay to blue.100 */}
        <Image
          src="https://scontent.flyp4-1.fna.fbcdn.net/v/t1.6435-9/133809389_215331850204400_8952087123148042897_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=810d5f&_nc_eui2=AeEP2qWhZqeEmL8qAXxz0RM9dwk3FODJTTl3CTcU4MlNOUgtNRzZAvMyNVUDYozWY98&_nc_ohc=edRPjwX6NXMAX8sIHpP&_nc_ht=scontent.flyp4-1.fna&cb_e2o_trans=q&oh=00_AfAZSIeMcIPZlcLLy1TR7j0LZAEKY3npG2mfH0Z9Z527MQ&oe=65C1CAF0"
          alt="islamic cqalligraphy"
          fit="contain"
          w="full"
          h={{ base: 64, md: 'full' }}
          bg="gray.100"
          loading="lazy"
          opacity={0.4}
        />
      </Flex>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, md: 8, lg: 20 }}
        py={24}
        zIndex={3}
      >
        <chakra.span
          color="brand.600"
          _dark={{
            color: 'gray.300',
          }}
          fontSize="lg"
          textTransform="uppercase"
          fontWeight="extrabold"
        >
          Exceptional support and service excellence
        </chakra.span>
        <chakra.h1
          mb={4}
          fontSize={{
            base: '4xl',
            md: '4xl',
            lg: '5xl',
          }}
          fontWeight="bold"
          color="brand.600"
          _dark={{
            color: 'gray.300',
          }}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          Our designs speak for themselves
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color="brand.600"
          _dark={{
            color: 'gray.400',
          }}
          letterSpacing="wider"
        >
          Get the soulful islamic calligraphy designs at your door steps. Customize the designs as per your area and your color choice. 
        </chakra.p>

        <Box display="flex" justifyContent="center" mt={8}> {/* Added button in the bottom center of text */}
          <Button
            fontWeight="bold"
            rounded="md"
            px={5}
            py={3}
            border="solid transparent"
            w="full"
            _light={{
              color: 'blue.100',
            }}
            bg="teal.600"
            _dark={{
              bg: 'brand.500',
            }}
            _hover={{
              bg: 'brand.700',
              _dark: {
                bg: 'brand.600',
              },
            }}
          >
            See All Designs
            <Icon as={FiExternalLink} ml={2} />
          </Button>
        </Box>
      </Flex>
    </SimpleGrid>
  );
};

export default Section2;
