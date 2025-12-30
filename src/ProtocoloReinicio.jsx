import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, X, Wind, Music, Brain, Activity, 
  Headphones, Zap, Lock, Maximize2, Minimize2, ArrowRight
} from 'lucide-react';

// --- DATOS DEL PROTOCOLO ---
const phases = [
  {
    id: 0,
    name: "Calibración",
    duration: 0,
    waveType: "beta-high",
    bpm: "---",
    hz: "---",
    color: "from-slate-950 via-slate-900 to-slate-950",
    instruction: "CALIBRACIÓN",
    subtext: "Preparando entorno neuroacústico...",
    icon: <Headphones className="w-6 h-6" />
  },
  {
    id: 1,
    name: "Fase 1: Ruptura",
    duration: 15,
    waveType: "beta-erratic",
    bpm: "18-30 Hz",
    hz: "BETA ALTA",
    color: "from-rose-950 via-slate-900 to-slate-950",
    instruction: "PAUSA TOTAL",
    mantra: "Reconozco que mi mente necesita espacio.",
    details: "Detén la saturación. No luches, solo para.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 2,
    name: "Fase 2: Ancla",
    duration: 40,
    waveType: "alpha-entry",
    bpm: "8-12 Hz",
    hz: "ALFA",
    color: "from-amber-950 via-slate-900 to-slate-950",
    instruction: "PRESENCIA",
    mantra: "Siente tus pies. Siente tus manos.", 
    details: "Sal de tu cabeza. Habita tu cuerpo.",
    icon: <Activity className="w-6 h-6" />
  },
  {
    id: 3,
    name: "Fase 3: Coherencia",
    duration: 99, 
    waveType: "alpha-deep",
    bpm: "8 Hz",
    hz: "ALFA PROFUNDA",
    color: "from-teal-950 via-slate-900 to-slate-950",
    instruction: "RESPIRACIÓN",
    mantra: "Estoy creando espacio en mi mente.",
    details: "Sincronización cardio-cerebral.",
    isBreathing: true,
    icon: <Wind className="w-6 h-6" />
  },
  {
    id: 4,
    name: "Fase 4: Disponibilidad",
    duration: 30,
    waveType: "beta-low",
    bpm: "12-15 Hz",
    hz: "SMR",
    color: "from-blue-950 via-slate-900 to-slate-950",
    instruction: "ACTIVACIÓN",
    mantra: "Mi cerebro está disponible.",
    details: "Foco lúcido sin tensión.",
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 5,
    name: "Fase 5: Burbuja",
    duration: 0,
    waveType: "flow",
    bpm: "Focus",
    hz: "GAMMA",
    color: "from-indigo-950 via-slate-900 to-slate-950",
    instruction: "BURBUJA",
    mantra: "El enfoque nace cuando creo espacio.",
    details: "Modo de trabajo profundo activado.",
    icon: <Lock className="w-6 h-6" />
  }
];

// --- VISUALIZADOR DE ONDAS "CINE" ---
const CinematicWave = ({ type }) => {
  const isErratic = type === 'beta-erratic';
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
       <svg viewBox="0 0 1440 320" className="w-full h-full absolute top-1/2 -translate-y-1/2 scale-150">
          <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth={isErratic ? "1" : "2"}
            className={isErratic ? "text-rose-500" : "text-teal-500"}
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,90.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128"
            animate={{
              d: isErratic 
                ? "M0,160L48,180C96,200,192,100,288,120C384,140,480,240,576,220C672,200,768,120,864,140C960,160,1056,220,1152,200C1248,180,1344,120,1392,110L1440,100"
                : "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,90.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128"
            }}
            transition={{
              duration: isErratic ? 0.2 : 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
       </svg>
    </div>
  );
};

// --- GUÍA RESPIRATORIA MACRO (Fase 3) ---
const MacroBreathing = () => {
  const [text, setText] = useState("Inhala");
  
  useEffect(() => {
    const cycle = async () => {
      setText("Inhala (4s)");
      await new Promise(r => setTimeout(r, 4000));
      setText("Retén (1s)");
      await new Promise(r => setTimeout(r, 1000));
      setText("Exhala (6s)");
      await new Promise(r => setTimeout(r, 6000));
    };
    cycle();
    const interval = setInterval(cycle, 11000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <motion.div
        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-teal-500/30 flex items-center justify-center relative z-10 bg-gradient-to-br from-teal-900/40 to-transparent backdrop-blur-sm shadow-[0_0_50px_rgba(20,184,166,0.2)]"
        animate={{ scale: [1, 1.3, 1.3, 1] }}
        transition={{ duration: 11, times: [0, 0.36, 0.45, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span 
            key={text}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-light text-white uppercase tracking-[0.2em]"
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const ProtocoloReinicio = ({ isOpen, onClose }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const phase = phases[activePhaseIndex];

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive && activePhaseIndex > 0) {
      if (activePhaseIndex < phases.length - 1) {
        setTimeout(() => nextPhase(), 800);
      } else {
        setIsActive(false); 
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, activePhaseIndex]);

  const startProtocol = () => {
    setActivePhaseIndex(1);
    setTimeLeft(phases[1].duration);
    setIsActive(true);
  };

  const nextPhase = () => {
    setActivePhaseIndex(prev => prev + 1);
    setTimeLeft(phases[activePhaseIndex + 1].duration);
    setIsActive(true);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      {/* Contenedor Principal "Cinema Mode" */}
      <motion.div 
        layout
        className={`relative w-full h-full md:w-[95vw] md:h-[90vh] bg-slate-900 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-1000 border border-white/5`}
      >
        {/* Fondo Dinámico */}
        <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} transition-colors duration-1000 opacity-60`}></div>
        <CinematicWave type={phase.waveType} />

        {/* --- HEADER --- */}
        <div className="relative z-20 flex justify-between items-start p-6 md:p-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md text-white/80">
                {phase.icon}
             </div>
             <div className="hidden md:block">
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Método Sonora</p>
                <div className="flex gap-4 text-xs font-mono text-teal-400 mt-1">
                   <span>WAVE: {phase.hz}</span>
                   <span>FREQ: {phase.bpm}</span>
                </div>
             </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-3 text-white/50 hover:text-white transition-colors hidden md:block">
                {isFullScreen ? <Minimize2 /> : <Maximize2 />}
            </button>
            <button onClick={onClose} className="p-3 bg-white/10 hover:bg-red-500/20 text-white rounded-full transition-colors border border-white/5">
                <X />
            </button>
          </div>
        </div>

        {/* --- BODY --- */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
            <AnimatePresence mode='wait'>
                
                {/* 0. CALIBRACIÓN (Landing del Modal) */}
                {activePhaseIndex === 0 && (
                    <motion.div 
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }}
                        className="max-w-2xl"
                    >
                        <motion.div 
                            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-mono mb-8"
                        >
                            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                            SISTEMA LISTO
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                            Reinicia tu <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Sistema Nervioso</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 font-light max-w-lg mx-auto leading-relaxed">
                            3 minutos de ingeniería sonora para pasar del estrés al enfoque. <br/>
                            <span className="text-white font-medium">Usa audífonos para mejor resultado.</span>
                        </p>
                        <button 
                            onClick={startProtocol}
                            className="group relative px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-full hover:bg-teal-50 transition-all flex items-center gap-3 mx-auto overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">INICIAR AHORA <Play className="w-5 h-5 fill-current"/></span>
                            <div className="absolute inset-0 bg-teal-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </motion.div>
                )}

                {/* 1-4. FASES ACTIVAS */}
                {activePhaseIndex > 0 && activePhaseIndex < 5 && (
                    <motion.div 
                        key={activePhaseIndex}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full flex flex-col items-center"
                    >
                        {phase.isBreathing ? (
                            <MacroBreathing />
                        ) : (
                            <motion.h2 
                                className="text-[12vw] md:text-8xl font-serif font-bold text-white leading-none tracking-tighter mix-blend-overlay opacity-90"
                            >
                                {phase.instruction}
                            </motion.h2>
                        )}

                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="mt-8 md:mt-12 bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10"
                        >
                            <p className="text-xl md:text-2xl text-teal-200 font-medium italic">"{phase.mantra}"</p>
                        </motion.div>
                    </motion.div>
                )}

                {/* 5. CIERRE / VENTA (EL ENGANCHE) */}
                {activePhaseIndex === 5 && (
                    <motion.div 
                        key="end"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center bg-slate-800/50 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
                    >
                        <div className="text-left space-y-6">
                            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold tracking-widest">SESIÓN COMPLETADA</div>
                            <h2 className="text-4xl font-serif font-bold text-white">Tu cerebro está listo.</h2>
                            <p className="text-slate-300">Has bajado de ondas Beta (Estrés) a Alfa (Claridad). Tienes una ventana de <strong>25 minutos</strong> de alto rendimiento biológico disponible ahora mismo.</p>
                            
                            <div className="space-y-3 pt-4">
                                <div className="flex justify-between text-sm text-slate-400 border-b border-white/10 pb-2">
                                    <span>Claridad Mental</span>
                                    <span className="text-teal-400 font-bold">+45%</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-400 border-b border-white/10 pb-2">
                                    <span>Estrés (Cortisol)</span>
                                    <span className="text-green-400 font-bold">-30%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-teal-900 to-slate-900 p-8 rounded-2xl border border-teal-500/30 flex flex-col justify-center text-center space-y-6">
                            <Lock className="w-12 h-12 text-teal-400 mx-auto mb-2" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Desbloquea el Método Completo</h3>
                                <p className="text-sm text-teal-200">Esto fue solo el 5%. Accede a sesiones guiadas para dormir, creatividad y ansiedad.</p>
                            </div>
                            <a 
                                href="#servicios" 
                                onClick={onClose}
                                className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.4)] flex items-center justify-center gap-2"
                            >
                                Ver Planes Disponibles <ArrowRight className="w-4 h-4"/>
                            </a>
                            <button onClick={onClose} className="text-xs text-slate-500 underline hover:text-white">
                                Solo quiero volver a trabajar
                            </button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>

        {/* --- FOOTER & PROGRESS --- */}
        {activePhaseIndex > 0 && activePhaseIndex < 5 && (
            <div className="relative z-20 p-6 md:p-10 flex justify-between items-end">
                <div>
                     <p className="text-xs text-white/40 font-mono mb-1">TIEMPO RESTANTE</p>
                     <p className="text-5xl font-mono text-white font-bold tracking-tighter">
                        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                     </p>
                </div>
                
                <div className="flex gap-2">
                   {phases.slice(1, 5).map((p, i) => (
                      <div 
                        key={i} 
                        className={`h-2 rounded-full transition-all duration-500 ${i + 1 === activePhaseIndex ? 'w-16 bg-white shadow-[0_0_10px_white]' : i + 1 < activePhaseIndex ? 'w-4 bg-teal-500' : 'w-4 bg-white/10'}`}
                      />
                   ))}
                </div>
            </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProtocoloReinicio;