
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string | number;
  image: string;
  color: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#1A1A1A]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[85vh] overflow-hidden">

        {/* Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/img2.jpg')",
          }}
        />

        {/* Bottom Gradient
            Keeps the original image visible while making
            the text readable at the bottom.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        />

        {/* Slight overall overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/5"
        />

        {/* Hero Content */}
        <div className="relative z-10 min-h-[85vh] flex items-end">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 pb-14 md:pb-20">

            <div className="max-w-3xl text-white">

              {/* Small Label */}
              <p className="text-sm md:text-base uppercase tracking-[0.35em] font-semibold text-[#D4AF37] mb-4">
                House Folard
              </p>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-5 drop-shadow-lg">
                L&apos;élégance
                <br />
                de la soie
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed mb-8 drop-shadow-md">
                L&apos;art du foulard, pensé pour celles et ceux qui
                recherchent élégance, finesse et caractère.
              </p>

              {/* Button */}
              <Link
                href="/products"
                className="inline-flex items-center bg-[#1A1A1A] text-white py-4 px-9 rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-xl"
              >
                Je Découvre
              </Link>

            </div>
          </div>
        </div>

      </section>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="py-20 px-6 md:px-16">

        <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] text-center mb-16">
          Notre Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-500"
            >

              <div className="relative overflow-hidden aspect-[3/4]">

                <img
                  src={product.image}
                  alt={product.color}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-5 bg-white text-center border-t border-black/5">

                <h3 className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold mb-1">
                  {product.color}
                </h3>

                <p className="text-lg font-bold text-[#1A1A1A]">
                  {product.price} DHS
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* View All Products */}
        {products.length > 0 && (
          <div className="mt-16 text-center">

            <Link
              href="/products"
              className="text-sm uppercase tracking-widest font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              Voir tout le catalogue
            </Link>

          </div>
        )}

      </section>

    </div>
  );
}

