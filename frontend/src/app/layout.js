import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'The Enforcers MC | Stand for What\'s Right',
  description: 'A Canadian motorcycle club dedicated to community safety, victim support, and violence prevention. Ride for justice. Stand for what\'s right.',
  keywords: ['community safety', 'victim support', 'biker club', 'motorcycle club', 'Canadian nonprofit', 'The Enforcers', 'MC'],
  authors: [{ name: 'The Enforcers MC' }],
  openGraph: {
    title: 'The Enforcers MC | Stand for What\'s Right',
    description: 'Riding for justice. Standing for what\'s right.',
    type: 'website',
    locale: 'en_CA',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-pt-20">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
