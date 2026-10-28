import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default async function ContractsPage() {
  const { data: contracts } = await supabase
    .from("contracts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-zinc-900">Contratos</h1>
          <Link href="/contracts/nuevo" className="text-sm text-gray-600 hover:text-primary inline-block">
            + Nuevo Contrato
          </Link>
        </div>
        
        {contracts && contracts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts.map((contract: any) => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <h3 className="text-lg font-semibold">{contract.description}</h3>
                  <p className="text-sm text-muted-foreground">{contract.startDate}</p>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary mb-4">${contract.price}</div>
                  <p className="text-muted-foreground">{contract.status}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Propiedad: {contract.propertyId}</span>
                    <span>Comisión: {contract.commission}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No hay contratos registrados</p>
            <Link href="/contracts/nuevo" className="text-primary hover:underline">
              Crear primer contrato →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
