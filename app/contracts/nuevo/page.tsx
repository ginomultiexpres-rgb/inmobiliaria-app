"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewContractForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    propertyId: "",
    clientId: "",
    price: "",
    startDate: "",
    endDate: "",
    commission: "",
    status: "Activo",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from("contracts")
      .insert({
        ...formData,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating contract:", error);
      return;
    }

    router.push("/contracts");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-2xl mx-auto bg-card rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900">Nuevo Contrato</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Propiedad</p>
              <Input 
                placeholder="ID de la propiedad" 
                value={formData.propertyId}
                onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                disabled
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Cliente</p>
              <Input 
                placeholder="ID del cliente" 
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                disabled
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Precio</p>
              <Input 
                placeholder="Precio" 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Fecha Inicio</p>
              <Input 
                placeholder="Fecha inicio" 
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Fecha Fin</p>
              <Input 
                placeholder="Fecha fin" 
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Comisión</p>
              <Input 
                placeholder="Comisión" 
                value={formData.commission}
                onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Descripción</p>
              <Input 
                placeholder="Descripción" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Estado</p>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded border px-3 py-2"
              >
                <option value="Activo">Activo</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Guardar Contrato
          </Button>
        </form>
      </div>
    </div>
  );
}
