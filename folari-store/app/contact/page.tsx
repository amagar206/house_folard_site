export default function Contact() {
  return (
    <div className="min-h-screen py-24 px-6 bg-[#F4F1EA] flex items-center justify-center">
      <div className="bg-white p-12 shadow-xl max-w-lg w-full text-center border-t-4 border-[#D4AF37]">
        <h1 className="text-4xl font-serif mb-4 tracking-wide text-[#1A1A1A]">
          Contactez-Nous
        </h1>
        <p className="text-gray-500 font-serif italic mb-10">
          Nous sommes à votre disposition pour toute demande.
        </p>

        <div className="space-y-6 text-left">
          <div className="flex flex-col items-center border-b border-gray-100 pb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Direction</span>
            <span className="text-xl font-serif text-[#1A1A1A]">Mohamed Bolbaroud</span>
          </div>

          <div className="flex flex-col items-center border-b border-gray-100 pb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Téléphone / WhatsApp</span>
            <a href="tel:0656908786" className="text-xl font-serif text-[#D4AF37] hover:text-black transition-colors">
              06 56 90 87 86
            </a>
          </div>
          
          <div className="flex flex-col items-center pt-4">
             <a 
               href="https://wa.me/212656908786" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-[#1A1A1A] text-white px-8 py-3 tracking-[0.1em] uppercase text-xs hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
             >
               Envoyer un message
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}