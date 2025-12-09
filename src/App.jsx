import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  Play, Wind, Eye, Brain, Activity, ArrowRight, Menu, X, ChevronDown, 
  Music, Users, Calendar, MapPin, Check, DollarSign, MessageCircle, 
  Star, Quote, Globe, Headphones, HelpCircle, Zap, Waves
} from 'lucide-react';

// --- ACTIVOS ---
const assets = {

  videoHero: "VID-20251130-WA0047.mp4",

  franciscoBio: "WhatsApp Image 2025-11-30 at 8.27.25 PM.png",

  serviceIndividual: "WhatsApp Image 2025-11-30 at 10.29.50 PM.png",

  serviceGroup: "WhatsApp Image 2025-12-01 at 7.19.36 AM.jpeg",

  // Galería

  imgGallery1: "WhatsApp Image 2025-11-30 at 8.15.26 PM (1).jpeg",

  imgGallery2: "WhatsApp Image 2025-11-30 at 8.15.26 PM (1).jpeg",    

  imgGallery4: "4.png",    

  // Logos Aliados (Usaremos los nombres de archivo que ya tienes)

  logoBioexpo: "WhatsApp Image 2025-11-30 at 7.50.03 PM.jpeg", // Ajustar según corresponda

};



// --- COMPONENTES UI ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md py-3 shadow-xl' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold text-white tracking-wider flex items-center gap-2">
          <Activity className="w-6 h-6 text-teal-400" />
          MÉTODO <span className="text-teal-400">SONORA</span>
        </a>

        <div className="hidden lg:flex gap-8 items-center">
          {['Sobre Mí', 'El Método', 'Servicios', 'Testimonios'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-white/90 hover:text-teal-400 transition-colors uppercase tracking-widest relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="#servicios" className="px-6 py-2.5 bg-teal-500 text-white text-sm font-bold rounded-full hover:bg-teal-600 transition-all shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transform hover:-translate-y-0.5 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Agendar Cita
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-6 lg:hidden flex flex-col gap-4 shadow-2xl"
          >
            {['Sobre Mí', 'El Método', 'Servicios', 'Testimonios'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-300 hover:text-white py-3 border-b border-slate-800 font-medium" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 opacity-60">
          <source src={assets.videoHero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <span className="inline-block py-1.5 px-4 border border-teal-400/50 rounded-full bg-teal-900/30 text-teal-300 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md shadow-lg">
            Neurociencia + Música + Bienestar
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
        >
          Vivir es <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Vibrar</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-2xl text-slate-200 font-light max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
        >
          Entrena tu cerebro al ritmo del sonido. Transforma la dispersión en enfoque y las ideas en realidades tangibles.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#el-metodo" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-3 group shadow-xl">
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            Descubrir el Método
          </a>
          <a href="#servicios" className="w-full sm:w-auto px-8 py-4 border-2 border-white/80 text-white font-bold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all shadow-lg flex items-center justify-center gap-2">
            Ver Servicios
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-10 h-10" />
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="sobre-mí" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-5/12 relative">
            <div className="absolute inset-0 bg-teal-500/10 rounded-3xl transform rotate-3 scale-105"></div>
            <img 
              src={assets.franciscoBio} 
              alt="Francisco Lagos Luna" 
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[3/4]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
              <p className="font-serif text-lg text-slate-800 italic">"La música no es solo arte, es la arquitectura de tu atención."</p>
            </div>
          </div>
          
          <div className="lg:w-7/12">
            <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">El Experto Detrás</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Francisco Javier Lagos Luna</h2>
            <h3 className="text-xl text-teal-700 font-medium mb-6">Ingeniero Sanitario | Musicoterapeuta | Neuromúsico</h3>
            
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed text-justify">
              <p>
                Soy un explorador del sonido como herramienta de transformación humana. Mi formación única combina la precisión de la ingeniería con la sensibilidad de la musicoterapia.
              </p>
              <p>
                He llevado el poder de la vibración a países como <strong>Ecuador, Perú, México, India y Estados Unidos</strong>, colaborando con expertos en salud para crear protocolos que unen arte y neurociencia.
              </p>
              <p>
                Mi misión es acompañarte a pasar de la intención a la acción, usando la consciencia sonora para reprogramar tus hábitos y potenciar tu bienestar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-50 rounded-lg text-teal-600"><Globe className="w-6 h-6" /></div>
                <div>
                  <p className="font-bold text-slate-900">Experiencia Global</p>
                  <p className="text-sm text-slate-500">5 Países visitados</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-50 rounded-lg text-teal-600"><Headphones className="w-6 h-6" /></div>
                <div>
                  <p className="font-bold text-slate-900">Método Propio</p>
                  <p className="text-sm text-slate-500">Neuromúsica Aplicada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- NUEVA SECCIÓN EXTRA: BRAIN WAVES (Innovación) ---
const BrainWavesSection = () => {
  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl font-serif font-bold mb-12">La Neurociencia del Sonido</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="h-20 flex items-center justify-center mb-4">
              <Activity className="w-12 h-12 text-slate-500" />
            </div>
            <h4 className="text-xl font-bold mb-2 text-slate-400">Ondas Beta</h4>
            <p className="text-sm text-slate-400">Tu estado normal: alerta, lógico, pero propenso al estrés y la ansiedad.</p>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-teal-900/50 to-slate-800/50 rounded-2xl border border-teal-500/30 transform md:-translate-y-4 shadow-2xl">
            <div className="h-20 flex items-center justify-center mb-4">
              <Waves className="w-16 h-16 text-teal-400" />
            </div>
            <h4 className="text-xl font-bold mb-2 text-teal-400">Ondas Alpha (Meta)</h4>
            <p className="text-sm text-slate-300">El estado de flujo. Calma, creatividad y super-aprendizaje. Aquí te lleva el Método Sonora.</p>
          </div>

          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="h-20 flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 text-purple-400" />
            </div>
            <h4 className="text-xl font-bold mb-2 text-purple-400">Ondas Theta</h4>
            <p className="text-sm text-slate-400">Relajación profunda, meditación y conexión subconsciente.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const MethodSection = () => {
  const phases = [
    { number: "01", title: "Valoración Inicial", desc: "Diagnóstico preciso de tu punto de partida en concentración y energía." },
    { number: "02", title: "Definición de Meta", desc: "Establecemos un objetivo claro grabado en tu propia voz para activar la motivación." },
    { number: "03", title: "Inmersión Sonora", desc: "Práctica con audiofrecuencias y respiración para inducir estados de flujo." },
    { number: "04", title: "Acción Consciente", desc: "Transformamos la energía mental en micro-acciones diarias tangibles." }
  ];

  return (
    <section id="el-metodo" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-teal-600 font-bold tracking-widest text-sm uppercase">La Metodología</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-2 mb-6">Un Entrenamiento Cerebral</h2>
          <p className="text-lg text-slate-600">
            El Método Sonora no es magia, es ciencia. Unimos tres pilares fundamentales para activar la neuroplasticidad de tu cerebro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <Music className="w-8 h-8" />, title: "Música Funcional", desc: "Frecuencias diseñadas para inducir ondas Alpha/Theta que facilitan el aprendizaje." },
            { icon: <Wind className="w-8 h-8" />, title: "Respiración Rítmica", desc: "Regulación inmediata del sistema nervioso para reducir el cortisol (estrés)." },
            { icon: <Eye className="w-8 h-8" />, title: "Visualización Guiada", desc: "Programación de la mente subconsciente hacia metas concretas." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
          <h3 className="text-3xl font-bold mb-12 relative z-10 text-center">Tu Ruta de Transformación</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {phases.map((phase, i) => (
              <div key={i} className="border-l-2 border-teal-500/30 pl-6">
                <span className="text-4xl font-bold text-teal-500 mb-2 block">{phase.number}</span>
                <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                <p className="text-slate-400 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const stats = [
    { number: "+15", label: "Eventos Masivos" },
    { number: "2.5K", label: "Asistentes" },
    { number: "100%", label: "Conexión" },
  ];

  return (
    <section id="experiencias" className="py-24 bg-slate-900 text-white relative border-y border-slate-800">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-teal-400 font-bold tracking-widest text-sm uppercase mb-2 block">Portafolio de Experiencias</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Impacto Inmersivo
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Diseñamos experiencias sonoras para teatros, festivales y empresas. Una fusión de arte y bienestar que conecta con audiencias masivas.
            </p>
          </div>
          <div className="flex gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.number}</p>
                <p className="text-xs text-teal-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
          <div className="md:col-span-2 relative group rounded-2xl overflow-hidden cursor-pointer shadow-2xl">
            <img src={assets.imgGallery4} alt="Bioexpo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-bold mb-2">Paisajes Sonoros: BioExpo</h3>
              <p className="text-slate-300">Experiencia sold-out de 4 días.</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1 relative group rounded-2xl overflow-hidden cursor-pointer shadow-xl">
              <img src={assets.imgGallery2} alt="Naturaleza" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute bottom-4 left-4 font-bold">Retiros Naturales</div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl flex items-center justify-center p-6 text-center cursor-pointer hover:shadow-glow transition-all">
              <div>
                <h3 className="text-xl font-bold mb-2">¿Tienes un espacio?</h3>
                <p className="text-sm opacity-90 mb-4">Llevemos esta experiencia a tu ciudad.</p>
                <a href="https://wa.me/573206586727?text=Hola%20Francisco,%20me%20interesa%20cotizar%20un%20evento%20de%20Paisajes%20Sonoros." target="_blank" rel="noreferrer" className="bg-white text-teal-900 px-6 py-2 rounded-full text-xs font-bold uppercase inline-block">Cotizar Evento</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  // LINKS MERCADOPAGO ACTUALIZADOS
  const mpLinkIndividual = "https://mpago.li/1zYZUxM"; 
  const mpLinkGrupal = "https://mpago.li/2T2VVQm";

  return (
    <section id="servicios" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Inicia tu proceso</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Planes y Servicios</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          
          {/* Servicio 1 */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-300">
            <div className="md:w-5/12 relative h-64 md:h-auto">
              <img src={assets.serviceIndividual} alt="Terapia Individual" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-md">Individual</div>
            </div>
            <div className="md:w-7/12 p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Terapia "Vivir es Vibrar"</h3>
              <p className="text-slate-500 text-sm mb-6">Sesión 1 a 1 con Francisco Lagos. Método Sonora completo.</p>
              <ul className="space-y-2 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-teal-500 mt-0.5" /> <span>Diagnóstico de enfoque</span></li>
                <li className="flex items-start gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-teal-500 mt-0.5" /> <span>Respiración guiada</span></li>
                <li className="flex items-start gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-teal-500 mt-0.5" /> <span>Plan de acción personalizado</span></li>
              </ul>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div><span className="text-3xl font-bold text-slate-900">$150.000</span> <span className="text-xs text-slate-400">COP</span></div>
                <a href={mpLinkIndividual} target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2">Pagar <DollarSign className="w-3 h-3" /></a>
              </div>
              <a href="https://wa.me/573206586727" target="_blank" rel="noreferrer" className="mt-3 text-center text-xs text-teal-600 font-bold hover:underline block">Confirmar pago en WhatsApp</a>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-300">
            <div className="md:w-5/12 relative h-64 md:h-auto">
              <img src={assets.serviceGroup} alt="Grupal" className="w-full h-full object-cover object-top" />
              <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-md">Grupal</div>
            </div>
            <div className="md:w-7/12 p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Musicoterapia Grupal</h3>
              <p className="text-slate-500 text-sm mb-6">Dirigido por el maestro Omar López.</p>
              <ul className="space-y-2 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500 mt-0.5" /> <span>Dinámicas de integración</span></li>
                <li className="flex items-start gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500 mt-0.5" /> <span>Círculos de sonido sanador</span></li>
                <li className="flex items-start gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-purple-500 mt-0.5" /> <span>Para empresas y grupos</span></li>
              </ul>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div><span className="text-3xl font-bold text-slate-900">$80.000</span> <span className="text-xs text-slate-400">persona</span></div>
                <a href={mpLinkGrupal} target="_blank" rel="noreferrer" className="px-6 py-3 bg-purple-900 text-white rounded-xl font-bold text-sm hover:bg-purple-800 transition-colors flex items-center gap-2">Pagar <DollarSign className="w-3 h-3" /></a>
              </div>
              <a href="https://wa.me/573117762785" target="_blank" rel="noreferrer" className="mt-3 text-center text-xs text-purple-600 font-bold hover:underline block">Confirmar con Omar</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { text: "Llegué con la mente nublada y salí con una claridad que no sentía hace años. El método es increíble.", author: "Ana María P.", role: "Empresaria" },
    { text: "La combinación de la música con la respiración me ayudó a desbloquear mi creatividad para mi nuevo proyecto.", author: "Carlos D.", role: "Arquitecto" },
    { text: "Una experiencia que trasciende lo musical. Es verdadera medicina para el alma y la mente.", author: "Luisa F.", role: "Psicóloga" },
    { text: "Llevé a mi equipo de trabajo y la dinámica grupal mejoró la comunicación instantáneamente.", author: "Jorge M.", role: "Gerente de Ventas" },
    { text: "No creía que el sonido pudiera tener tanto impacto físico. Dormí como un bebé después de la sesión.", author: "Elena R.", role: "Ingeniera" },
    { text: "El enfoque de Francisco es único. Une la ciencia dura con la sensibilidad artística de forma magistral.", author: "Dr. Alberto S.", role: "Médico" }
  ];

  return (
    <section id="testimonios" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-slate-900 mb-16">Historias de Transformación</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative hover:shadow-md transition-shadow">
              <Quote className="w-8 h-8 text-teal-100 absolute top-4 right-4" />
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current"/>)}
              </div>
              <p className="text-slate-600 italic mb-6 text-sm">"{t.text}"</p>
              <div>
                <p className="font-bold text-slate-900">{t.author}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- NUEVA SECCIÓN EXTRA: FAQ (Elimina fricción de compra) ---
const FAQSection = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-serif font-bold text-center text-slate-900 mb-12">Preguntas Frecuentes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { q: "¿Necesito saber de música?", a: "No. El método es pasivo-receptivo. Tú solo necesitas escuchar y seguir la guía de respiración." },
            { q: "¿Es presencial o virtual?", a: "Ofrecemos ambas modalidades. La terapia individual es presencial en Pasto, pero hay seguimientos virtuales." },
            { q: "¿Para qué edades es?", a: "Desde niños de 7 años hasta adultos mayores. Adaptamos las frecuencias según la edad." },
            { q: "¿Qué ropa debo llevar?", a: "Ropa cómoda. No haremos ejercicio físico intenso, pero sí respiración profunda." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <HelpCircle className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">{item.q}</h4>
                <p className="text-slate-600 text-sm">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h4 className="text-2xl font-serif font-bold text-white mb-4">MÉTODO SONORA</h4>
        <p className="max-w-sm mb-6">Transformando vidas a través de la neurociencia y la música. Un proyecto de Francisco Lagos Luna.</p>
        <div className="flex gap-4">
          
        </div>
      </div>
      <div>
        <h5 className="text-white font-bold mb-4">Contacto</h5>
        <p className="mb-2 text-sm">Carrera 39 # 20-24</p>
        <p className="mb-2 text-sm">Avenida Los Estudiantes</p>
        <p className="mb-2 text-sm">Pasto, Nariño</p>
        <p className="text-sm text-teal-500 font-bold">+57 320 658 6727</p>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center text-xs">
      &copy; 2025 Francisco Lagos Luna. Todos los derechos reservados.
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="font-sans antialiased selection:bg-teal-500 selection:text-white bg-slate-50">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BrainWavesSection />
      <MethodSection />
      <PortfolioSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default App;