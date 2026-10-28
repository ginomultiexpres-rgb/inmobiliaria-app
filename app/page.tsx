"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
        if (error) console.error(error);
        setProperties(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-6xl mx-auto p-8">
        <Link href="/properties" className="text-sm text-gray-600 hover:text-primary mb-6 inline-block">
          ← Volver a propiedades
        </Link>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-zinc-900">InmoCore - Inmobiliaria Digital</h1>
          <Button>+ Ver propiedades</Button>
        </div>
        {loading ? (
          <p className="text-muted-foreground mb-8">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(properties || []).map((property: any) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow cursor-pointer" >
                <CardHeader>
                  <Image 
                    src={property.image_url || property.images?.[0]} 
                    alt={property.title} 
                    width={400} 
                    height={300}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <CardTitle>{property.title}</CardTitle>
                  <Badge variant="secondary">{property.type}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <p className="text-xl font-bold mt-2">{property.price}</p>
                  <Button  className="mt-4">Ver Detalle →</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
