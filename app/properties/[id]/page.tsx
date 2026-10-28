import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function PropertyDetail({ params }: { params: { id: string } }) {
  const property = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!property.data) {
    notFound();
  }

  const propertyData = property.data;
  const images: string[] = [];

  // Fetch images
  const { data: imagesData } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", params.id);

  if (imagesData) {
    imagesData.forEach((img: any) => {
      images.push(img.image_url || img.url);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-6xl mx-auto p-8">
        <Link href="/properties" className="text-sm text-gray-600 hover:text-primary inline-block mb-6">
          ← Volver a propiedades
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {images.length > 0 ? (
              <Image
                src={images[0]}
                alt={propertyData.title}
                width={800}
                height={600}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Sin imagen</span>
              </div>
            )}
          </div>
          
          <div>
            <Badge variant="secondary" className="mb-2">{propertyData.type}</Badge>
            <h1 className="text-3xl font-bold mb-2">{propertyData.title}</h1>
            <p className="text-muted-foreground mb-4">{propertyData.location}</p>
            <div className="text-4xl font-bold text-primary mb-4">${propertyData.price}</div>
            <p className="text-sm text-muted-foreground mb-6">{propertyData.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
