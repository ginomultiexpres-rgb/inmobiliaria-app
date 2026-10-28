import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images: string[];
  featured?: boolean;
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  type,
  bedrooms,
  bathrooms,
  area,
  images,
  featured,
}: PropertyCardProps) {
  const primaryImage = images?.length > 0 ? images[0] : "/placeholder-property.jpg"
  const imageUrl = primaryImage
  
  return (
    <Link href={`/properties/${id}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            priority={false}
            unoptimized={!imageUrl.includes("/api/")}
          />
          {featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive">Destacado</Badge>
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary">{type}</Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            📍 {location}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-4 text-sm text-muted-foreground">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <span>🛏️</span>
                <span>{bedrooms} hab.</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <span>🚿</span>
                <span>{bathrooms} ba.</span>
              </div>
            )}
            {area && (
              <div className="flex items-center gap-1">
                <span>📐</span>
                <span>{area}m²</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="text-lg font-bold text-primary">
            {price}
          </div>
          <div className="text-sm text-muted-foreground">
            Ver detalles →
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
