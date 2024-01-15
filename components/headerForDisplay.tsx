import { chakra, Link, Stack, Box, Button, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';

const HeaderDisplay = (props:any) => {
  return (
    <Box pb={8}>
      {/* Navigation Bar */}
   

      {/* Background Image */}
      <Stack
        pos="relative"
        bgImage={`url('https://scontent.flyp4-1.fna.fbcdn.net/v/t39.30808-6/242601406_389458619458388_8912819733568354059_n.jpg?stp=dst-jpg_p720x720&_nc_cat=111&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeFw3PCJqNCeEUlTrAqVEy1GqpF2ujE0ePCqkXa6MTR48H04C_2v6mwP7RFBMJJ-0mw&_nc_ohc=KIm5vWpL3D0AX9rIr1n&_nc_ht=scontent.flyp4-1.fna&cb_e2o_trans=q&oh=00_AfAamTotGG2xeyOIzpSwgW3_E_KzddL9WHCPvhwTMNtBnw&oe=65A666F4')`}
        bgSize="cover"
        bgPosition="center"
        height="250px"
        w="100%"
      ></Stack>

      {/* Content */}
      <Box maxW="3xl" p={4} isolation="isolate" zIndex={2} mt="-10rem" marginInline="auto">
        <Box
          boxShadow={useColorModeValue(
            '0 4px 6px rgba(160, 174, 192, 0.6)',
            '0 4px 6px rgba(9, 17, 28, 0.9)'
          )}
          bgGradient="linear(to-l, #00bfff, #008080)"
          p={{ base: 4, sm: 8 }}
          overflow="hidden"
          rounded="2xl"
          opacity={.9}
          mt={5}
        >
          <Stack pos="relative" zIndex={1} direction="column" spacing={4} textAlign="center">
            <chakra.h1 fontSize="4xl"  fontWeight="bold" color="white">
              {props.heading}
            </chakra.h1>
            <chakra.text  color="white" fontSize="sm"  lineHeight={1.2}>
             {props.text}
            </chakra.text>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={3}> {props.buttons} </Stack>

            
            
              
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderDisplay;
