"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  image: string;
  color: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction intelligente pour ouvrir WhatsApp directement
  const handleDirectOrder = (e: React.MouseEvent<HTMLAnchorElement>, product: Product) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    
    // REMPLACEZ CE NUMÉRO PAR LE VÔTRE (format: 2126XXXXXXXX sans le +)
    const phoneNumber = "212656908786"; 
    const message = `Bonjour House Folard  ! ✨\n\nJe souhaite commander ce produit :\n- Article : ${product.color}\n- Prix : ${product.price} DHS\n- Image : ${product.image}\n\nMerci !`;
    const encodedMessage = encodeURIComponent(message);
    
    // Détection du type d'appareil (Mobile ou PC)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Sur Téléphone : Force l'ouverture directe de l'application WhatsApp
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else {
      // Sur PC : Ouvre directement WhatsApp Web sans passer par la page de redirection
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, "_blank");
    }
  };

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading products:", error);
      } else if (data) {
        setProducts(data);
      }
      setLoading(false);
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 bg-[#F4F1EA] text-[#1A1A1A]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-block mb-6 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#D4AF37] transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide">
            Notre Collection
          </h1>
          <p className="text-gray-600 font-serif italic">
            Découvrez nos châles et foulards exclusifs.
          </p>
        </div>

        {/* État de chargement */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37]"></div>
          </div>
        ) : products.length === 0 ? (
          /* Si aucun produit n'est disponible */
          <div className="text-center py-20 bg-white/60 border border-black/5 rounded-2xl max-w-xl mx-auto shadow-sm">
            <p className="text-gray-500 font-serif">
              Aucun produit disponible pour le moment.
            </p>
          </div>
        ) : (
          /* Grille de produits */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-full aspect-[3/4] bg-white border border-black/10 shadow-sm flex items-center justify-center mb-6 overflow-hidden relative transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img
                    src={product.image}
                    alt={product.color}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Bouton WhatsApp avec détection d'appareil */}
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <a 
                      href="#"
                      onClick={(e) => handleDirectOrder(e, product)}
                      className="bg-[#1A1A1A] text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-lg hover:-translate-y-1 inline-block"
                    >
                      Commander
                    </a>
                  </div>
                </div>

                <h3 className="text-lg font-serif tracking-wide text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors font-bold">
                  {product.color}
                </h3>
                <p className="text-sm text-gray-600 mt-2 font-medium">
                  {product.price} DHS
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}