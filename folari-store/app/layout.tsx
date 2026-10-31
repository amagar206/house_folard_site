import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Folari Milano',
  description: 'L\'élégance de la soie, l\'art du foulard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#F4F1EA] text-[#1A1A1A] font-sans antialiased overflow-x-hidden flex flex-col min-h-screen m-0 p-0">
        
        {/* Promotional Banner */}
        

        {/* Navigation Menu (Sticky at the top) */}
        <nav className="sticky top-0 w-full z-50 bg-[#F4F1EA]/90 backdrop-blur-xl border-b border-black/10 shadow-xl">
          <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
            
            <Link href="/" className="text-3xl font-serif tracking-widest text-[#1A1A1A] drop-shadow-sm hover:text-[#D4AF37] transition-colors">
              HOUSE FOLARD 
            </Link>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs tracking-[0.15em] uppercase font-bold">
              
              <Link href="/" className="block px-6 py-3 rounded-lg border border-black/20 bg-black/5 text-[#1A1A1A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#1A1A1A] hover:text-white">
                Accueil
              </Link>
              <Link href="/products" className="block px-6 py-3 rounded-lg border border-black/20 bg-black/5 text-[#1A1A1A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#1A1A1A] hover:text-white">
                Boutique
              </Link>
              <Link href="/about" className="block px-6 py-3 rounded-lg border border-black/20 bg-black/5 text-[#1A1A1A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#1A1A1A] hover:text-white">
                À Propos
              </Link>
              <Link href="/contact" className="block px-6 py-3 rounded-lg border border-black/20 bg-black/5 text-[#1A1A1A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#1A1A1A] hover:text-white">
                Contact
              </Link>
            
            </div>
          </div>
        </nav>

        <main className="flex-grow flex flex-col relative z-10 w-full m-0 p-0">
          {children}
        </main>

      </body>
    </html>
  );
}