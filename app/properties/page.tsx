"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function PropertiesPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-yellow-50 via-yellow-100 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="hero-section pb-12 mb-12 rounded-2xl shadow-lg">
          <div className="px-8 py-12 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Explora Nuestras Propiedades
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Descubre más de 1,000 propiedades únicas para comprar, alquilar o invertir en
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
            <div className="w-full sm:w-64 relative">
              <input
                type="text"
                placeholder="Buscar propiedades..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer">Todas</Badge>
              <Badge variant="default" className="cursor-pointer">Casa</Badge>
              <Badge variant="default" className="cursor-pointer">Apartamento</Badge>
              <Badge variant="default" className="cursor-pointer">Terreno</Badge>
              <Badge variant="default" className="cursor-pointer">Luxuriossa</Badge>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section>
          <div className="grid-responsive gap-6">
            {loading ? (
              <div className="min-h-60 flex items-center justify-center col-span-full">
                <div className="loading-spinner" />
                <span className="ml-4 text-muted-foreground">Cargando propiedades...</span>
              </div>
            ) : (
              <div>
                {(properties || []).map((property: any) => (
                  <Card key={property.id} className="property-card hover:shadow-xl transition-shadow cursor-pointer">
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
                      <Button className="mt-4 w-full">Ver Detalle →</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}