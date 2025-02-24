import type { Metadata } from 'next';
import { Bebas_Neue, Nunito } from 'next/font/google';
import { ThemeProvider } from '@/components/themeProvider';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas_neue',
  subsets: ['latin'],
  weight: ['400'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'JoBNEST',
  description: 'Ultimate job board.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${nunito.variable} ${bebasNeue.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
