'use client'
import {
    Box,
    Flex,
    Text,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Image,
  } from '@chakra-ui/react';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import Link from 'next/link';
  import React, { useState, useEffect, useRef } from 'react';

  
  export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgGradient = useColorModeValue(
      'linear(to-l, #00bfff, #008080)',
      'linear(to-l, #1a202c, #2d3748)'
    );
  
    // State to track the scroll position
    const [scrollPosition, setScrollPosition] = useState(0);
  
    // Ref to store the initial scroll position
    const scrollRef = useRef(0);
  
    useEffect(() => {
        
        const handleScroll = () => {
          setScrollPosition(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const transparency = Math.min(scrollPosition / 100, 1);
      
    
      // Use rgba for background to include transparency
      const bgColor = 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80'

  
    return (
      <>
        <Box
          bgGradient={bgColor}
          px={4}
          position="fixed"
          top="0"
          width="100%"
          zIndex="sticky"
          boxShadow={`0 0 10px rgba(0, 0, 0, ${transparency})`}
        >
          <Flex h={20} alignItems="center" justifyContent="space-around">
            {/* Logo Box */}
            <Flex alignItems="center">
              <>
                <Link href="/">
                  <Image
                    borderRadius="full"
                    src="https://firebasestorage.googleapis.com/v0/b/razzidesigns-baad9.appspot.com/o/productImages%2FLogo%20RazziDesigns.png?alt=media&token=a91ba061-a843-407f-8184-ba1b7159ff7f"
                    alt="Razzi Designs"
                    width="100px"
                    height="110px"
                    objectFit="contain"
                  />
                </Link>
              </>
            </Flex>
  
            {/* Menus Box */}
            <Flex alignItems="center">
              <Stack direction="row" spacing={8}>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/allProductsPage">All Products</NavLink>
                <NavLink href="/allProductsPage">Islamic Calligraphy</NavLink>
                <NavLink href="/allProductsPage">Table Tops</NavLink>
              </Stack>
            </Flex>
  
            {/* Dark Mode Box */}
            <Flex alignItems="center">
              <Stack direction="row" spacing={4}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </Box>
        <Box height="20" /> 
      </>
    );
  }
  
  // Styled NavLink
  const NavLink = ({ href, children }) => (
    <Text
      fontSize="1xl"
      fontWeight="bold"
      color='white'
      _hover={{ color: useColorModeValue('green.800', 'green.200') }}
      ml="8"
    >
      <Link href={href}>{children}</Link>
    </Text>
  );
  