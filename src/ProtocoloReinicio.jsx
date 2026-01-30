import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, X, Wind, Music, Brain, Activity, 
  Headphones, Zap, Lock, Maximize2, Minimize2, 
  ArrowRight, CheckCircle, List, Sunrise, AlertCircle, Calendar, Volume2
} from 'lucide-react';

// --- CONFIGURACIÓN DE FASES (REINICIO CONSCIENTE) ---
const protocolPhases = [
  {
    id: 1,
    title: "PASO 1: PAUSA", 
    name: "Ruptura del Automatismo",
    duration: 20, 
    color: "from-rose-950 via-slate-950 to-black",
    instruction: "PAUSA TOTAL",
    action: "Detén lo que estás haciendo. Suelta el mouse. No luches.", // [cite: 37, 39]
    mantra: "Reconozco que mi mente necesita espacio.", // [cite: 41]
    icon: <Zap className="w-8 h-8" />
  },
  {
    id: 2,
    title: "PASO 2: SENSACIÓN", 
    name: "Anclaje Corporal",
    duration: 40,
    color: "from-amber-950 via-slate-950 to-black",
    instruction: "SENSACIÓN CORPORAL",
    action: "Elige una sensación: Pies en el suelo o aire en la nariz.", // [cite: 50-52]
    mantra: "No pienses la sensación, solo siéntela.", // [cite: 57-58]
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: 3,
    title: "PASO 3: RESPIRACIÓN", 
    name: "Respiración Reguladora",
    // Patrón 4-1-6 (11 seg) x 9 veces = 99 segundos [cite: 68-70]
    duration: 99, 
    color: "from-teal-950 via-slate-950 to-black",
    instruction: "REGULACIÓN",
    action: "Sigue el ritmo: Inhala (4) • Sostén (1) • Exhala (6)", // [cite: 68-70]
    mantra: "Estoy creando espacio en mi mente.", // [cite: 71]
    isBreathing: true,
    icon: <Wind className="w-8 h-8" />
  },
  {
    id: 4,
    title: "PASO 4: ESCUCHA", 
    name: "Atención Plena",
    duration: 45, // Ajustado para transición suave
    color: "from-indigo-950 via-slate-950 to-black",
    instruction: "SOLO ESCUCHA", 
    action: "Deja de controlar la respiración. La música te acompaña.", // [cite: 159-161]
    mantra: "Si aparece un pensamiento, vuelve al sonido.", // [cite: 161-162]
    icon: <Music className="w-8 h-8" />
  },
  {
    id: 5,
    title: "PASO 5: BURBUJA", 
    name: "Activación de Enfoque",
    duration: 30,
    color: "from-violet-950 via-slate-950 to-black",
    instruction: "CONEXIÓN FINAL",
    action: "Lleva una mano al pecho. Imagina una burbuja a tu alrededor.", // [cite: 79, 84]
    mantra: "Mi cerebro está disponible. Ahora puedo enfocarme.", // [cite: 81-82]
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
        {/* Placeholder para Video Real - Aquí iría el iframe o tag video */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <Play className="w-20 h-20 text-white/20 group-hover:text-teal-500/80 transition-colors duration-500 fill-current" />
            <p className="absolute bottom-8 text-slate-500 font-mono text-xs uppercase tracking-widest">Video Introductorio (5 min)</p>
        </div>
        
        {/* Overlay Título Video */}
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
          className="px-8 py-4 bg-teal-500 text-slate-900 font-bold rounded-full hover:bg-teal-400 transition-all flex items-center gap-2 mx-auto shadow-[0_0_20px_rgba(20,184,166,0.4)]"
        >
          <span>ENTENDIDO, CONTINUAR</span> <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE: LECTURA RÁPIDA (FASE 0) ---
// [cite: 111-120]
const PreReading = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="max-w-3xl mx-auto px-6 h-full flex flex-col justify-center"
    >
      <div className="bg-slate-900/60 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400"><AlertCircle size={24}/></div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Diagnóstico Rápido</h2>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
                ¿Tu cerebro está pidiendo espacio?
            </h3>
            
            <div className="space-y-4 text-slate-300 text-lg mb-10">
                <p className="font-medium text-white">Si notas que:</p>
                <ul className="space-y-3 pl-4 border-l-2 border-rose-500/50">
                    <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Lees y no recuerdas lo leído.</li>
                    <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Respondes en automático.</li>
                    <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Cambias de tarea sin darte cuenta.</li>
                    <li className="flex gap-3 items-start"><span className="text-rose-400 mt-1">●</span> Sientes cansancio aunque no te hayas movido.</li>
                </ul>
            </div>

            <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-500/20 mb-8 text-center">
                <p className="text-rose-200 font-medium italic">
                    "No sigas forzando. Unos minutos aquí evitan horas de bloqueo después."
                </p>
            </div>

            <button 
            onClick={onComplete}
            className="w-full py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-lg"
            >
            INICIAR REINICIO CONSCIENTE <Play size={20} fill="currentColor"/>
            </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENTE: GUÍA RESPIRATORIA 4-1-6 ---
// [cite: 68-70] Inhala 4, Retén 1, Exhala 6
const BreathGuide416 = () => {
  const [text, setText] = useState("Inhala");
  
  useEffect(() => {
    const cycle = async () => {
      // Ciclo total: 11 segundos
      setText("Inhala (4s)"); await new Promise(r => setTimeout(r, 4000));
      setText("Sostén (1s)"); await new Promise(r => setTimeout(r, 1000));
      setText("Exhala (6s)"); await new Promise(r => setTimeout(r, 6000));
    };
    cycle();
    const interval = setInterval(cycle, 11000); // 11s loop
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-8 w-full">
      {/* Círculo que respira */}
      <motion.div 
        className="relative w-64 h-64 border border-teal-500/30 rounded-full flex items-center justify-center bg-teal-900/20 backdrop-blur-sm"
        animate={{
            scale: [1, 1.3, 1.3, 1], // Expansión (4s), Hold (1s), Contracción (6s)
            borderColor: ["rgba(20,184,166,0.3)", "rgba(20,184,166,0.8)", "rgba(20,184,166,0.8)", "rgba(20,184,166,0.3)"]
        }}
        transition={{
            duration: 11,
            times: [0, 0.36, 0.45, 1], // 4/11=0.36, 5/11=0.45
            repeat: Infinity,
            ease: "easeInOut"
        }}
      >
        <motion.div
            key={text}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center z-10"
        >
            <h3 className="text-4xl font-serif font-bold text-white mb-1">{text.split(" ")[0]}</h3>
            <p className="text-teal-400 font-mono text-xs tracking-widest">{text.split(" ")[1]}</p>
        </motion.div>
      </motion.div>
      
      <p className="text-xs text-slate-500 mt-8 font-mono tracking-widest uppercase opacity-70">
         Patrón Regulador: 4 - 1 - 6
      </p>
    </div>
  );
};

// --- COMPONENTE: FRASE DE PODER ---
// [cite: 173-174]
const PowerPhrase = ({ onNext }) => {
  return (
    <motion.div 
       initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
       className="flex flex-col items-center justify-center h-full text-center px-6 relative"
    >
        <div className="absolute inset-0 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <p className="text-teal-400 font-bold tracking-[0.4em] uppercase mb-8 text-sm border-b border-teal-500/30 pb-2">
            Frase de Poder
        </p>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight max-w-5xl mb-12 drop-shadow-2xl">
            "El enfoque nace cuando creo espacio, y dejo que todo fluya en conexión."
        </h2>
        
        <button 
            onClick={onNext} 
            className="group flex items-center gap-3 text-slate-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
        >
            Ver Recomendaciones <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </button>
    </motion.div>
  );
};

// --- COMPONENTE: USO DIARIO RECOMENDADO ---
// [cite: 197-207]
const DailyUse = ({ onNext }) => {
  return (
    <motion.div 
       initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
       className="max-w-5xl mx-auto px-6 h-full flex flex-col justify-center"
    >
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
                <h2 className="text-4xl font-serif font-bold text-white mb-6">Uso Diario Recomendado</h2>
                <p className="text-slate-400 mb-8 text-lg">
                    Para cultivar la disciplina y la claridad, integra este reinicio en estos momentos clave del día:
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-5 bg-slate-800/50 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors">
                        <div className="p-3 bg-teal-500/10 rounded-lg text-teal-400"><Sunrise size={24} /></div>
                        <div>
                            <p className="text-white font-bold text-lg">Por la Mañana</p>
                            <p className="text-sm text-slate-400">Para preparar el cerebro antes de empezar.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-slate-800/50 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors">
                        <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400"><List size={24} /></div>
                        <div>
                            <p className="text-white font-bold text-lg">Antes de Tareas Difíciles</p>
                            <p className="text-sm text-slate-400">Cuando sientas resistencia interna.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-slate-800/50 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors">
                        <div className="p-3 bg-rose-500/10 rounded-lg text-rose-400"><AlertCircle size={24} /></div>
                        <div>
                            <p className="text-white font-bold text-lg">Al Perder el Foco</p>
                            <p className="text-sm text-slate-400">Cada vez que notes dispersión.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 p-10 rounded-[2.5rem] text-center flex flex-col justify-center h-full shadow-2xl border border-teal-500/20">
                <Calendar className="w-16 h-16 text-teal-400 mx-auto mb-6 opacity-80" />
                <h3 className="text-3xl font-bold text-white mb-4">¿Listo para el siguiente nivel?</h3>
                <p className="text-teal-100/80 mb-10 text-sm leading-relaxed">
                    Has completado el reinicio básico. Desbloquea el plan profesional de 4 semanas para transformar tu mente.
                </p>
                <button 
                    onClick={onNext}
                    className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-teal-50 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105"
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
  // Flujo: video -> preread -> protocol -> powerphrase -> daily -> offer
  const [viewState, setViewState] = useState('video'); 
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const phase = protocolPhases[activePhaseIndex];

  // TIMER Y AVANCE DE FASES
  useEffect(() => {
    let interval = null;
    if (isActive && viewState === 'protocol' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isActive && viewState === 'protocol') {
      if (activePhaseIndex < protocolPhases.length - 1) {
        // Pausa breve antes de la siguiente fase para mejor UX
        setTimeout(() => handlePhaseChange(activePhaseIndex + 1), 500);
      } else {
        setIsActive(false);
        setViewState('powerphrase'); // Ir a la frase de poder
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, viewState, activePhaseIndex]);

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
        
        {/* FONDO ANIMADO SEGÚN LA FASE */}
        <div className={`absolute inset-0 bg-gradient-to-br ${viewState === 'protocol' ? phase.color : 'from-slate-900 to-black'} transition-colors duration-[1500ms] opacity-60 pointer-events-none`}></div>
        
        {/* HEADER DE NAVEGACIÓN */}
        <div className="relative z-50 flex justify-between items-center p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${viewState === 'protocol' ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Brain size={20} />
                </div>
                <div>
                    <h1 className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-0.5">Método Sonora</h1>
                    {viewState === 'protocol' && (
                        <p className="text-sm font-serif text-white font-bold">{phase.title}: {phase.name}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {viewState === 'protocol' && (
                    <div className="hidden md:flex flex-col items-end mr-6 border-r border-white/10 pr-6">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tiempo Fase</span>
                        <span className="font-mono text-2xl tabular-nums leading-none">
                            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                        </span>
                    </div>
                )}
                <button onClick={toggleFullScreen} className="p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"><Maximize2 size={18} /></button>
                <button onClick={onClose} className="p-2.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-colors"><X size={18} /></button>
            </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="relative z-40 flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode='wait'>
                
                {/* 1. VIDEO INTRO */}
                {viewState === 'video' && (
                    <IntroVideo key="video" onComplete={() => setViewState('preread')} />
                )}

                {/* 2. LECTURA PREVIA (FASE 0) */}
                {viewState === 'preread' && (
                    <PreReading key="preread" onComplete={() => {
                        setViewState('protocol');
                        handlePhaseChange(0);
                    }} />
                )}

                {/* 3. PROTOCOLO ACTIVO (FASES 1-5) */}
                {viewState === 'protocol' && (
                    <motion.div 
                        key="protocol"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="w-full max-w-5xl mx-auto text-center flex flex-col items-center"
                    >
                        {/* Indicador de Audio (Visual) */}
                        <div className="mb-8 flex items-center gap-2 text-teal-400/60 text-xs font-mono tracking-widest uppercase animate-pulse">
                             <Volume2 size={14} /> Reproduciendo Audio Frecuencia {activePhaseIndex + 1}
                        </div>

                        {/* INSTRUCCIÓN DE ACCIÓN */}
                        <motion.div 
                            key={phase.action}
                            initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className="mb-8 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm"
                        >
                            <p className="text-teal-300 text-sm md:text-base font-bold flex items-center gap-2">
                                <Activity size={16} className="text-teal-500"/> {phase.action}
                            </p>
                        </motion.div>

                        {/* CONTENIDO VISUAL PRINCIPAL */}
                        {phase.isBreathing ? (
                            <BreathGuide416 />
                        ) : (
                            <div className="py-10 md:py-16">
                                <motion.h2 
                                    className="text-5xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-2xl"
                                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                >
                                    "{phase.instruction}"
                                </motion.h2>
                            </div>
                        )}

                        {/* MANTRA CARD */}
                        <motion.div 
                            key={phase.mantra}
                            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                            className="mt-6 bg-slate-900/60 backdrop-blur-xl border-l-4 border-teal-500 px-10 py-8 rounded-r-3xl shadow-2xl max-w-2xl transform hover:scale-105 transition-transform duration-500"
                        >
                            <p className="text-2xl md:text-3xl text-teal-50 italic font-serif leading-relaxed">
                                "{phase.mantra}"
                            </p>
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
                        className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center px-4"
                    >
                        <div className="text-left space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/40 text-green-400 rounded-full text-xs font-bold tracking-widest border border-green-500/30">
                                <CheckCircle size={16} /> REINICIO COMPLETADO CON ÉXITO
                            </div>
                            
                            <div>
                                <h2 className="text-5xl font-serif font-bold text-white mb-4">Tu mente está lista.</h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Acabas de experimentar el poder del sonido. Has recuperado tu claridad y reducido tu cortisol. Ahora tienes 2 caminos:
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl border border-white/5 bg-white/5 opacity-60 hover:opacity-100 transition-opacity">
                                    <p className="font-bold text-white mb-1">Opción A: Rutina Habitual</p>
                                    <p className="text-sm text-slate-400">Volver a tu día sin herramientas profundas de gestión.</p>
                                </div>
                                <div className="p-5 rounded-2xl border border-teal-500/50 bg-teal-900/20 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors"></div>
                                    <p className="font-bold text-teal-300 mb-1 relative z-10">Opción B: Método Sonora (Recomendada)</p>
                                    <p className="text-sm text-slate-300 relative z-10">
                                        Adquirir el plan completo para dominar tu estrés, sueño y enfoque permanentemente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-700 shadow-2xl text-center space-y-8 relative">
                            <div className="absolute top-0 right-0 bg-teal-500 text-slate-900 text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl">
                                OFERTA ESPECIAL
                            </div>
                            
                            <Lock className="w-16 h-16 text-teal-400 mx-auto" strokeWidth={1.5} />
                            
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">Plan Completo</h3>
                                <p className="text-slate-400">Acceso inmediato a todas las sesiones y guías.</p>
                            </div>

                            <div className="space-y-4">
                                <a 
                                    href="#servicios" 
                                    onClick={onClose}
                                    className="block w-full py-5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-2xl transition-all shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_40px_rgba(20,184,166,0.6)] text-lg"
                                >
                                    OBTENER ACCESO AHORA
                                </a>
                                <button onClick={onClose} className="text-slate-500 hover:text-white text-sm font-medium underline decoration-slate-700 underline-offset-4">
                                    No gracias, solo volver al trabajo
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>

        {/* BARRA DE PROGRESO GLOBAL */}
        <div className="h-1.5 bg-white/10 w-full relative z-50">
            <motion.div 
                className="h-full bg-teal-500 shadow-[0_0_15px_#14b8a6]"
                animate={{ 
                    width: viewState === 'video' ? '5%' : 
                           viewState === 'preread' ? '10%' :
                           viewState === 'protocol' ? `${10 + ((activePhaseIndex + 1) / protocolPhases.length) * 70}%` :
                           viewState === 'powerphrase' ? '85%' :
                           viewState === 'daily' ? '90%' :
                           '100%' 
                }}
                transition={{ duration: 0.8, ease: "circOut" }}
            />
        </div>
      </div>
    </motion.div>
  );
};

export default ProtocoloReinicio;