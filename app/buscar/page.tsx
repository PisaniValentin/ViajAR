"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  MapPin,
  ArrowDown,
  Search,
  Clock,
  Wallet,
  Zap,
  ChevronRight,
  Home,
  Route,
  Heart,
  User,
  Bus,
  Car,
  Plane,
} from "lucide-react";

// --- INTERFACES DE DATOS (ESTRUCTURA DEL GRAFO) ---
interface Edge {
  id: string;
  transportType: string;
  icon: React.ReactNode;
  originNode: string;
  destinationNode: string;
  cost: number;
  costLabel: string;
  timeLabel: string;
}

interface RoutePath {
  type: "cheapest" | "fastest";
  totalCost: string;
  totalTime: string;
  edges: Edge[];
}

interface MockDatabase {
  [key: string]: {
    cheapest: RoutePath;
    fastest: RoutePath;
  };
}

// --- DATOS SIMULADOS (POOL DE NODOS Y ARCOS) ---
// Fijate que ahora los íconos ya traen su clase "w-4 h-4" directamente.
const mockGraph: MockDatabase = {
  "BHI-BRC": {
    cheapest: {
      type: "cheapest",
      totalCost: "$ 45.800",
      totalTime: "14h 30m",
      edges: [
        {
          id: "e1",
          transportType: "Colectivo Local",
          icon: <Bus className="w-4 h-4" />,
          originNode: "Tu ubicación (Centro)",
          destinationNode: "Terminal de Ómnibus BHI",
          cost: 800,
          costLabel: "$ 800",
          timeLabel: "30m",
        },
        {
          id: "e2",
          transportType: "Micro Larga Distancia",
          icon: <Bus className="w-4 h-4" />,
          originNode: "Terminal de Ómnibus BHI",
          destinationNode: "Terminal Bariloche",
          cost: 45000,
          costLabel: "$ 45.000",
          timeLabel: "14h 0m",
        },
      ],
    },
    fastest: {
      type: "fastest",
      totalCost: "$ 128.500",
      totalTime: "3h 45m",
      edges: [
        {
          id: "e3",
          transportType: "Uber / Cabify",
          icon: <Car className="w-4 h-4" />,
          originNode: "Tu ubicación (Centro)",
          destinationNode: "Aeropuerto Espora (BHI)",
          cost: 4500,
          costLabel: "$ 4.500",
          timeLabel: "20m",
        },
        {
          id: "e4",
          transportType: "Vuelo Directo",
          icon: <Plane className="w-4 h-4" />,
          originNode: "Aeropuerto Espora (BHI)",
          destinationNode: "Aeropuerto BRC",
          cost: 115000,
          costLabel: "$ 115.000",
          timeLabel: "1h 45m",
        },
        {
          id: "e5",
          transportType: "Taxi",
          icon: <Car className="w-4 h-4" />,
          originNode: "Aeropuerto BRC",
          destinationNode: "Centro Cívico",
          cost: 9000,
          costLabel: "$ 9.000",
          timeLabel: "40m",
        },
      ],
    },
  },
};

// --- COMPONENTE PRINCIPAL ---
export default function DemoCalculoRutas() {
  const [origin, setOrigin] = useState("BHI");
  const [destination, setDestination] = useState("BRC");
  const [results, setResults] = useState<{
    cheapest: RoutePath;
    fastest: RoutePath;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setResults(null);

    // Simulamos el tiempo de procesamiento del algoritmo del grafo
    setTimeout(() => {
      const routeKey = `${origin}-${destination}`;
      if (mockGraph[routeKey]) {
        setResults(mockGraph[routeKey]);
      } else {
        alert("Para esta demo, probá la combinación Bahía Blanca -> Bariloche");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-24 font-sans text-slate-800">
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm relative z-20">
        <Menu className="w-6 h-6 text-slate-600" />
        <h1 className="text-xl font-bold text-blue-900">
          viaj<span className="text-sky-500">AR</span>{" "}
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full ml-1">
            DEMO
          </span>
        </h1>
        <Bell className="w-6 h-6 text-slate-600" />
      </header>

      <main className="p-4 space-y-6">
        {/* CARD DE BÚSQUEDA (INPUTS) */}
        <section className="bg-white rounded-2xl shadow-sm p-5 border border-slate-200">
          <h2 className="text-sm font-bold text-slate-800 mb-4">
            Simulador de Rutas
          </h2>
          <div className="space-y-3 relative">
            {/* Selector Origen */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Nodo de Origen
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-sky-500 transition-colors">
                <MapPin className="w-5 h-5 text-blue-500" />
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-sm font-medium text-slate-700 w-full appearance-none"
                >
                  <option value="BHI">Bahía Blanca (Buenos Aires)</option>
                  <option value="CABA">CABA (Buenos Aires)</option>
                </select>
              </div>
            </div>

            {/* Conector Visual */}
            <div className="absolute left-8 top-[60px] bottom-[60px] w-0.5 bg-slate-200 z-0 hidden sm:block"></div>

            {/* Selector Destino */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Nodo de Destino
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-sky-500 transition-colors">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-sm font-medium text-slate-700 w-full appearance-none"
                >
                  <option value="BRC">San Carlos de Bariloche</option>
                  <option value="MDZ">Mendoza (Capital)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full mt-2 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? "Calculando rutas..." : "Calcular Mejor Ruta"}
              {!isLoading && <Search className="w-4 h-4" />}
            </button>
          </div>
        </section>

        {/* RESULTADOS DEL GRAFO */}
        {results && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Camino Más Barato */}
            <RouteResultCard
              title="Camino más barato"
              badge="Menor costo"
              badgeColor="bg-emerald-100 text-emerald-700"
              iconTitle={<Wallet className="w-4 h-4 text-emerald-600" />}
              data={results.cheapest}
            />

            {/* Camino Más Rápido */}
            <RouteResultCard
              title="Camino más rápido"
              badge="Menor tiempo"
              badgeColor="bg-purple-100 text-purple-700"
              iconTitle={<Zap className="w-4 h-4 text-purple-600" />}
              data={results.fastest}
            />
          </section>
        )}
      </main>

      {/* NAV BAR INFERIOR */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-3 z-50">
        <NavItem icon={<Home />} label="Inicio" href="/" />
        <NavItem icon={<Route />} label="Demo" href="/demo" active />
        <NavItem icon={<Heart />} label="Favoritos" href="/favoritos" />
        <NavItem icon={<User />} label="Contacto" href="/contacto" />
      </nav>
    </div>
  );
}

// --- SUB-COMPONENTES PARA RENDERIZAR RESULTADOS ---

function RouteResultCard({
  title,
  badge,
  badgeColor,
  iconTitle,
  data,
}: {
  title: string;
  badge: string;
  badgeColor: string;
  iconTitle: React.ReactNode;
  data: RoutePath;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Cabecera del resultado */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {iconTitle}
            <h3 className="font-extrabold text-slate-800">{title}</h3>
          </div>
          <span
            className={`${badgeColor} text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider`}
          >
            {badge}
          </span>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Clock className="w-4 h-4" /> Duración total: {data.totalTime}
          </div>
          <span className="font-black text-lg text-slate-900">
            {data.totalCost}
          </span>
        </div>
      </div>

      {/* Tramos / Arcos del Grafo */}
      <div className="p-5">
        <div className="space-y-0 relative ml-2">
          {/* Línea conectora del grafo */}
          <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-slate-200 z-0"></div>

          {data.edges.map((edge, index) => {
            const isLast = index === data.edges.length - 1;
            return (
              <div key={edge.id} className="relative z-10 pb-6 last:pb-0">
                <div className="flex gap-4">
                  {/* Nodo Visual */}
                  <div className="flex flex-col items-center mt-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${isLast ? "bg-emerald-500" : "bg-sky-500"}`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Datos del Arco */}
                  <div className="flex-1 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {/* Renderizado simple y seguro del ícono */}
                        <div className="p-1.5 bg-slate-100 text-slate-600 rounded-md">
                          {edge.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          {edge.transportType}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        {edge.costLabel}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <span className="truncate">{edge.originNode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <ArrowDown className="w-3 h-3 text-slate-300 ml-[-3px]" />
                        <span>{edge.timeLabel} de viaje</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-800 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        <span className="truncate">{edge.destinationNode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTE NAV ---
function NavItem({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || active;

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
