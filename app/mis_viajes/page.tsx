"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Zap,
  CheckCircle2,
  MessageSquare,
  Star,
  X,
  Loader2,
  Plane,
  Car,
  Home,
  Route,
  Heart,
  User,
  Search,
} from "lucide-react";

interface TramoActivoProps {
  icon: React.ReactNode;
  titulo: string;
  desc: string;
  done?: boolean;
  active?: boolean;
  last?: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

export default function ViajeActivoPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ contacto: "", comentario: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => setShowModal(false), 2000);
      } else {
        alert("Hubo un error al enviar el feedback. Intentá de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-gray-50 min-h-screen pb-24 font-sans text-slate-800 relative">
      {/* HEADER */}
      <header className="flex items-center p-4 bg-white shadow-sm gap-4 relative z-20">
        <Link href="/buscar">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-blue-900">Viaje en curso</h1>
          <p className="text-xs text-slate-500">Llegada estimada: 15:45 PM</p>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* RESUMEN DEL VIAJE ELEGIDO */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-purple-50 flex justify-between items-center">
            <div className="flex items-center gap-2 text-purple-700">
              <Zap className="w-5 h-5 fill-purple-700" />
              <h2 className="font-extrabold text-sm uppercase tracking-wide">
                Camino más rápido
              </h2>
            </div>
            <span className="font-black text-lg text-slate-900">$ 128.500</span>
          </div>

          <div className="p-5 relative ml-2">
            <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-slate-200"></div>

            <TramoActivo
              icon={<Car className="w-4 h-4" />}
              titulo="Uber / Cabify"
              desc="Hacia Aeropuerto Espora (BHI)"
              done
            />
            <TramoActivo
              icon={<Plane className="w-4 h-4" />}
              titulo="Vuelo Directo"
              desc="Hacia Aeropuerto BRC"
              done
            />
            <TramoActivo
              icon={<Car className="w-4 h-4" />}
              titulo="Taxi"
              desc="Hacia Centro Cívico"
              active
            />
          </div>
        </section>

        {/* BOTÓN FINALIZAR */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
        >
          <CheckCircle2 className="w-6 h-6" />
          Finalizar Viaje
        </button>
      </main>

      {/* MODAL DE FEEDBACK */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 flex justify-between items-center border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                ¿Cómo fue tu experiencia?
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              {isSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800">
                    ¡Gracias por tu ayuda!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Tu feedback ha sido guardado.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">
                      Nombre o Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej: juan@email.com o Juan Perez"
                      value={formData.contacto}
                      onChange={(e) =>
                        setFormData({ ...formData, contacto: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">
                      Comentarios de la demo
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="¿Qué te pareció la ruta seleccionada? ¿Faltó algún dato?"
                      value={formData.comentario}
                      onChange={(e) =>
                        setFormData({ ...formData, comentario: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Enviar Feedback"
                    )}
                    {!isSubmitting && <MessageSquare className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

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

// Sub-componente para los tramos
function TramoActivo({ icon, titulo, desc, done, active }: TramoActivoProps) {
  return (
    <div className="relative z-10 pb-6 last:pb-0 flex gap-4">
      <div className="flex flex-col items-center mt-1">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${
            done
              ? "bg-slate-300"
              : active
                ? "bg-purple-500 animate-pulse"
                : "bg-slate-200"
          }`}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      <div
        className={`flex-1 p-3 rounded-xl border ${
          active
            ? "bg-purple-50 border-purple-200"
            : "bg-white border-slate-100 opacity-60"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className={`p-1.5 rounded-md ${
              active
                ? "bg-purple-100 text-purple-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {icon}
          </div>
          <span
            className={`text-xs font-bold ${
              active ? "text-purple-900" : "text-slate-600"
            }`}
          >
            {titulo}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 ml-8">{desc}</p>
      </div>
    </div>
  );
}

// Sub-componente de navegación inferior
function NavItem({ icon, label, href, active = false }: NavItemProps) {
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
