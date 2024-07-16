// app/page.tsx
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mapa Interactivo de Ecuador',
  description: 'Mapa interactivo de Ecuador con Leaflet y Next.js',
};

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Home: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <main className="h-full w-full">
        <Map />
      </main>
    </div>
  );
};

export default Home;
