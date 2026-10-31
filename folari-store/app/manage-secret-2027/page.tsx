"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminSecretPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  
  // States for form and image upload
  const [form, setForm] = useState({ price: "", color: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // The password for the admin area
  const SECRET_PIN = "Oop    /////4547885@^!";

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !form.price || !form.color) {
      alert("Veuillez remplir tous les champs et sélectionner une image.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // 2. Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      
      const imageUrl = publicUrlData.publicUrl;

      // 3. Save product to database
      const { error: dbError } = await supabase.from("products").insert([
        { 
          image: imageUrl, 
          color: form.color.trim(), 
          price: parseFloat(form.price) 
        }
      ]);

      if (dbError) throw dbError;

      alert("Produit ajouté avec succès !");
      setForm({ price: "", color: "" });
      setImageFile(null);
      
      // Reset file input UI
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      fetchProducts();
    } catch (error: any) {
      console.error("Erreur:", error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (!confirmDelete) return;

    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            if (pin === SECRET_PIN) setIsAuthenticated(true); 
            else alert("PIN incorrect");
          }} 
          className="bg-white/5 p-8 rounded-xl border border-white/10 text-center shadow-2xl backdrop-blur-md w-full max-w-sm mx-4"
        >
          <h2 className="text-2xl text-white font-serif mb-6 drop-shadow-md">Portail Sécurisé</h2>
          <input 
            type="password" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
            placeholder="Code PIN" 
            className="bg-black/50 text-white p-3 text-center rounded-lg mb-6 w-full border border-white/20 focus:outline-none focus:border-amber-500 transition-colors" 
          />
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-lg transition-colors">
            Déverrouiller
          </button>
        </form>
      </div>
    );
  }

  // --- ADMIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto py-16 px-6 text-white">
        <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-8">
          <h1 className="text-3xl font-serif">Admin - Supabase</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Se déconnecter
          </button>
        </div>
        
        {/* Add Product Form */}
        <div className="bg-white/5 p-8 rounded-xl mb-12 border border-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-xl mb-6 font-semibold text-amber-500">Ajouter un nouveau produit</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Image du produit (PC)</label>
              <input 
                id="image-upload"
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full bg-black/50 p-2 text-gray-300 border border-white/20 rounded focus:outline-none focus:border-amber-500 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400" 
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Couleur / Nom</label>
              <input 
                type="text" 
                placeholder="Ex: Rouge Sombre" 
                value={form.color} 
                onChange={e => setForm({...form, color: e.target.value})} 
                className="w-full bg-black/50 p-3 text-white border border-white/20 rounded focus:outline-none focus:border-amber-500 transition-colors" 
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Prix (DHS)</label>
              <input 
                type="number" 
                placeholder="Ex: 250" 
                value={form.price} 
                onChange={e => setForm({...form, price: e.target.value})} 
                className="w-full bg-black/50 p-3 text-white border border-white/20 rounded focus:outline-none focus:border-amber-500 transition-colors" 
              />
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded w-full font-bold transition-all disabled:opacity-50 mt-4 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              {submitting ? "Téléchargement en cours..." : "Ajouter au stock"}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-xl mb-6 font-semibold text-amber-500">Stock en Ligne ({products.length})</h2>
          <div className="space-y-4">
            {products.length === 0 ? (
              <p className="text-gray-500 italic">Aucun produit dans la base de données.</p>
            ) : (
              products.map(p => (
                <div key={p.id} className="flex flex-col sm:flex-row justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={p.image} alt={p.color} className="w-16 h-16 object-cover rounded-md border border-white/10" />
                    <div>
                      <p className="font-bold text-lg">{p.color}</p>
                      <p className="text-sm text-amber-400">{p.price} DHS</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteProduct(p.id)} 
                    className="w-full sm:w-auto text-red-400 text-sm border border-red-400/30 px-4 py-2 rounded hover:bg-red-400/10 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}