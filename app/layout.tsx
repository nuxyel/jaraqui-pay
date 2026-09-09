import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './extended.css';
import './landing.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Jaraqui Pay | Uma API. Sem novela.',
  description:
    'Pix, boleto e cartão em uma infraestrutura demonstrativa para startups e SaaS brasileiros.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Jaraqui Pay | Uma API. Sem novela.',
    description:
      'Pix, boleto e cartão em uma infraestrutura demonstrativa para startups e SaaS brasileiros.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1732, height: 910, alt: 'Jaraqui Pay — Pix, boleto e cartão. Uma API. Sem novela.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaraqui Pay | Uma API. Sem novela.',
    description:
      'Pix, boleto e cartão em uma infraestrutura demonstrativa para startups e SaaS brasileiros.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
