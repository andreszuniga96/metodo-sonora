import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Wind, Music, CheckCircle, Brain, Activity } from 'lucide-react';

const phases = [
  {
    id: 1,
    name: "Fase 1: Pausa",
    duration: 15,
    wave: "Beta Alta → Transición",
    instruction: "Detén lo que estás haciendo. No luches, solo para.",
    mantra: "Reconozco que mi mente necesita espacio.",
    color: "bg-red-500",
    icon: <Pause className="w-8 h-8" />
  },
  {
    id: 2,
    name: "Fase 2: Ancla Sensorial",
    duration: 40,
    wave: "Alfa (8–12 Hz)",
    instruction: "Elige una sola sensación: Pies en el suelo o manos en tus piernas. No analices, solo siente.",
    mantra: "Habitando el presente.",
    color: "bg-orange-500",
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: 3,
    name: "Fase 3: Respiración",
    duration: 90, // Aprox para 9 ciclos
    wave: "Alfa Profunda",
    instruction: "Inhala (4s) - Retén (1s) - Exhala (6s).",
    mantra: "Estoy creando espacio en mi mente.",
    color: "bg-teal-500",
    icon: <Wind className="w-8 h-8" />,
    isBreathing: true
  },
  {
    id: 4,
    name: "Fase 4: Disponibilidad",
    duration: 30,
    wave: "Alfa → Beta Baja",
    instruction: "Lleva una mano al pecho. Tu cerebro entra en foco sin tensión.",
    mantra: "Mi cerebro está disponible. Ahora puedo enfocarme.",
    color: "bg-blue-500",
    icon: <Brain className="w-8 h-8" />
  },
  {
    id: 5,
    name: "Fase 5: Burbuja de Concentración",
    duration: 0, // Manual stop
    wave: "Beta Baja Funcional",
    instruction: "Inicio inmediato de la tarea. Solo existe una tarea mientras suene la música.",
    mantra: "El enfoque nace cuando creo espacio.",
    color: "bg-indigo-600",
    icon: <Play className="w-8 h-8" />
  }
];

const ProtocoloReinicio = ({ isOpen, onClose }) => {
  const [activePhase, setActivePhase] = useState(-1); // -1: Intro, 0-4: Phases, 5: Finished
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Audio Refs (Placeholders for logic)
  // const audioRef = useRef(new Audio('/assets/sounds/sonora_base.mp3'));

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive && activePhase < 4) {
        // Auto advance except for last phase
       nextPhase();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, activePhase]);

  const startProtocol = () => {
    setActivePhase(0);
    setTimeLeft(phases[0].duration);
    setIsActive(true);
  };

  const nextPhase = () => {
    if (activePhase < phases.length - 1) {
      const next = activePhase + 1;
      setActivePhase(next);
      setTimeLeft(phases[next].duration);
      setIsActive(true);
    } else {
      setActivePhase(5); // Completion screen
      setIsActive(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-2">
            <Activity className="text-teal-400" />
            <span className="font-bold text-white tracking-widest">REINICIO CONSCIENTE</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode='wait'>
            
            {/* INTRO SCREEN */}
            {activePhase === -1 && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-serif font-bold text-white">¿Tu cerebro pide espacio?</h2>
                <div className="bg-slate-800/50 p-6 rounded-xl text-left space-y-3 border-l-4 border-red-500">
                    <p className="text-slate-300 font-medium">Realiza este reinicio si:</p>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                        <li>Lees y no entiendes.</li>
                        <li>Te distraes sin darte cuenta.</li>
                        <li>Sientes cansancio aunque no te hayas movido.</li>
                        <li>Estás a punto de responder mal un mensaje.</li>
                    </ul>
                </div>
                <p className="text-teal-400 font-medium italic">"El enfoque nace cuando creo espacio, no cuando presiono."</p>
                <button 
                    onClick={startProtocol}
                    className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-full shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                    <Play fill="currentColor" /> Iniciar Protocolo (3 min)
                </button>
              </motion.div>
            )}

            {/* ACTIVE PHASES (0-4) */}
            {activePhase >= 0 && activePhase < 5 && (
              <motion.div 
                key={`phase-${activePhase}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full space-y-8"
              >
                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-800 rounded-full mb-4">
                    <motion.div 
                        className={`h-full rounded-full ${phases[activePhase].color}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: phases[activePhase].duration, ease: "linear" }}
                    />
                </div>

                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${phases[activePhase].color} bg-opacity-20 text-${phases[activePhase].color.split('-')[1]}-400 ring-2 ring-current ring-opacity-50`}>
                    {phases[activePhase].icon}
                </div>

                <div>
                    <h3 className="text-teal-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">{phases[activePhase].name}</h3>
                    <p className="text-xs text-slate-500 mb-4">{phases[activePhase].wave}</p>
                    <h2 className="text-2xl md:text-3xl text-white font-serif font-bold leading-tight max-w-lg mx-auto">
                        "{phases[activePhase].instruction}"
                    </h2>
                </div>

                {/* Breathing Visualizer for Phase 3 */}
                {phases[activePhase].isBreathing && (
                    <div className="py-4">
                        <motion.div 
                            animate={{ scale: [1, 1.3, 1.3, 1] }} 
                            transition={{ duration: 11, repeat: Infinity, times: [0, 0.36, 0.45, 1] }} // 4s inhale, 1s hold, 6s exhale
                            className="w-32 h-32 bg-teal-500/20 rounded-full mx-auto flex items-center justify-center border border-teal-500/50"
                        >
                            <span className="text-xs text-teal-300">Respirar</span>
                        </motion.div>
                        <p className="text-xs text-slate-500 mt-2">Inhala (4) - Retén (1) - Exhala (6)</p>
                    </div>
                )}

                <div className="bg-slate-800 p-4 rounded-lg inline-block">
                    <p className="text-slate-300 italic text-sm">{phases[activePhase].mantra}</p>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <span className="font-mono text-2xl text-white">{timeLeft > 0 ? timeLeft : "..."}s</span>
                    {activePhase === 4 && (
                        <button onClick={nextPhase} className="text-xs border border-slate-600 px-3 py-1 rounded text-slate-400 hover:text-white">
                            Comenzar Trabajo
                        </button>
                    )}
                </div>
              </motion.div>
            )}

            {/* COMPLETION SCREEN */}
            {activePhase === 5 && (
              <motion.div 
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                 <div className="w-24 h-24 bg-green-500/20 rounded-full mx-auto flex items-center justify-center text-green-400 mb-4">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white">¡Mente Reiniciada!</h2>
                <p className="text-slate-300 max-w-md mx-auto">
                    Has activado la <strong>Fase 5: Burbuja</strong>. Tienes entre 20 y 30 minutos de enfoque biológico disponible. Úsalos ahora.
                </p>
                
                <div className="p-4 bg-teal-900/30 border border-teal-500/30 rounded-xl mt-6">
                    <p className="text-sm text-teal-200 mb-2">¿Te funcionó este micro-ejercicio?</p>
                    <p className="text-xs text-slate-400 mb-4">Imagina lo que puedes lograr con una sesión completa personalizada.</p>
                    <a 
                        href="#servicios" 
                        onClick={onClose}
                        className="block w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors"
                    >
                        Ver Planes Completos
                    </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Player Controls UI (Visual Only for now) */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center gap-2">
                <Music size={14} />
                <span>{activePhase >= 0 && activePhase < 5 ? "Audio: Frecuencia Binaural Activa" : "Audio en Espera"}</span>
            </div>
            {isActive && activePhase < 4 && (
                <button onClick={() => setIsActive(!isActive)} className="text-white hover:text-teal-400">
                    {isActive ? "Pausar" : "Reanudar"}
                </button>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProtocoloReinicio;