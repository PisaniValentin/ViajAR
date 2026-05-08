"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Code,
  ChevronRight,
  Heart,
  Home,
  Route,
  User,
} from "lucide-react";

// --- INTERFACES ---
interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  iconColor: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

// --- COMPONENTE PRINCIPAL ---
export default function ContactoPage() {
  return (
    <div className=" bg-white min-h-screen pb-24 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 border-b border-slate-50">
        <Link href="/">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <h1 className="text-lg font-bold text-blue-900">Contactanos</h1>
        <div className="text-xl font-bold text-blue-900">
          viaj<span className="text-sky-500">AR</span>
        </div>
      </header>

      <main className="flex-1 px-6 py-4 space-y-8">
        {/* ILUSTRACIÓN Y TEXTO DE BIENVENIDA */}
        <section className="text-center space-y-4">
          <div className="relative w-full bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">
            {/* Aquí iría tu ilustración de equipo */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Mail className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white">
                <Code className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-blue-900">
              ¡Nos encantaría saber de vos!
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Si tenés dudas, sugerencias o encontraste algún problema, podés
              escribirnos. Nuestro equipo de desarrolladores está para ayudarte.
            </p>
          </div>
        </section>

        {/* LISTA DE CONTACTOS */}
        <section className="space-y-3">
          <ContactItem
            icon={<Mail className="w-6 h-6" />}
            title="Email"
            subtitle="hola@viajar.app"
            href="mailto:hola@viajar.app"
            iconColor="text-blue-500"
          />
          <ContactItem
            icon={<MessageCircle className="w-6 h-6" />}
            title="WhatsApp"
            subtitle="+54 99 9999 9999"
            href=""
            iconColor="text-emerald-500"
          />
        </section>

        {/* CARD SOBRE VIAJAR */}
        <section className="bg-sky-50 rounded-2xl p-5 relative border border-sky-100">
          <div className="flex gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-blue-900 text-sm">Sobre viajAR</h3>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Somos un equipo de desarrolladores apasionados por la tecnología
                y los viajes. Creamos viajAR para ayudarte a moverte de forma
                más inteligente y económica.
              </p>
            </div>
          </div>
          <Heart className="absolute bottom-4 right-4 w-5 h-5 text-blue-400 fill-blue-400 opacity-20" />
        </section>
      </main>

      {/* NAV BAR INFERIOR REUTILIZABLE */}
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

function ContactItem({
  icon,
  title,
  subtitle,
  href,
  iconColor,
}: ContactItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className={`${iconColor} p-1`}>{icon}</div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300" />
    </a>
  );
}

function NavItem({ icon, label, href }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 transition-colors ${
        isActive ? "text-sky-600" : "text-slate-400"
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-[10px] font-bold">{label}</span>
    </Link>
  );
}
