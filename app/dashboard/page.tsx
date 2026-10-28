"use client"

"use client";

import { useState } from "react";
import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleAddProperty = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-start mb-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-primary">
            ← Volver al inicio
          </Link>
          
          <Button variant="default" onClick={handleAddProperty}>
            + Agregar Nueva Propiedad
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 text-zinc-900">Dashboard Administrativo</h1>
        
        <p className="text-muted-foreground mb-6">
          Bienvenido al panel de control de InmoCore. Aquí puedes gestionar propiedades, clientes y contratos.
        </p>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6">
            <div className="text-3xl font-bold text-zinc-900 mb-2">Properties</div>
            <div className="text-sm text-muted-foreground">Propiedades</div>
          </div>
          <div className="bg-card rounded-xl p-6">
            <div className="text-3xl font-bold text-zinc-900 mb-2">12</div>
            <div className="text-sm text-muted-foreground">Clientes</div>
          </div>
          <div className="bg-card rounded-xl p-6">
            <div className="text-3xl font-bold text-zinc-900 mb-2">8</div>
            <div className="text-sm text-muted-foreground">Contratos</div>
          </div>
          <div className="bg-card rounded-xl p-6">
            <div className="text-3xl font-bold text-zinc-900 mb-2">5</div>
            <div className="text-sm text-muted-foreground">Dashboard</div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">Propiedades Recientes</h2>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Gestiona tus propiedades desde el panel administrativo.</p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="col-span-2 md:col-span-1"
            onClick={handleAddProperty}
          >
            Agregar Propiedad
          </Button>
          <Button variant="outline">Clientes</Button>
          <Button variant="outline">Contratos</Button>
        </div>
        
        {/* Properties Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-zinc-900">Mis Propiedades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <p className="text-sm text-muted-foreground">Propiedades cargadas desde Supabase.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
