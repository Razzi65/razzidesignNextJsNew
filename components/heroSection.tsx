"use client"

import React from "react";
import { Box, chakra, Icon, Image, Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "./navbar";

const BeautifulButtons = () => {
  const bgColor = useColorModeValue("blue.200", "teal.200");
  const textColor = useColorModeValue("gray.800", "white");

  const buttonStyle = {
    fontSize: { base: "lg", md: "lg" },
    rounded: "md",
    color: textColor,
    bg: bgColor,
    _hover: {
      bg: useColorModeValue("teal.200", "blue.200"),
    },
    px: { base: 8, md: 10 },
    py: { base: 3, md: 4 },
    cursor: "pointer",
    fontWeight: "body",
    fontFamily: "body",
    boxShadow: "md",
  };

  return (
    <Box
      mt={{
        base: 5,
        sm: 8,
      }}
      display={{
        sm: "flex",
      }}
      justifyContent={{
        sm: "center",
        lg: "start",
      }}
      fontWeight="extrabold"
      fontFamily="fantasy"
    >
     <Button {...buttonStyle}>
    <Link href="/allProductsPage">See all products</Link>
</Button>

      <a href="https://wa.me/message/232GPGZFQKXFA1" target="_blank" rel="noopener noreferrer">
    <Button {...buttonStyle} ml={[null, 3]}>
        Whatsapp Us
    </Button>
</a>
      
    </Box>
  );
};

const HeroSection = () => {
  return (
    <>
    
    <Box pos="relative" overflow="hidden" >
      <Box maxW="7xl" mx="auto">
        <Box
          pos="relative"
          pb={{
            base: 8,
            sm: 16,
            md: 20,
            lg: 28,
            xl: 32,
          }}
          maxW={{
            lg: "2xl",
          }}
          w={{
            lg: "full",
          }}
          zIndex={1}
          border="solid 1px transparent"
        >
          <Icon
            display={{
              base: "none",
              lg: "block",
            }}
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            h="full"
            w={48}
            color="blue.100"
            transform="translateX(50%)"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </Icon>
          <Box
            mx="auto"
            maxW={{
              base: "7xl",
            }}
            px={{
              base: 4,
              sm: 6,
              lg: 8,
            }}
            mt={{
              base: 10,
              sm: 12,
              md: 16,
              lg: 20,
              xl: 28,
            }}
          >
            <Box
              w="full"
              textAlign={{
                sm: "center",
                lg: "left",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <chakra.h1
                fontSize={{
                  base: "4xl",
                  sm: "5xl",
                  md: "6xl",
                }}
                letterSpacing="tight"
                lineHeight="short"
                fontWeight="extrabold"
                color="gray.900"
              >
                <chakra.span
                  display={{
                    base: "block",
                    xl: "inline",
                  }}
                >
                  Welcome to {" "}
                </chakra.span>
                <chakra.span
                  display={{
                    base: "block",
                    xl: "inline",
                  }}
                  color="brand.600"
                >
                  Razzi Designs
                </chakra.span>
              </chakra.h1>
              <chakra.p
                mt={{
                  base: 3,
                  sm: 5,
                  md: 5,
                }}
                fontSize={{
                  sm: "lg",
                  md: "xl",
                }}
                maxW={{
                  sm: "xl",
                }}
                mx={{
                  sm: "auto",
                  lg: 0,
                }}
                color="gray.500"
              >
                Check out the premium range of Plywood and Acrylic Mirror designs, made with high-quality finishing.
              </chakra.p>
              <BeautifulButtons />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
          position={{
            lg: "absolute",
          }}
          top={{
            lg: 0,
          }}
          bottom={{
            lg: 0,
          }}
          right={{
            lg: 0,
          }}
          w={{
            lg: "48%",
          }}
          border="solid 1px transparent"
          rounded="lg" // Rounded corners for the image box
        >
          <Image
            h={[56, 72, 96, "full"]}
            w="full"
            fit="cover"
            src="https://scontent.flyp4-1.fna.fbcdn.net/v/t1.6435-9/134673371_216615170076068_8208262596021194486_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=810d5f&_nc_eui2=AeHQjVAmj_pTDyHwfDvPiSdX4Ux9dfj7B_HhTH11-PsH8T-8jRd0Gyo-TyxfZ7iOQYk&_nc_ohc=dnFnvXQjyi4AX8tRGbA&_nc_ht=scontent.flyp4-1.fna&cb_e2o_trans=q&oh=00_AfCLYkeb1MjowIkHbmJFUaQa65BEQpIPsoN9rkI-BQe9Aw&oe=65C1C180"

            alt=""
            loading="lazy"
            // filter={isHovered ? "brightness(110%)" : "brightness(100%)"} // Hover effect
            transition="filter 0.3s ease-in-out"
            
          />
      </Box>
    </Box> </>
  );
};

export default HeroSection;
