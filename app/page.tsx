"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TramoProps {
  icon: React.ReactNode;
  titulo: string;
  horario: string;
  precio: string;
  last?: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}

import {
  Menu,
  Bell,
  MapPin,
  ArrowUpDown,
  Calendar,
  Search,
  Clock,
  Info,
  ChevronRight,
  Home,
  Route,
  Heart,
  User,
  Bus,
  Car,
  Train,
} from "lucide-react"; // Usamos lucide-react para los íconos

export default function ViajarLayout() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 relative font-sans text-slate-800">
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 bg-white">
        <Menu className="h-6" />
        <Bell className="w-6 h-6" />
      </header>

      {/* BANNER ILUSTRACIÓN */}
      <section className="relative w-full h-32 bg-sky-50 overflow-hidden">
        {/* Aquí iría tu imagen ViajarBanner.png */}
        <div className="absolute inset-0 flex items-end justify-center">
          <Image
            src="/ViajarBanner.png"
            alt="Banner transportes"
            width={400}
            height={120}
            className="object-contain"
          />
        </div>
      </section>

      <main className="px-4 -mt-4 relative space-y-4">
        {/* CARD DE BÚSQUEDA */}
        <section className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
          <div className="space-y-3">
            {/* Origen */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                A
              </div>
              <input
                type="text"
                placeholder="Lugar de Origen"
                className="bg-transparent flex-1 outline-none text-sm"
              />
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>

            {/* Destino */}
            <div className="relative">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                  B
                </div>
                <input
                  type="text"
                  placeholder="Lugar de Destino"
                  className="bg-transparent flex-1 outline-none text-sm"
                />
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Fecha */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <Calendar className="w-5 h-5 text-slate-400" />
              <span className="text-sm flex-1">Hoy, 10:00 AM</span>
              <ChevronRight className="w-4 h-4 rotate-90 text-slate-400" />
            </div>

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              Buscar mejores opciones
              <Search className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* RUTA RECOMENDADA */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-bold">Ruta recomendada</h2>
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Más económica
                </span>
              </div>
            </div>

            <div className="flex justify-between text-xs text-slate-500 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Duración total: 5h 20m
              </span>
              <span className="font-bold text-green-600 text-sm">$ 4.250</span>
            </div>

            {/* Timeline de tramos */}
            <div className="space-y-6 relative ml-4 border-l-2 border-dotted border-slate-200 pl-6">
              <Tramo
                icon={<Bus />}
                titulo="Tramo 1 - Colectivo"
                horario="10:15 AM - 11:05 AM (50m)"
                precio="$ 650"
              />
              <Tramo
                icon={<Car />}
                titulo="Tramo 2 - Uber"
                horario="11:20 AM - 12:05 PM (45m)"
                precio="$ 1.800"
              />
              <Tramo
                icon={<Train />}
                titulo="Tramo 3 - Tren"
                horario="12:30 PM - 3:35 PM (3h 5m)"
                precio="$ 1.800"
                last
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 flex justify-between items-center text-[11px] border-t border-slate-100">
            <span className="flex items-center gap-1 text-slate-500">
              <Info className="w-3 h-3" /> Precio estimado por persona
            </span>
            <button className="text-sky-600 font-bold flex items-center">
              Ver detalle <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </section>
      </main>

      {/* NAV BAR INFERIOR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <NavItem icon={<Home />} label="Inicio" href="/" />
        <NavItem icon={<Route />} label="Mis rutas" href="/mis_rutas" />
        <NavItem icon={<Heart />} label="Favoritos" href="/favoritos" />
        <NavItem icon={<User />} label="Contacto" href="/contacto" />
      </nav>
    </div>
  );
}

function Tramo({ icon, titulo, horario, precio, last = false }: TramoProps) {
  return (
    <div className="relative">
      {/* Punto del timeline */}
      <div
        className={`absolute -left-8.25 top-1 w-4 h-4 rounded-full border-2 border-white ${last ? "bg-green-500" : "bg-blue-500"}`}
      />

      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            {icon}
          </div>
          <div>
            <h3 className="text-xs font-bold">{titulo}</h3>
            <p className="text-[10px] text-slate-500">{horario}</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-sky-700">{precio}</span>
      </div>
    </div>
  );
}

// Sub-componente NavItem con su interfaz
function NavItem({ icon, label, href }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 transition-colors ${
        isActive ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-[10px] font-bold">{label}</span>
    </Link>
  );
}
