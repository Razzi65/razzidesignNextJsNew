
import type { Metadata } from 'next'
import { Providers } from './providers'
import theme from './theme'
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';




export const metadata: Metadata = {
  title: 'Razzi Designs',
  description: 'Premium islamic calligraphy and wall art',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Providers>
        <ChakraProvider theme={theme}><Navbar/>{children}<Footer/></ChakraProvider></Providers>
      </body>
    </html>
  )
}
