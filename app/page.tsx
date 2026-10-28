"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false })
        if (error) console.error(error)
        setProperties(data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-yellow-50 via-yellow-100">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <section className="hero-section pb-20 md:pb-32">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="inline-block mb-6">
              <Badge variant="default">Propiedades Destacadas</Badge>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Encuentra tu hogar <span className="text-yellow-400">ideal</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Explora una amplia selección de propiedades inmobiliarias con características únicas y
              las mejores ubicaciones. Tu próximo inicio comienza aquí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">Ver Propiedades</Button>
              <Button className="btn-outline">Más información</Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="py-20 sm:py-32">
          <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="min-h-60 flex items-center justify-center">
                <div className="loading-spinner" />
                <span className="ml-4 text-muted-foreground">Cargando propiedades...</span>
              </div>
            ) : (
              <div>
                {(properties || []).map((property: any) => (
                  <Card key={property.id} className="property-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <Image
                        src={property.image_url || property.images?.[0]}
                        alt={property.title}
                        width={500}
                        height={350}
                        className="rounded-lg w-full h-48 object-cover mb-4"
                      />
                      <CardTitle>{property.title}</CardTitle>
                      <Badge variant="secondary">{property.type}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                      <p className="text-xl font-bold mt-2">{property.price}</p>
                      <Button className="mt-4">Ver Detalle →</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}