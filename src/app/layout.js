import './globals.css';
import Header from '@/components/ui/header_navigation';
import { Providers } from '@/components/providers/providers';
import Footer from '@/components/ui/footer';

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
        <Providers>
            <Header />
            {children}
            <Footer/>
        </Providers>
      </body>
    </html>
  )
}