"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("clients")
        .insert([{ full_name: formData.full_name, email: formData.email, phone: formData.phone }]);
      
      if (error) throw error;
      router.push("/clients");
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Error al crear el cliente. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900">Nuevo Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-zinc-500 mb-1">
            Nombre completo
          </label>
          <Input 
            type="text" 
            name="full_name"
            className="w-full" 
            placeholder="Ej: Juan Pérez"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-zinc-500 mb-1">
            Correo electrónico
          </label>
          <Input 
            type="email" 
            name="email"
            className="w-full" 
            placeholder="Ej: juan@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-zinc-500 mb-1">
            Teléfono
          </label>
          <Input 
            type="text" 
            name="phone"
            className="w-full" 
            placeholder="Ej: +56 9 1234 5678"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-end mb-6">
          <Button 
            type="submit" 
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cliente"}
          </Button>
        </div>
        <Link href="/clients">
          <Button variant="outline" className="w-full">
            Cancelar
          </Button>
        </Link>
      </form>
    </div>
  );
}
