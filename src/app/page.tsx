import Image from "next/image";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThreeColumnsContainer from '@/components/ThreeColumnsContainer';

export default function Home() {
  return (
    <div>
    <Header />
    <main>
      <ThreeColumnsContainer />
    </main>
    <Footer />
    </div>
  );
}
