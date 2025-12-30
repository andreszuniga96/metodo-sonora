import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Wind, Eye, Brain, Activity, ArrowRight, Menu, X, ChevronDown,
  Music, Users, MapPin, Check, DollarSign, MessageCircle,
  Star, Globe, Headphones, Zap, Waves, Mail
} from 'lucide-react';

// IMPORTACIÓN DEL COMPONENTE NUEVO
// Asegúrate de que ProtocoloReinicio.jsx esté en la misma carpeta
import ProtocoloReinicio from './ProtocoloReinicio';

// --- ACTIVOS ---
const assets = {
  videoHero: "VID-20251130-WA0047.mp4",
  franciscoBio: "WhatsApp Image 2025-11-30 at 8.27.25 PM.png",
  serviceIndividual: "WhatsApp Image 2025-11-30 at 10.29.50 PM.png",
  serviceGroup: "WhatsApp Image 2025-12-01 at 7.19.36 AM.jpeg",
  imgGallery1: "WhatsApp Image 2025-11-30 at 8.15.26 PM (1).jpeg",
  imgGallery2: "WhatsApp Image 2025-11-30 at 8.15.26 PM (1).jpeg",    
  imgGallery4: "4.png",    
  logoBioexpo: "WhatsApp Image 2025-11-30 at 7.50.03 PM.jpeg",
};

// --- ANIMACIONES ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- COMPONENTES UI ---

// NAVBAR ACTUALIZADO: Recibe la función onOpenProtocol
const Navbar = ({ onOpenProtocol }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Concepto', href: '#que-es' },
    // Nuevo elemento de acción para el Protocolo
    { name: 'Protocolo Online', action: true, highlight: true }, 
    { name: 'Método', href: '#el-metodo' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Recursos', href: '#recursos' },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      onOpenProtocol();
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md py-3 shadow-xl border-b border-slate-800' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="text-2xl font-serif font-bold text-white tracking-wider flex items-center gap-2">
          <Activity className="w-6 h-6 text-teal-400" />
          MÉTODO <span className="text-teal-400">SONORA</span>
        </a>

        <div className="hidden xl:flex gap-6 items-center">
          {navLinks.map((item) => (
             item.action ? (
                <button 
                  key={item.name} 
                  onClick={() => handleNavClick(item)}
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors uppercase tracking-widest relative group flex items-center gap-1 border border-teal-500/30 px-3 py-1 rounded-full hover:bg-teal-500/10"
                >
                  <Play className="w-3 h-3 fill-current" />
                  {item.name}
                </button>
             ) : (
                <a key={item.name} href={item.href} className="text-xs font-bold text-slate-300 hover:text-white transition-colors uppercase tracking-widest relative group">
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
             )
          ))}
          <a href="#contacto" className="px-5 py-2 bg-teal-500 text-white text-xs font-bold rounded-full hover:bg-teal-600 transition-all shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transform hover:-translate-y-0.5 flex items-center gap-2">
            <MessageCircle className="w-3 h-3" />
            Contactar
          </a>
        </div>

        <button className="xl:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 overflow-hidden lg:hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((item) => (
                item.action ? (
                    <button 
                        key={item.name} 
                        onClick={() => handleNavClick(item)}
                        className="text-teal-400 hover:text-teal-300 py-3 border-b border-slate-800 font-bold text-center flex items-center justify-center gap-2"
                    >
                        <Play className="w-3 h-3" /> {item.name}
                    </button>
                ) : (
                    <a key={item.name} href={item.href} className="text-slate-300 hover:text-white py-3 border-b border-slate-800 font-medium text-center" onClick={() => setMobileMenuOpen(false)}>
                    {item.name}
                    </a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// 1. INICIO (HERO SECTION)
const HeroSection = ({ onOpenProtocol }) => {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 opacity-50">
          <source src={assets.videoHero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <span className="inline-block py-1.5 px-4 border border-teal-400/30 rounded-full bg-teal-900/40 text-teal-300 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md shadow-lg">
            Ingeniería + Neurociencia + Música
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white mb-8 leading-none drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
        >
          Vivir es <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Vibrar</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-slate-200 font-light max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
        >
          Reprograma tu mente y cuerpo a través del sonido. Transforma el estrés en energía creativa y la dispersión en enfoque absoluto.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button onClick={onOpenProtocol} className="w-full sm:w-auto px-8 py-4 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-400 transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(20,184,166,0.3)]">
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            Prueba Interactiva
          </button>
          <a href="#contacto" className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all shadow-lg flex items-center justify-center gap-2">
            Contactar Experto
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => window.location.href = '#que-es'}
      >
        <ChevronDown className="w-8 h-8 hover:text-teal-400 transition-colors" />
      </motion.div>
    </section>
  );
};

// NUEVA SECCIÓN: ENGANCHE / LEAD MAGNET
const LeadMagnetSection = ({ onOpenProtocol }) => {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white relative overflow-hidden border-b border-slate-800">
         {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-3/5">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <span className="inline-block py-1 px-3 rounded bg-teal-500/20 text-teal-300 text-xs font-bold tracking-widest mb-4 border border-teal-500/30">
                      HERRAMIENTA GRATUITA
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                      ¿Tu cerebro pide espacio? <br/>
                      <span className="text-slate-400 text-2xl md:text-4xl block mt-2 font-light">No es falta de disciplina, es sobrecarga.</span>
                  </h2>
                  <div className="space-y-2 mb-8 text-lg text-slate-300">
                    <p className="flex items-center gap-2"><Wind className="w-4 h-4 text-teal-500"/> ¿Lees y no entiendes?</p>
                    <p className="flex items-center gap-2"><Wind className="w-4 h-4 text-teal-500"/> ¿Respondes en automático?</p>
                    <p className="flex items-center gap-2"><Wind className="w-4 h-4 text-teal-500"/> ¿Te distraes sin darte cuenta?</p>
                  </div>
                  <p className="text-slate-400 mb-8 italic max-w-xl border-l-2 border-teal-500 pl-4">
                      "El reinicio sensorial no te hace perder tiempo. Te devuelve la mente que necesitas para avanzar."
                  </p>
                  <div className="flex flex-wrap gap-4">
                      <button 
                          onClick={onOpenProtocol}
                          className="px-8 py-4 bg-teal-500 text-slate-900 font-bold rounded-full hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center gap-3 group transform hover:scale-105"
                      >
                          <Play className="w-5 h-5 fill-current" />
                          Iniciar Protocolo de Reinicio (3 Min)
                      </button>
                  </div>
              </motion.div>
          </div>
          
          {/* Visual Card Preview */}
          <div className="md:w-2/5 relative">
              <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-2xl cursor-pointer"
                  onClick={onOpenProtocol}
              >
                  <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                      <span className="text-teal-400 font-mono text-xs">REINICIO CONSCIENTE v1.0</span>
                      <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                  </div>
                  <div className="space-y-4">
                      <div className="h-2 bg-slate-700 rounded-full w-full overflow-hidden">
                          <div className="h-full bg-teal-500 w-2/3"></div>
                      </div>
                      <div className="flex gap-4 items-center text-slate-300">
                          <Brain className="w-8 h-8 text-teal-500" />
                          <div>
                              <p className="font-bold text-sm">Fase 3: Coherencia</p>
                              <p className="text-xs opacity-60">Regulación de la amígdala</p>
                          </div>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 text-center">
                        <p className="text-2xl font-mono text-white">04 : 01 : 06</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Patrón Respiratorio</p>
                      </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <span className="text-xs text-teal-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        Click para iniciar <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
              </motion.div>
          </div>
        </div>
      </section>
    );
  };

// 2. ¿QUÉ ES EL MÉTODO SONORA?
const ConceptSection = () => {
  return (
    <section id="que-es" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-12 translate-x-32 z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-1/2"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Definición y Propósito</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Más que música, es <br/><span className="text-teal-600">Arquitectura Mental</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed text-justify">
              <p>
                El <strong>Método Sonora</strong> es un sistema de entrenamiento neuro-acústico diseñado para optimizar el rendimiento humano. No se trata simplemente de escuchar melodías relajantes, sino de utilizar frecuencias específicas calculadas matemáticamente para alterar tus ondas cerebrales.
              </p>
              <p>
                Este método fusiona la precisión de la <strong>ingeniería de sonido</strong> con los principios ancestrales y clínicos de la <strong>musicoterapia</strong>.
              </p>
              <div className="p-6 bg-slate-50 border-l-4 border-teal-500 rounded-r-xl">
                <p className="font-medium text-slate-800 italic">"Creamos un puente tangible entre tu estado actual y tu potencial máximo, usando el sonido como vehículo de transporte."</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 grid grid-cols-2 gap-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl flex flex-col justify-between h-64 transform translate-y-8">
              <Brain className="w-10 h-10 text-teal-400" />
              <div>
                <h3 className="text-xl font-bold mb-2">Para el Cerebro</h3>
                <p className="text-sm text-slate-400">Neuroplasticidad y sincronización hemisférica.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-teal-500 p-8 rounded-3xl text-white shadow-2xl flex flex-col justify-between h-64">
              <Activity className="w-10 h-10 text-white" />
              <div>
                <h3 className="text-xl font-bold mb-2">Para el Cuerpo</h3>
                <p className="text-sm text-teal-100">Regulación del cortisol y coherencia cardíaca.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 3. ¿CÓMO FUNCIONA? & 4. BENEFICIOS
const ProcessAndBenefits = () => {
  return (
    <section id="el-metodo" className="bg-slate-900 text-white py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-teal-400 font-bold tracking-widest text-sm uppercase">Metodología Científica</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">El Proceso de Transformación</h2>
          <p className="text-slate-400 text-lg">
            Un protocolo de 4 pasos diseñado para llevarte de la dispersión al flujo (Flow State).
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-32">
          {[
            { num: "01", title: "Diagnóstico", desc: "Mapeo de tu estado energético y patrones de estrés actuales.", icon: <Activity /> },
            { num: "02", title: "Inmersión", desc: "Exposición a frecuencias binaurales e isocrónicas personalizadas.", icon: <Headphones /> },
            { num: "03", title: "Resonancia", desc: "Ejercicios de voz y respiración para anclar el estado de calma.", icon: <Wind /> },
            { num: "04", title: "Integración", desc: "Plan de micro-hábitos para mantener los resultados en la rutina.", icon: <Brain /> },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="relative p-6 border border-slate-700 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-all group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <div className="mt-8 mb-4 text-teal-400">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-32 p-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white">Ciencia de Ondas Cerebrales</h3>
            <p className="text-slate-400 text-sm max-w-lg">
              El método te guía conscientemente desde ondas Beta (Estrés) hacia Alpha (Creatividad) y Theta (Sanación).
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-700 rounded-lg text-xs font-bold text-slate-300">Beta (14-30Hz)</div>
            <ArrowRight className="text-teal-500 animate-pulse" />
            <div className="px-4 py-2 bg-teal-900/50 border border-teal-500/50 rounded-lg text-xs font-bold text-teal-400">Alpha (8-14Hz)</div>
          </div>
        </div>

        <div id="beneficios">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Resultados Tangibles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Enfoque Láser", desc: "Elimina la neblina mental y aumenta tu productividad en horas clave.", icon: <Zap className="text-amber-400"/> },
              { title: "Gestión Emocional", desc: "Reduce la ansiedad y reactividad ante situaciones de alta presión.", icon: <Activity className="text-red-400"/> },
              { title: "Sueño Reparador", desc: "Combate el insomnio entrenando al cerebro para desconectar.", icon: <Waves className="text-blue-400"/> },
              { title: "Creatividad", desc: "Desbloquea ideas innovadoras accediendo al subconsciente.", icon: <Brain className="text-purple-400"/> },
              { title: "Bienestar Físico", desc: "Menor tensión muscular y mejora en la presión arterial.", icon: <Users className="text-green-400"/> },
              { title: "Autoconocimiento", desc: "Conecta con tu propósito a través del silencio interior.", icon: <Eye className="text-teal-400"/> },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors flex gap-4 items-start border border-slate-700/50"
                whileHover={{ y: -5 }}
              >
                <div className="p-3 bg-slate-900 rounded-lg">{benefit.icon}</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                  <p className="text-sm text-slate-400">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// 5. SERVICIOS (CON FOTOS Y NOMBRES)
const ServicesSection = () => {
const mpLinkIndividual = "https://mpago.li/1zYZUxM";

  return (
    <section id="servicios" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Inversión en ti</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Programas Disponibles</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          
        {/* Card 1 - Francisco */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300">
          <div className="h-72 relative">
            <img src={assets.serviceIndividual} alt="Francisco Lagos" className="w-full h-full object-contain object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="bg-teal-500 text-xs font-bold px-3 py-1 rounded-md inline-block mb-2">Terapia Individual</div>
              <h3 className="text-3xl font-serif font-bold">Francisco Lagos</h3>
            </div>
          </div>
          <div className="p-8 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sesión "Vivir es Vibrar"</h3>
            <p className="text-slate-500 text-sm mb-6">Diagnóstico y tratamiento personalizado con Método Sonora completo.</p>
            <ul className="space-y-3 mb-8 flex-1">
              {["Sesión presencial de 60 minutos", "Diagnóstico de enfoque mental", "Plan de acción y micro-hábitos", "Seguimiento por WhatsApp"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-teal-500 mt-0.5" /> <span>{item}</span></li>
              ))}
            </ul>
            
            <div className="flex items-center justify-center pt-6 border-t border-slate-100 gap-4">
              
              <a
                href="https://wa.me/573206586727?text=Hola%20Francisco,%20me%20interesa%20agendar%20una%20sesión%20individual."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                Cotiza Aquí <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" />
              </a>

              <a
                href={mpLinkIndividual}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                Pagar <DollarSign className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
          
        </div>
      </div>
    </section>
  );
};

// 6. SOBRE MÍ (AUTORIDAD)
const AboutSection = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-5/12 relative">
            <div className="absolute inset-0 bg-teal-500 rounded-3xl transform rotate-6 opacity-20"></div>
            <img
              src={assets.franciscoBio}
              alt="Francisco Lagos Luna"
              className="relative rounded-3xl shadow-2xl w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="lg:w-7/12">
            <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">El Maestro</span>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Francisco Javier Lagos Luna</h2>
            <p className="text-xl text-slate-500 mb-6 font-light">Ingeniero Sanitario | Musicoterapeuta | Neuromúsico</p>
            
            <div className="prose prose-slate text-slate-600 mb-8 text-justify">
              <p>
                Mi trayectoria no es convencional. Como ingeniero, entiendo el mundo a través de vibraciones, frecuencias y resonancias. Como musicoterapeuta, comprendo cómo esas físicas impactan la emoción humana.
              </p>
              <p>
                He recorrido <strong>Ecuador, Perú, México, India y EE.UU.</strong> investigando cómo diferentes culturas utilizan el sonido para sanar. El resultado de esa investigación es el Método Sonora: ciencia aplicada al bienestar.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              <div className="text-center">
                <h4 className="text-3xl font-bold text-slate-900">+10</h4>
                <p className="text-xs uppercase tracking-wider text-slate-500">Años Exp.</p>
              </div>
              <div className="text-center border-l border-slate-200">
                <h4 className="text-3xl font-bold text-slate-900">5</h4>
                <p className="text-xs uppercase tracking-wider text-slate-500">Países</p>
              </div>
              <div className="text-center border-l border-slate-200">
                <h4 className="text-3xl font-bold text-slate-900">2.5K</h4>
                <p className="text-xs uppercase tracking-wider text-slate-500">Impactados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. TESTIMONIOS (SOCIAL PROOF)
const TestimonialsSection = () => {
  const testimonials = [
    { text: "Llegué con la mente nublada y salí con una claridad que no sentía hace años.", author: "Ana María P.", role: "Empresaria" },
    { text: "No creía que el sonido pudiera tener tanto impacto físico. Dormí como un bebé.", author: "Elena R.", role: "Ingeniera" },
    { text: "La combinación de música y ciencia de Francisco es magistral.", author: "Dr. Alberto S.", role: "Médico" }
  ];

  return (
    <section className="py-24 bg-teal-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-serif font-bold text-center mb-16">Lo que dicen nuestros pacientes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-teal-800/50 p-8 rounded-2xl border border-teal-700/50"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current"/>)}
              </div>
              <p className="text-teal-100 italic mb-6">"{t.text}"</p>
              <div>
                <p className="font-bold">{t.author}</p>
                <p className="text-xs text-teal-300 opacity-70">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 8. RECURSOS GRATUITOS (SOLO INFO CARDS)
const ResourcesSection = () => {
  return (
    <section id="recursos" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Blog y Guías</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Aprende y Practica</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-teal-600 font-bold hover:underline">
            Ver todo el contenido <ArrowRight className="w-4 h-4"/>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer">
            <div className="h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center">
              <Activity className="text-teal-400 w-16 h-16" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-teal-600 uppercase">Artículo Científico</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3 group-hover:text-teal-600 transition-colors">¿Qué es el ruido rosa?</h3>
              <p className="text-slate-500 text-sm mb-4">Descubre por qué esta frecuencia específica ayuda a conciliar el sueño profundo mejor que el silencio.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer">
            <div className="h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center">
               <Headphones className="text-teal-400 w-16 h-16 opacity-80" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-teal-600 uppercase">Lista de Reproducción</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3 group-hover:text-teal-600 transition-colors">Frecuencias para Estudiar</h3>
              <p className="text-slate-500 text-sm mb-4">Una selección curada de música lo-fi y beats binaurales para mantener el enfoque por horas.</p>
              
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer">
            <div className="h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center">
               <Wind className="text-teal-400 w-16 h-16" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-teal-600 uppercase">Guía Práctica</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3 group-hover:text-teal-600 transition-colors">Respiración 4-7-8</h3>
              <p className="text-slate-500 text-sm mb-4">La técnica definitiva para reducir la ansiedad en menos de 60 segundos. Paso a paso.</p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 9. CONTACTO (SIN FORMULARIO, SOLO WHATSAPP)
const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="grid lg:grid-cols-2 gap-12 relative z-10 items-center">
            
            {/* Texto Informativo */}
            <div className="text-white">
              <span className="text-teal-400 font-bold tracking-widest text-sm uppercase mb-2 block">Contacto Directo</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Hablemos de tu bienestar</h2>
              <p className="text-slate-300 mb-10 text-lg">
                Sin intermediarios ni formularios largos. Elige con quién deseas hablar y escríbenos directamente por WhatsApp para agendar tu cita o resolver dudas.
              </p>
              
              <div className="space-y-6 border-t border-slate-800 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-teal-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Visítanos</p>
                    <p className="font-bold text-lg">Carrera 39 # 20-24, Pasto</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-teal-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Escríbenos</p>
                    <p className="font-bold text-lg">contacto@metodosonora.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de WhatsApp */}
            <div className="flex flex-col gap-6">
              
              {/* Botón Francisco */}
              <a
                href="https://wa.me/573206586727?text=Hola%20Francisco,%20me%20interesa%20agendar%20una%20sesión%20individual."
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-teal-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all group flex items-center gap-6 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-600 uppercase mb-1">Terapia Individual</p>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Chat con Francisco</h3>
                  <p className="text-slate-500 text-sm">+57 320 658 6727</p>
                </div>
                <ArrowRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-colors" />
              </a>
   

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 10. FOOTER
const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 font-light text-sm">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <a href="#" className="text-2xl font-serif font-bold text-white tracking-wider flex items-center gap-2 mb-6">
          <Activity className="w-6 h-6 text-teal-500" />
          MÉTODO SONORA
        </a>
        <p className="mb-6 opacity-80 leading-relaxed">
          Transformando vidas a través de la neurociencia y la música. Un proyecto de Francisco Lagos Luna.
        </p>
        <div className="flex gap-4">
           {/* Social Icons Placeholder */}
           <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors cursor-pointer"><Globe className="w-4 h-4"/></div>
           <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors cursor-pointer"><Mail className="w-4 h-4"/></div>
        </div>
      </div>
      
      <div>
        <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Explorar</h5>
        <ul className="space-y-3">
          <li><a href="#que-es" className="hover:text-teal-400 transition-colors">Concepto</a></li>
          <li><a href="#el-metodo" className="hover:text-teal-400 transition-colors">Metodología</a></li>
          <li><a href="#beneficios" className="hover:text-teal-400 transition-colors">Resultados</a></li>
          <li><a href="#testimonios" className="hover:text-teal-400 transition-colors">Testimonios</a></li>
        </ul>
      </div>

      <div>
        <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Legal</h5>
        <ul className="space-y-3">
          <li><a href="#" className="hover:text-teal-400 transition-colors">Política de Privacidad</a></li>
          <li><a href="#" className="hover:text-teal-400 transition-colors">Términos y Condiciones</a></li>
          <li><a href="#" className="hover:text-teal-400 transition-colors">Aviso Legal</a></li>
        </ul>
      </div>

      <div>
        <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Ubicación</h5>
        <p className="mb-2">Avenida Los Estudiantes</p>
        <p className="mb-4">Pasto, Nariño, Colombia</p>
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
           <p className="text-xs text-slate-500 mb-1">Horario de Atención</p>
           <p className="text-white font-bold">Lun - Vie: 8am - 6pm</p>
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center flex flex-col md:flex-row justify-between items-center gap-4">
      <span>&copy; 2025 Francisco Lagos Luna. Todos los derechos reservados.</span>
      <span className="flex items-center gap-1 text-slate-600">Desarrollado con <Brain className="w-3 h-3"/> por Iván Zúñiga</span>
    </div>
  </footer>
);

// APP PRINCIPAL
const App = () => {
  const [showProtocol, setShowProtocol] = useState(false);

  return (
    <div className="font-sans antialiased selection:bg-teal-500 selection:text-white bg-slate-50 scroll-smooth">
      <Navbar onOpenProtocol={() => setShowProtocol(true)} />
      
      {/* Modal del Protocolo (Superpuesto) */}
      <AnimatePresence>
        {showProtocol && (
            <ProtocoloReinicio 
                isOpen={showProtocol} 
                onClose={() => setShowProtocol(false)} 
            />
        )}
      </AnimatePresence>

      <HeroSection onOpenProtocol={() => setShowProtocol(true)} />
      <ConceptSection />
      
      {/* SECCIÓN NUEVA: LEAD MAGNET (Entre Concepto y Metodología) */}
      <LeadMagnetSection onOpenProtocol={() => setShowProtocol(true)} />
      
      <ProcessAndBenefits />
      <ServicesSection />
      <AboutSection />
      <ResourcesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;