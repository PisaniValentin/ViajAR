"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Home, Route, Heart, User, Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-[100dvh]  font-sans text-slate-800 flex flex-col relative overflow-hidden shadow-2xl">
      {/* CONTENEDOR DE LA IMAGEN DE FONDO */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/FondoSinNada.png"
          alt="Fondo de bienvenida"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Capa 1: Oscurece toda la imagen y le aplica el Blur */}
        {/* Podés jugar con el bg-black/40 (ej: bg-black/60) y con el blur (ej: backdrop-blur-md) */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Capa 2: Degradado protector más intenso abajo para el texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      {/* CONTENIDO PRINCIPAL (justify-end empuja todo hacia abajo) */}
      <main className="flex-1 flex flex-col justify-end items-center px-6 pt-10 pb-6 overflow-hidden z-10 animate-in fade-in duration-700">
        <Image
          src="/ViajarLogo.png"
          alt="Logo ViajAR"
          height={700}
          width={700}
          className="object-cover object-center"
        />
        {/* TEXTOS DE BIENVENIDA */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl font-extrabold text-slate-100 drop-shadow-sm">
            Tu viaje ideal, <br /> al mejor precio.
          </h2>
          <p className="text-sm text-slate-200 font-medium leading-relaxed px-2">
            Compará transportes, encontrá la ruta más rápida o la económica y
            organizá tu destino.
          </p>
        </div>

        {/* BOTÓN DE ACCIÓN (CTA) */}
        <div className="shrink-0">
          <Link
            href="/buscar"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold p-2 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-900/20 group"
          >
            Comenzar a buscar
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      {/* NAV BAR INFERIOR */}
      <nav className="shrink-0 bg-white border-t flex justify-around py-3 z-50">
        <NavItem icon={<Home />} label="Inicio" href="/" active />
        <NavItem icon={<Search />} label="Buscar" href="/buscar" />
        <NavItem icon={<Route />} label="Mis Viajes" href="/mis_viajes" />
        <NavItem icon={<Heart />} label="Favoritos" href="/favoritos" />
        <NavItem icon={<User />} label="Contacto" href="/contacto" />
      </nav>
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
