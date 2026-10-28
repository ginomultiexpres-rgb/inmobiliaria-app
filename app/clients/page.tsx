import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default async function ClientPage() {
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-zinc-900">Clientes</h1>
          <Link 
            href="/clients/new" 
            className="text-sm text-gray-600 hover:text-primary inline-block"
          >
            + Nuevo Cliente
          </Link>
        </div>
        
        {clients && clients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client: any) => (
              <Card key={client.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <h3 className="text-lg font-semibold">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{client.phone}</p>
                  <Link href={`/clients/${client.id}`} className="text-primary hover:underline text-sm">
                    Ver detalles →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No hay clientes registrados</p>
            <Link 
              href="/clients/new" 
              className="text-primary hover:underline"
            >
              Crear primer cliente →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
