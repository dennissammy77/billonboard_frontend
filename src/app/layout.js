import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '@/components/ui/header_navigation';
import Head from 'next/head'

export const metadata = {
  title: 'BillonBoard',
  description: 'Discover Billboards Online',
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}