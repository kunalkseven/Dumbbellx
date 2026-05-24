// src/app/layout.js

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'Dumbbellx - Premium Exercise Logger & PR Tracker',
  description: 'Log exercises, monitor progression, break personal records, and analyze your gains with a futuristic glassmorphic sports-tech tracker.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: 'dark',
        variables: {
          colorPrimary: '#8b5cf6',
          colorBackground: '#0c0f1d',
          colorInputBackground: 'rgba(255, 255, 255, 0.03)',
          colorInputText: '#ffffff'
        }
      }}
    >
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        </head>
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
