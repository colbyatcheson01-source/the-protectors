import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

const basePath = process.env.NODE_ENV === 'production' ? '/the-enforcers' : '';

export const metadata = {
  title: 'The Enforcers SC | Stand for What\'s Right',
  description: 'A Canadian street club dedicated to community safety, victim support, and violence prevention. Stand for what\'s right.',
  keywords: ['community safety', 'victim support', 'biker club', 'street club', 'Canadian nonprofit', 'The Enforcers', 'SC'],
  authors: [{ name: 'The Enforcers SC' }],
  openGraph: {
    title: 'The Enforcers SC | Stand for What\'s Right',
    description: 'Standing for what\'s right.',
    type: 'website',
    locale: 'en_CA',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-pt-20">
      <head>
        <link rel="icon" href={`${basePath}/favicon.svg`} sizes="any" type="image/svg+xml" />
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-biker-black">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-biker-black focus:text-biker-flame focus:border-2 focus:border-biker-flame focus:rounded-sm">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
