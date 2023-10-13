import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Lato } from 'next/font/google'
import { frFR } from '@clerk/localizations'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/redux/provider'



const inter = Lato({ 
  subsets: ['latin'], 
  weight: ["100","400", "700"]})

export const metadata = {
  title: 'TalkingPDF',
  description: `TalkingPDF vous permet de discuter avec une IA qui ira chercher l'information à votre place.`,
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
        
        </body>
      </html>  
    </ClerkProvider>
  )
}
