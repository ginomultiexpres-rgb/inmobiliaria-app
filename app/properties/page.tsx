"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const propertyTypes = ["Departamento", "Casa", "Oficina", "Terreno"];

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) console.error("Error fetching properties:", error);
        setProperties(data || []);
      } catch (err) {
        console.error("Exception fetching properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900">Propiedades</h1>

        <Input
          placeholder="Buscar propiedades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 max-w-md"
        />

        <div className="mb-6 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setSearchTerm("")}>Volver</Button>
          <Button variant="outline" onClick={() => setSelectedType("")}>Mostrar Todo</Button>
          <Button variant="outline" onClick={() => setPriceRange({ min: "", max: "" })}>Filtro Precio</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <PropertyCard key={property.id} id={property.id} title={property.title} location={property.location} price={property.price} type={property.type} images={property.images} />
          ))}
        </div>
      </main>
    </div>
  );
}
