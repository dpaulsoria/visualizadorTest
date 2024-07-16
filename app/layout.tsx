// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mapa Interactivo de Ecuador',
  description: 'Mapa interactivo de Ecuador con Leaflet y Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
