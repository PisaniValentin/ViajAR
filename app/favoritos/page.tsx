"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Home,
  Route,
  Heart,
  User,
  Construction,
  Hammer,
  TriangleAlert,
  Search,
} from "lucide-react";

// --- INTERFACES ---
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

// --- COMPONENTE PRINCIPAL ---
export default function FavoritosPage() {
  return (
    <div className=" bg-white min-h-screen pb-24 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 bg-white border-b border-slate-50">
        <Menu className="w-6 h-6 text-slate-600" />
        <h1 className="text-2xl font-bold text-blue-900">
          viaj<span className="text-sky-500">AR</span>
        </h1>
        <Bell className="w-6 h-6 text-slate-600" />
      </header>

      {/* CONTENIDO DE "EN CONSTRUCCIÓN" */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center space-y-6">
        <div className="relative">
          {/* Círculo de fondo suave */}
          <div className="w-32 h-32 bg-amber-50 rounded-full flex items-center justify-center animate-pulse">
            <Construction className="w-16 h-16 text-amber-500" />
          </div>
          {/* Icono pequeño flotante */}
          <div className="absolute -top-2 -right-2 bg-white p-2 rounded-lg shadow-md border border-slate-100">
            <Hammer className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-amber-600">
            <TriangleAlert className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-xs">
              Próximamente
            </span>
          </div>
          <h2 className="text-2xl font-black text-blue-900">
            Sección en construcción
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Estamos trabajando para que puedas guardar tus rutas preferidas y
            acceder a ellas más rápido. ¡Volvé pronto para ver las novedades!
          </p>
        </div>

        {/* Botón opcional para volver al inicio */}
        <Link
          href="/"
          className="px-6 py-3 bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95"
        >
          Volver al inicio
        </Link>
      </main>

      {/* NAV BAR INFERIOR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-50">
        <NavItem icon={<Home />} label="Inicio" href="/" />
        <NavItem icon={<Search />} label="Buscar" href="/buscar" />
        <NavItem icon={<Route />} label="Mis Viajes" href="/mis_viajes" />
        <NavItem icon={<Heart />} label="Favoritos" href="/favoritos" />
        <NavItem icon={<User />} label="Contacto" href="/contacto" />
      </nav>
    </div>
  );
}

// --- SUB-COMPONENTE NAV ---
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
