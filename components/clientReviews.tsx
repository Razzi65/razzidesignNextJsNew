'use client'

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  keyframes 
} from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

const Testimonial = (props: Props) => {
  const { children } = props

  return <Box>{children}</Box>
}

const TestimonialContent = (props: Props) => {
  const { children } = props

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  )
}

const TestimonialHeading = (props: Props) => {
  const { children } = props

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = (props: Props) => {
  const { children } = props

  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
    src,
    name,
    title,
  }: {
    src: string
    name: string
    title: string
  }) => {
    const size = '96px'
    const color = 'teal'
  
    const pulseRing = keyframes`
      0% {
        transform: scale(0.33);
      }
      40%,
      50% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    `;
  
    return (
      <Flex align={'center'} mt={8} direction={'column'}>
        <Box
          as="div"
          position="relative"
          w={size}
          h={size}
          _before={{
            content: "''",
            position: 'relative',
            display: 'block',
            width: '300%',
            height: '300%',
            boxSizing: 'border-box',
            marginLeft: '-100%',
            marginTop: '-100%',
            borderRadius: '50%',
            bgColor: color,
            animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
          }}
        >
          <Avatar src={src} size="full" position="absolute" top={0} />
        </Box>
        <Stack spacing={-1} align={'center'}>
          <Text fontWeight={600}>{name}</Text>
          <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
            {title}
          </Text>
        </Stack>
      </Flex>
    );
  };

export default function ClientReviews() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')} mt={10}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Stories best told</Heading>
          <Text>A glimpse of trust shown by our hundreds of valuable customers who built their good moments with us.</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading> Excellent quality</TestimonialHeading>
              <TestimonialText>
              Love their articles everytime, I have ordered dozen times and for so many people. Excellent quality and loved the packaging for overseas orders 💗 Keep it up.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://lh3.googleusercontent.com/a-/ALV-UjWQtUZmRWxkjYmKrXGWNALvVi6A-Chb0_SUnkQPRSezdKY=w66-h66-p-rp-mo-br100'
              }
              name={'Nawal Sadaf Qureshi'}
              title={'Authentic Google Review'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Masterpiece work</TestimonialHeading>
              <TestimonialText>
              Super good quality of work and Premium Acrylic Base. SuperB work Razzi Designs... Keep it up!!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://lh3.googleusercontent.com/a-/ALV-UjWA50VeJHGMCzNkyv4rmb9MbW8grTfhXLGL4LwJtdnKSNY=w66-h66-p-rp-mo-ba3-br100'
              }
              name={'Aamir Shah'}
              title={'Authentic Google Review'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Really love my parcel</TestimonialHeading>
              <TestimonialText>
              Mashallah I ordered from their page and I really really love my parcel and their delivery service is really good 👍
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://lh3.googleusercontent.com/a-/ALV-UjU98MwLKi3HTcblSqHnWKrxctn3d7TqE58MthXq77PFlfk=w66-h66-p-rp-mo-br100'
              }
              name={'Sadia Khan'}
              title={'Authentic Google Review'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}