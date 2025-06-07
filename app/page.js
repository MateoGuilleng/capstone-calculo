'use client'
// src/app/page.js
import Link from "next/link";
import Image from "next/image";
import { FaInfinity, FaSquareRootAlt, FaDivide, FaEquals, FaPlus, FaMinus } from 'react-icons/fa';

// SVG Corona para el auto
const Corona = () => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-10 left-1/2 -translate-x-1/2 drop-shadow-lg">
    <path d="M4 24L12 8L24 20L36 8L44 24" stroke="#FFD700" strokeWidth="4" fill="none"/>
    <circle cx="12" cy="8" r="3" fill="#FFD700" stroke="#FFC700" strokeWidth="2"/>
    <circle cx="36" cy="8" r="3" fill="#FFD700" stroke="#FFC700" strokeWidth="2"/>
    <circle cx="24" cy="20" r="3" fill="#FFD700" stroke="#FFC700" strokeWidth="2"/>
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Fondo de símbolos matemáticos decorativos */}
      <div className="pointer-events-none select-none absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 text-7xl text-blue-900 animate-spin-slow"><FaInfinity /></div>
        <div className="absolute top-1/2 left-1/4 text-6xl text-purple-900 animate-float"><FaSquareRootAlt /></div>
        <div className="absolute bottom-1/3 left-1/2 text-6xl text-yellow-900 animate-float"><FaPlus /></div>
        <div className="absolute top-1/4 right-1/3 text-5xl text-pink-900 animate-float"><FaDivide /></div>
        <div className="absolute bottom-10 left-1/5 text-6xl text-cyan-900 animate-spin-slow"><FaEquals /></div>
        <div className="absolute top-1/3 right-10 text-7xl text-indigo-900 animate-float"><FaMinus /></div>
      </div>
      {/* Confeti animado sutil */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`confeti confeti-${i % 8}`} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
        ))}
      </div>
      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <Corona />
            <Image src="/carro1.jpg" alt="Carro" width={120} height={60} className="rounded-2xl shadow-2xl border-4 border-yellow-400" />
          </div>
          <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-4 animate-fade-in text-center">Carrera de Cálculo</h1>
          <p className="text-xl text-blue-100 max-w-xl mx-auto text-center mb-2 animate-fade-in">
            ¡Bienvenido! Elige tu coche y compite respondiendo preguntas de cálculo.<br/>
            Si fallas, tu auto no avanza. ¡Gana quien llegue primero a la meta!
          </p>
        </div>
        <Link
          href="/carrera"
          className="bg-gradient-to-br from-yellow-400 to-red-500 px-10 py-5 text-white rounded-2xl text-2xl font-bold shadow-xl hover:scale-105 transition-transform animate-fade-in"
        >
          Iniciar Carrera
        </Link>
      </div>
      {/* Animaciones personalizadas para símbolos y confeti */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 22s linear infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease; }
        @keyframes confeti-fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        .confeti {
          position: absolute;
          top: -40px;
          width: 16px;
          height: 16px;
          border-radius: 4px;
          opacity: 0.7;
          animation: confeti-fall 2.5s linear infinite;
        }
        .confeti-0 { background: #FFD700; }
        .confeti-1 { background: #FF69B4; }
        .confeti-2 { background: #00E6FF; }
        .confeti-3 { background: #7CFC00; }
        .confeti-4 { background: #FF4500; }
        .confeti-5 { background: #8A2BE2; }
        .confeti-6 { background: #FFF; }
        .confeti-7 { background: #FFB300; }
      `}</style>
    </main>
  );
}