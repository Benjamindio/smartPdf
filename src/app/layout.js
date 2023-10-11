import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Lato } from 'next/font/google'
import { frFR } from '@clerk/localizations'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/redux/provider'
import {Analytics} from '@vercel/analytics'


const inter = Lato({ 
  subsets: ['latin'], 
  weight: ["100","400", "700"]})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}



export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className={inter.className}>
        <Providers>
          {children}
        <Toaster />
        
        </Providers>
        <Analytics />
        </body>
      </html>  
    </ClerkProvider>
  )
}
