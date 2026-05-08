"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
import {
  Menu,
  Bell,
  Home,
  Route,
  Heart,
  User,
  TrendingUp,
  PiggyBank,
  Clock,
} from "lucide-react";

// --- INTERFACES PARA TYPESCRIPT ---
interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}

interface RouteUsageProps {
  route: string;
  count: number;
  maxCount: number; // Para calcular el ancho de la barra
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}

// --- COMPONENTE PRINCIPAL ---
export default function MisRutasResumen() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-slate-800">
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 bg-white">
        <Menu className=" text-slate-600" />
        <h1 className="text-2xl font-bold text-blue-900">
          viaj<span className="text-sky-500">AR</span>
        </h1>
        <Bell className=" text-slate-600" />
      </header>

      <main className="p-4 space-y-6">
        {/* TÍTULO DE SECCIÓN */}
        <section>
          <h2 className="text-xl font-extrabold text-slate-900">Mis rutas</h2>
          <p className="text-sm text-slate-500 font-medium">
            Resumen de tu actividad
          </p>
        </section>

        {/* GRILLA DE ESTADÍSTICAS */}
        <section className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
            label="Rutas realizadas"
            value="28"
            subtext="este mes"
          />
          <StatCard
            icon={<PiggyBank className=" text-emerald-600" />}
            label="Dinero ahorrado"
            value="$ 18.500"
            subtext="este mes"
          />
          <StatCard
            icon={<Clock className=" text-orange-500" />}
            label="Tiempo ahorrado"
            value="6 h 30 min"
            subtext="este mes"
          />
        </section>

        {/* SECCIÓN DE RUTAS MÁS UTILIZADAS */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
              Tus rutas más utilizadas
            </h3>
            <button className="text-sky-600 text-xs font-bold hover:underline">
              Ver todas
            </button>
          </div>

          <div className="space-y-5">
            <RouteUsage route="Casa → Trabajo" count={8} maxCount={8} />
            <RouteUsage route="Córdoba → Carlos Paz" count={4} maxCount={8} />
            <RouteUsage route="Rosario → Santa Fe" count={3} maxCount={8} />
            <RouteUsage route="Córdoba → Mendoza" count={2} maxCount={8} />
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

// --- SUB-COMPONENTES ---

function StatCard({ label, value, subtext, icon }: StatCardProps) {
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
      <div className="mb-2 bg-slate-50 p-1.5 rounded-full">{icon}</div>
      <p className="text-[10px] font-bold text-slate-400 leading-tight mb-1">
        {label.toUpperCase()}
      </p>
      <p className="text-sm font-black text-slate-800">{value}</p>
      <p className="text-[9px] text-slate-400 mt-1">{subtext}</p>
    </div>
  );
}

function RouteUsage({ route, count, maxCount }: RouteUsageProps) {
  const percentage = (count / maxCount) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-slate-700">
        <span>{route}</span>
        <span className="text-slate-500 font-medium">{count} veces</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

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
