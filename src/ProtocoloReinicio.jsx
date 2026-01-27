import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, X, Wind, Music, Brain, Activity, 
  Headphones, Zap, Lock, Maximize2, Minimize2, 
  ArrowRight, CheckCircle, List, Sunrise, AlertCircle, Calendar
} from 'lucide-react';

// --- CONFIGURACIÓN DE FASES (Basado en PDF Reinicio Consciente) ---
const protocolPhases = [
  {
    id: 1,
    title: "PASO 1: PAUSA", // [cite: 131]
    name: "Ruptura del Automatismo",
    duration: 20, 
    color: "from-rose-950 via-slate-950 to-black",
    instruction: "PAUSA TOTAL",
    action: "Suelta el mouse. Aleja las manos del teclado. No luches.", // [cite: 134-136]
    mantra: "Reconozco que mi mente necesita espacio.", // [cite: 139]
    icon: <Zap className="w-8 h-8" />
  },
  {
    id: 2,
    title: "PASO 2: SENSACIÓN", // [cite: 140]
    name: "Anclaje Corporal",
    duration: 45,
    color: "from-amber-950 via-slate-950 to-black",
    instruction: "ESCANEO FÍSICO",
    action: "Siente tus pies en el suelo. Siente el aire en tu nariz.", // [cite: 143-144]
    mantra: "No pienses la sensación, solo siéntela.", // [cite: 146]
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: 3,
    title: "PASO 3: RESPIRACIÓN", // [cite: 147]
    name: "Regulación Nerviosa",
    duration: 144, // 9 repeticiones x 16s (4-4-4-4) [cite: 150]
    color: "from-teal-950 via-slate-950 to-black",
    instruction: "PATRÓN DE CAJA",
    action: "Sigue la guía visual: Inhala, Retén, Exhala, Retén.", // 
    mantra: "Estoy creando espacio en mi mente.", // [cite: 156]
    isBreathing: true,
    icon: <Wind className="w-8 h-8" />
  },
  {
    id: 4,
    title: "PASO 4: ESCUCHA", // [cite: 158]
    name: "Atención Plena",
    duration: 60,
    color: "from-indigo-950 via-slate-950 to-black",
    instruction: "SOLO ESCUCHA", // [cite: 160]
    action: "Deja de controlar tu respiración. Atiende solo al sonido.", // [cite: 159]
    mantra: "Si aparece un pensamiento, vuelve al sonido.", // [cite: 161-162]
    icon: <Music className="w-8 h-8" />
  },
  {
    id: 5,
    title: "PASO 5: BURBUJA", // [cite: 163]
    name: "Activación de Enfoque",
    duration: 30,
    color: "from-violet-950 via-slate-950 to-black",
    instruction: "CONEXIÓN FINAL",
    action: "Lleva una mano al pecho. Imagina una burbuja a tu alrededor.", // [cite: 164-165]
    mantra: "Mi cerebro está disponible, ahora puedo enfocarme.", // [cite: 166-167]
    icon: <Brain className="w-8 h-8" />
  }
];

// --- COMPONENTE: VIDEO INTRO (ONBOARDING) ---
const IntroVideo = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-6 text-center"
    >
      <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative group max-w-3xl mx-auto">
        {/* Placeholder para Video Real */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <Play className="w-20 h-20 text-white/20 group-hover:text-teal-500/80 transition-colors duration-500 fill-current" />
            <p className="absolute bottom-8 text-slate-500 font-mono text-xs uppercase tracking-widest">Video Introductorio (5 min)</p>
        </div>
        <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent text-left">
            <h3 className="text-white font-bold text-lg">Instrucciones del Método Sonora</h3>
            <p className="text-slate-400 text-sm">Por Francisco Lagos</p>
        </div>
      </div>

      <div className="mt-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">Instrucciones Vitales</h2>
        <p className="text-slate-400 mb-8 text-sm">
            Antes de intervenir tu sistema nervioso, es crucial entender el "por qué". Mira el video completo para activar el efecto neuro-acústico.
        </p>
        <button 
          onClick={onComplete}
          className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-teal-50 transition-all flex items-center gap-2 mx-auto shadow-lg"
        >
          <span>CONTINUAR</span> <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE: LECTURA RÁPIDA (ANTES DE EMPEZAR) ---
// [cite: 111-120]
const PreReading = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="max-w-3xl mx-auto px-6 h-full flex flex-col justify-center"
    >
      <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400"><AlertCircle size={24}/></div>
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Lectura Rápida: Diagnóstico</h2>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">
            ¿Tu cerebro está pidiendo espacio?
        </h3>
        
        <div className="space-y-4 text-slate-300 text-lg mb-8">
            <p>Si notas que:</p>
            <ul className="space-y-3 pl-4 border-l-2 border-rose-500/50">
                <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Lees y no recuerdas lo leído.</li>
                <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Respondes en automático.</li>
                <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Cambias de tarea sin darte cuenta.</li>
                <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Sientes cansancio aunque no te hayas movido.</li>
            </ul>
        </div>

        <div className="bg-rose-900/20 p-4 rounded-xl border border-rose-500/20 mb-8">
            <p className="text-rose-200 font-medium italic text-center">
                "No sigas forzando. Unos minutos aquí evitan horas de bloqueo después."
            </p>
        </div>

        <button 
          onClick={onComplete}
          className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.4)] flex items-center justify-center gap-2"
        >
          INICIAR PROTOCOLO DE REINICIO <Play size={18} fill="currentColor"/>
        </button>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE: GUÍA RESPIRATORIA (BOX BREATHING) ---
// 
const BoxBreathingGuide = () => {
  const [text, setText] = useState("Inhala");
  
  useEffect(() => {
    const cycle = async () => {
      setText("Inhala (4s)"); await new Promise(r => setTimeout(r, 4000));
      setText("Retén (4s)"); await new Promise(r => setTimeout(r, 4000));
      setText("Exhala (4s)"); await new Promise(r => setTimeout(r, 4000));
      setText("Retén (4s)"); await new Promise(r => setTimeout(r, 4000));
    };
    cycle();
    const interval = setInterval(cycle, 16000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-8 w-full">
      <div className="relative w-64 h-64 border border-slate-600 rounded-3xl flex items-center justify-center overflow-hidden bg-slate-900/50">
        <motion.div 
            className="absolute inset-0 bg-teal-500/20"
            animate={{ height: ["0%", "100%", "100%", "0%", "0%"] }}
            transition={{ duration: 16, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, ease: "linear" }}
        />
        <svg className="absolute inset-0 w-full h-full p-1 pointer-events-none">
            <motion.rect 
                width="100%" height="100%" rx="24" fill="none" stroke="#2dd4bf" strokeWidth="4" strokeDasharray="20 1000"
                animate={{ strokeDashoffset: [0, -1000] }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
        </svg>
        <div className="relative z-10 text-center">
            <h3 className="text-4xl font-serif font-bold text-white mb-2">{text.split(" ")[0]}</h3>
            <p className="text-teal-400 font-mono text-xs tracking-widest">{text.split(" ")[1]}</p>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE: FRASE DE PODER ---
// 
const PowerPhrase = ({ onNext }) => {
  return (
    <motion.div 
       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
       className="flex flex-col items-center justify-center h-full text-center px-6"
    >
        <p className="text-teal-500 font-bold tracking-[0.3em] uppercase mb-6 text-sm">Frase de Poder</p>
        <h2 className="text-3xl md:text-5xl font-serif text-white font-bold leading-tight max-w-4xl mb-12">
            "El enfoque nace cuando creo espacio y dejo que todo fluya en conexión."
        </h2>
        <button onClick={onNext} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest">
            Siguiente <ArrowRight size={16}/>
        </button>
    </motion.div>
  );
};

// --- COMPONENTE: USO DIARIO RECOMENDADO ---
// 
const DailyUse = ({ onNext }) => {
  return (
    <motion.div 
       initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
       className="max-w-4xl mx-auto px-6 h-full flex flex-col justify-center"
    >
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-4xl font-serif font-bold text-white mb-6">Uso Diario Recomendado</h2>
                <p className="text-slate-400 mb-8">
                    Para cultivar la disciplina y la claridad, integra este reinicio en estos momentos clave:
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                        <Sunrise className="text-teal-400" />
                        <div>
                            <p className="text-white font-bold">Por la Mañana</p>
                            <p className="text-xs text-slate-400">Para preparar el cerebro.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                        <List className="text-indigo-400" />
                        <div>
                            <p className="text-white font-bold">Antes de Tareas Importantes</p>
                            <p className="text-xs text-slate-400">Para entrar en "Deep Work".</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                        <AlertCircle className="text-rose-400" />
                        <div>
                            <p className="text-white font-bold">Al Perder el Foco</p>
                            <p className="text-xs text-slate-400">Cuando te sientas disperso/a.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 p-8 rounded-3xl text-center flex flex-col justify-center h-full">
                <Calendar className="w-16 h-16 text-teal-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">¿Estás listo para el siguiente nivel?</h3>
                <p className="text-teal-100 mb-8 text-sm">
                    Has completado el reinicio básico. Desbloquea el plan profesional.
                </p>
                <button 
                    onClick={onNext}
                    className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-teal-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    VER MI REPORTE FINAL <ArrowRight size={18}/>
                </button>
            </div>
        </div>
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const ProtocoloReinicio = ({ isOpen, onClose }) => {
  // Estados de Flujo: 'video' -> 'preread' -> 'protocol' -> 'powerphrase' -> 'daily' -> 'offer'
  const [viewState, setViewState] = useState('video'); 
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const phase = protocolPhases[activePhaseIndex];

  // LOGICA DEL TIMER
  useEffect(() => {
    let interval = null;
    if (isActive && viewState === 'protocol' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isActive && viewState === 'protocol') {
      if (activePhaseIndex < protocolPhases.length - 1) {
        handlePhaseChange(activePhaseIndex + 1); // Auto-advance
      } else {
        setIsActive(false);
        setViewState('powerphrase'); // Ir a Frase de Poder al terminar
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, viewState, activePhaseIndex]);

  // NAVEGACIÓN
  const handlePhaseChange = (index) => {
    setActivePhaseIndex(index);
    setTimeLeft(protocolPhases[index].duration);
    setIsActive(true);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => console.log(e));
        setIsFullScreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className={`relative w-full h-full bg-black text-white flex flex-col overflow-hidden`}>
        
        {/* FONDO DINÁMICO */}
        <div className={`absolute inset-0 bg-gradient-to-br ${viewState === 'protocol' ? phase.color : 'from-slate-900 to-black'} transition-colors duration-[2000ms] opacity-60 pointer-events-none`}></div>
        
        {/* HEADER */}
        <div className="relative z-50 flex justify-between items-center p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${viewState === 'protocol' ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Brain size={16} />
                </div>
                <div>
                    <h1 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Método Sonora</h1>
                    {viewState === 'protocol' && (
                        <p className="text-sm font-serif text-white">{phase.title}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                {viewState === 'protocol' && (
                    <div className="hidden md:flex flex-col items-end mr-4">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Tiempo</span>
                        <span className="font-mono text-xl tabular-nums">
                            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                        </span>
                    </div>
                )}
                <button onClick={toggleFullScreen} className="p-2 text-slate-400 hover:text-white"><Maximize2 size={20} /></button>
                <button onClick={onClose} className="p-2 text-red-400 hover:bg-red-500/10 rounded-full"><X size={20} /></button>
            </div>
        </div>

        {/* BODY */}
        <div className="relative z-40 flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
            <AnimatePresence mode='wait'>
                
                {/* 1. VIDEO INTRO */}
                {viewState === 'video' && (
                    <IntroVideo key="video" onComplete={() => setViewState('preread')} />
                )}

                {/* 2. LECTURA PREVIA */}
                {viewState === 'preread' && (
                    <PreReading key="preread" onComplete={() => {
                        setViewState('protocol');
                        handlePhaseChange(0);
                    }} />
                )}

                {/* 3. PROTOCOLO (FASES 1-5) */}
                {viewState === 'protocol' && (
                    <motion.div 
                        key="protocol"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="w-full max-w-4xl mx-auto text-center flex flex-col items-center"
                    >
                        {/* INSTRUCCIÓN DE ACCIÓN (GUÍA CLARA) */}
                        <div className="mb-6 bg-teal-500/10 px-6 py-2 rounded-full border border-teal-500/20">
                            <p className="text-teal-300 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <Activity size={14} /> ACCIÓN REQUERIDA:
                            </p>
                        </div>
                        
                        <h3 className="text-xl md:text-3xl text-white font-medium mb-8 max-w-2xl leading-snug">
                            "{phase.action}"
                        </h3>

                        {/* CONTENIDO PRINCIPAL */}
                        {phase.isBreathing ? (
                            <BoxBreathingGuide />
                        ) : (
                            <div className="py-8">
                                <motion.h2 
                                    className="text-5xl md:text-8xl font-serif font-bold text-white mb-2 tracking-tight"
                                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                >
                                    {phase.instruction}
                                </motion.h2>
                            </div>
                        )}

                        {/* MANTRA */}
                        <motion.div 
                            key={phase.mantra}
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                            className="mt-8 bg-slate-900/80 backdrop-blur-xl border-l-4 border-teal-500 px-8 py-6 rounded-r-2xl shadow-2xl max-w-lg"
                        >
                            <p className="text-xl text-teal-50 italic font-serif">"{phase.mantra}"</p>
                        </motion.div>
                    </motion.div>
                )}

                {/* 4. FRASE DE PODER */}
                {viewState === 'powerphrase' && (
                    <PowerPhrase key="power" onNext={() => setViewState('daily')} />
                )}

                {/* 5. USO DIARIO */}
                {viewState === 'daily' && (
                    <DailyUse key="daily" onNext={() => setViewState('offer')} />
                )}

                {/* 6. OFERTA FINAL */}
                {viewState === 'offer' && (
                    <motion.div 
                        key="offer"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="text-left space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-bold tracking-widest border border-green-500/30">
                                <CheckCircle size={14} /> REINICIO COMPLETADO
                            </div>
                            <h2 className="text-5xl font-serif font-bold text-white">Tu mente está lista.</h2>
                            <p className="text-slate-300 text-lg">Has recuperado tu claridad. Ahora tienes 2 opciones:</p>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-white/5 bg-white/5 opacity-50">
                                    <p className="font-bold text-white">Opción A</p>
                                    <p className="text-sm text-slate-400">Volver a tu rutina sin herramientas profundas.</p>
                                </div>
                                <div className="p-4 rounded-xl border border-teal-500/50 bg-teal-900/20">
                                    <p className="font-bold text-teal-300">Opción B (Recomendada)</p>
                                    <p className="text-sm text-slate-300">Adquirir el Método Sonora completo para dominar tu estrés y sueño.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl text-center space-y-6">
                            <Lock className="w-12 h-12 text-teal-400 mx-auto" />
                            <h3 className="text-2xl font-bold text-white">Oferta Exclusiva</h3>
                            <a 
                                href="#servicios" 
                                onClick={onClose}
                                className="block w-full py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                            >
                                OBTENER PLAN COMPLETO
                            </a>
                            <button onClick={onClose} className="text-slate-500 hover:text-white text-sm underline">
                                Solo volver al trabajo
                            </button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>

        {/* PROGRESS BAR GLOBAL */}
        <div className="h-1 bg-white/10 w-full relative z-50">
            <motion.div 
                className="h-full bg-teal-500 shadow-[0_0_10px_#14b8a6]"
                animate={{ 
                    width: viewState === 'video' ? '5%' : 
                           viewState === 'preread' ? '15%' :
                           viewState === 'protocol' ? `${15 + ((activePhaseIndex + 1) / protocolPhases.length) * 60}%` :
                           '100%' 
                }}
                transition={{ duration: 0.5 }}
            />
        </div>
      </div>
    </motion.div>
  );
};

export default ProtocoloReinicio;