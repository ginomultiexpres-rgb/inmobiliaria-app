import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-background border-b border-input sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-foreground">
          InmoCore
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/properties" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Propiedades
          </Link>
          <Link href="/clients" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Clientes
          </Link>
          <Link href="/contratos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contratos
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
        </div>
        
        <div className="hidden md:block">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-9 px-4 py-2"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
}
