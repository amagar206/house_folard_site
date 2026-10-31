export default function About() {
  return (
    <div className="min-h-screen py-24 px-6 bg-[#F4F1EA]">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-10 tracking-wide text-[#1A1A1A]">
          Notre Histoire
        </h1>
        
        <div className="space-y-8 text-lg text-gray-700 font-serif leading-relaxed">
          <p>
            Bienvenue chez <span className="font-bold text-black">House Folard</span>, votre destination de choix pour l'élégance authentique et le raffinement.
          </p>
          <p>
            Nous sommes passionnés par l'art du textile et spécialisés dans la vente de produits Folari d'exception. Notre collection met à l'honneur la richesse des designs <strong>marocains et arabes</strong>, soigneusement sélectionnés pour vous offrir une qualité inégalée et un style intemporel.
          </p>
          <p>
            Chaque pièce de notre boutique célèbre l'héritage culturel tout en s'inscrivant dans la modernité, conçue pour sublimer votre quotidien avec grâce et sophistication.
          </p>
        </div>
        
        <div className="mt-16 w-24 h-px bg-[#D4AF37] mx-auto"></div>
      </div>
    </div>
  );
}