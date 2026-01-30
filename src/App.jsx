import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Wind, Eye, Brain, Activity, ArrowRight, Menu, X, ChevronDown,
  Music, Users, MapPin, Check, DollarSign, MessageCircle,
  Star, Globe, Headphones, Zap, Waves, Mail, Calendar, HelpCircle, FileText, Shield
} from 'lucide-react';

// IMPORTACIÓN DEL PROTOCOLO (Asegúrate de tener este archivo)
import ProtocoloReinicio from './ProtocoloReinicio';

// --- ACTIVOS ---
const assets = {
  franciscoBio: "WhatsApp Image 2025-11-30 at 8.27.25 PM.png", // Asegúrate que esta ruta sea correcta
  serviceIndividual: "WhatsApp Image 2025-11-30 at 10.29.50 PM.png",
  serviceGrupal: "Captura de pantalla 2026-01-30 103126.png" // Usado como placeholder para el nuevo servicio
};

// --- DATOS LEGALES (Texto Genérico Colombia) ---
const legalContent = {
  privacy: (
    <div className="space-y-4 text-slate-300 text-sm text-justify">
      <p><strong>POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES</strong></p>
      <p>En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, <strong>MÉTODO SONORA</strong> informa que los datos personales recolectados a través de este sitio web serán tratados de manera confidencial y segura.</p>
      <p><strong>1. Finalidad:</strong> Los datos se utilizarán exclusivamente para la gestión de citas, envío de información sobre el tratamiento, facturación y comunicación de novedades relacionadas con nuestros servicios de bienestar.</p>
      <p><strong>2. Derechos del Titular:</strong> Usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales, así como a revocar la autorización otorgada para su tratamiento.</p>
      <p><strong>3. Responsable:</strong> Francisco Javier Lagos Luna, con domicilio en San Juan de Pasto, Colombia. Para ejercer sus derechos, puede escribir a: bioresonancia1@gmail.com.</p>
    </div>
  ),
  terms: (
    <div className="space-y-4 text-slate-300 text-sm text-justify">
      <p><strong>TÉRMINOS Y CONDICIONES DEL SERVICIO</strong></p>
      <p><strong>1. Naturaleza del Servicio:</strong> El Método Sonora ofrece entrenamiento neuro-acústico y musicoterapia. No sustituye tratamientos médicos o psiquiátricos especializados, sino que actúa como una terapia complementaria de bienestar.</p>
      <p><strong>2. Agendamiento y Cancelaciones:</strong> Las citas deben agendarse con al menos 24 horas de antelación. Las cancelaciones realizadas con menos de 12 horas de anticipación podrán estar sujetas a un cargo por el valor de la sesión reservada.</p>
      <p><strong>3. Pagos:</strong> Los pagos se realizan a través de las plataformas habilitadas (Mercado Pago, Transferencia Bancaria) antes del inicio del programa o sesión.</p>
      <p><strong>4. Compromiso:</strong> El usuario entiende que los resultados (enfoque, relajación) requieren de su participación activa y la práctica de los ejercicios sugeridos.</p>
    </div>
  ),
  legal: (
    <div className="space-y-4 text-slate-300 text-sm text-justify">
      <p><strong>AVISO LEGAL</strong></p>
      <p>Este sitio web y todo su contenido (textos, imágenes, audios, logotipos) son propiedad intelectual de <strong>Francisco Javier Lagos Luna</strong> o de terceros que han autorizado su uso.</p>
      <p>Queda prohibida la reproducción total o parcial de los contenidos sin autorización expresa. El Método Sonora no se hace responsable por el uso indebido de las técnicas aquí descritas sin la supervisión profesional adecuada.</p>
      <p>Jurisdicción: Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta ante los tribunales de San Juan de Pasto.</p>
    </div>
  )
};

// --- COMPONENTE MODAL LEGAL ---
const LegalModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h3 className="text-xl font-serif font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {content}
        </div>
        <div className="p-6 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold text-sm">Entendido</button>
        </div>
      </motion.div>
    </div>
  );
};

// --- ANIMACIONES ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- COMPONENTES UI ---

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
    { name: 'Reinicio Consciente', action: true, highlight: true }, // NOMBRE ACTUALIZADO
    { name: 'Método', href: '#el-metodo' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Preguntas', href: '#faq' }, // ANTES RECURSOS
  ];

  const handleNavClick = (item) => {
    if (item.action) onOpenProtocol();
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
                  className="text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 transition-colors uppercase tracking-widest relative group flex items-center gap-2 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5"
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
          <a href="#contacto" className="px-5 py-2 border border-teal-500/50 text-teal-400 text-xs font-bold rounded-full hover:bg-teal-500/10 transition-all flex items-center gap-2">
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
                        className="text-slate-900 bg-teal-400 py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2"
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

// 1. INICIO (HERO SECTION - YOUTUBE)
const HeroSection = ({ onOpenProtocol }) => {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
      {/* BACKGROUND DE YOUTUBE */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <iframe
            className="w-full h-full object-cover scale-150 opacity-40 grayscale-[30%]"
            src="https://www.youtube.com/embed/nsi0j09tAVA?autoplay=1&mute=1&controls=0&loop=1&playlist=nsi0j09tAVA&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1"
            title="Hero Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ pointerEvents: 'none' }}
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-black/70"></div>
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
          Vibrar es <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Vivir</span>
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
          <button onClick={onOpenProtocol} className="w-full sm:w-auto px-8 py-4 bg-teal-500 text-slate-900 font-bold rounded-full hover:bg-teal-400 transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(20,184,166,0.3)] transform hover:scale-105">
            <Play className="w-5 h-5 fill-current" />
            Reinicio Conciente
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

// 2. ¿QUÉ ES EL MÉTODO SONORA? (TEXTOS DE AJUSTES.DOCX)
const ConceptSection = () => {
  return (
    <section id="que-es" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-12 translate-x-32 z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div className="lg:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Definición y Propósito</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Estimula tu cerebro, <br/><span className="text-teal-600">Fortalece tu atención</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed text-justify">
              <p>
                Imagina poder mejorar tu enfoque, reducir el ruido mental y accionar tus metas… todo <strong>desde el sonido</strong>.
              </p>
              <p>
                El <strong>Método Sonora</strong> es un protocolo de reprogramación mental basada en neuromúsica, respiración consciente y frecuencias cerebrales para ayudarte a recuperar tu claridad, presencia y energía.
              </p>
              <p>
                Utilizamos sonidos que activan zonas específicas del cerebro asociadas al enfoque, la toma de decisiones y la productividad. Integramos principios de la musicoterapia, neuromúsica y respiración rítmica.
              </p>
              <div className="p-6 bg-slate-50 border-l-4 border-teal-500 rounded-r-xl">
                <p className="font-medium text-slate-800 italic">"El resultado: una mente más entrenada, más enfocada y emocionalmente regulada."</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:w-1/2 grid grid-cols-2 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl flex flex-col justify-between h-64 transform translate-y-8">
              <Brain className="w-10 h-10 text-teal-400" />
              <div>
                <h3 className="text-xl font-bold mb-2">Neuromúsica</h3>
                <p className="text-sm text-slate-400">Sonidos que activan zonas específicas de productividad.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-teal-500 p-8 rounded-3xl text-white shadow-2xl flex flex-col justify-between h-64">
              <Activity className="w-10 h-10 text-white" />
              <div>
                <h3 className="text-xl font-bold mb-2">Respiración Rítmica</h3>
                <p className="text-sm text-teal-100">Regulación emocional y coherencia cardíaca.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 3. METODOLOGÍA CIENTÍFICA (AMPLIADA)
const ProcessAndBenefits = () => {
  return (
    <section id="el-metodo" className="bg-slate-900 text-white py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-teal-400 font-bold tracking-widest text-sm uppercase">Base Científica</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6">Arquitectura del Sonido Terapéutico</h2>
          <p className="text-slate-400 text-lg">
            No es magia, es neurofisiología. Diseñamos estímulos auditivos precisos para inducir estados de flujo (Flow State) medibles y replicables.
          </p>
        </div>

        {/* 4 Steps Expanded */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { num: "01", title: "Arrastre de Ondas", desc: "Uso de pulsos binaurales para sincronizar los hemisferios cerebrales y guiar la mente de Beta (estrés) a Alfa (calma).", icon: <Waves /> },
            { num: "02", title: "Resonancia Vagal", desc: "Frecuencias graves que estimulan el nervio vago, reduciendo el cortisol y activando el sistema parasimpático.", icon: <Activity /> },
            { num: "03", title: "Psicoacústica", desc: "Paisajes sonoros diseñados para evocar seguridad y reducir la vigilancia de la amígdala cerebral.", icon: <Headphones /> },
            { num: "04", title: "Neuroplasticidad", desc: "La repetición del protocolo crea nuevas rutas neuronales, haciendo que el acceso a la calma sea cada vez más rápido.", icon: <Brain /> },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="relative p-8 border border-slate-700 rounded-3xl bg-slate-800/30 hover:bg-slate-800 transition-all group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <div className="absolute top-6 right-6 text-slate-700 font-serif text-4xl font-bold opacity-30 group-hover:text-teal-500 group-hover:opacity-100 transition-all">{step.num}</div>
              <div className="mb-6 text-teal-400 p-3 bg-slate-900 rounded-xl inline-block shadow-lg">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Brainwave Chart Visual */}
        <div className="mb-32 p-10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2.5rem] border border-slate-700 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-white">¿Qué pasa en tu cerebro?</h3>
            <p className="text-slate-400 text-base mb-6">
              En estado de estrés, tu cerebro opera en <strong>Beta Alta (20-30Hz)</strong>, consumiendo mucha energía. El Método Sonora te guía suavemente hacia <strong>Alfa (8-12Hz)</strong>, el estado óptimo para el aprendizaje y la creatividad.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 text-xs font-bold text-red-300 bg-red-900/20 px-3 py-1 rounded-full"><Activity size={14}/> Estrés / Ansiedad</div>
               <ArrowRight className="text-slate-500"/>
               <div className="flex items-center gap-2 text-xs font-bold text-teal-300 bg-teal-900/20 px-3 py-1 rounded-full"><Brain size={14}/> Enfoque / Calma</div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-32 flex items-end justify-between gap-1">
             {/* Simulación visual de ondas bajando de frecuencia */}
             {[...Array(20)].map((_, i) => (
                <motion.div 
                    key={i} 
                    className={`w-full rounded-t-md ${i < 8 ? 'bg-red-500/50' : i < 14 ? 'bg-amber-500/50' : 'bg-teal-500'}`}
                    initial={{ height: '20%' }}
                    whileInView={{ height: `${Math.random() * (100 - (i*4)) + 20}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                ></motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. SERVICIOS (TEXTOS DE AJUSTES.DOCX + NUEVA TARJETA)
const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Inversión en ti</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Programas Disponibles</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
          
          {/* CARD 1: TERAPIA INDIVIDUAL (TEXTO ACTUALIZADO) */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300 h-full">
            <div className="h-64 relative">
              <img src={assets.serviceIndividual} alt="Sesión Individual" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="bg-teal-500 text-xs font-bold px-3 py-1 rounded-md inline-block mb-2">Presencial / Online</div>
                <h3 className="text-2xl font-serif font-bold">Sesión "Vibrar es Vivir"</h3>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Un espacio terapéutico donde el sonido, la respiración y la ciencia se unen para ayudarte a soltar el estrés, reenfocar tu mente y reconectar con tu equilibrio interno.
              </p>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                    "Valoración personalizada", 
                    "Plan sonoro a tu medida", 
                    "Sesión terapéutica profunda", 
                    "Acompañamiento post-sesión"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="mt-0.5 bg-teal-100 p-1 rounded-full"><Check className="w-3 h-3 text-teal-600" /></div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4 mt-auto">
                <a href="https://wa.me/573206586727?text=Hola,%20quiero%20más%20info%20sobre%20la%20Sesión%20Individual." target="_blank" rel="noreferrer" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold text-center text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={18}/> Agendar
                </a>
                <a href="https://mpago.li/1zYZUxM" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold text-center text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  <DollarSign size={18}/> Pagar
                </a>
              </div>
            </div>
          </div>

          {/* CARD 2: NUEVO PROGRAMA (PROTOCOLO DE INTERVENCIÓN) */}
          <div className="bg-slate-900 text-white rounded-3xl shadow-xl overflow-hidden border border-slate-800 flex flex-col hover:shadow-2xl transition-all duration-300 transform lg:-translate-y-4 h-full relative">
            
            <div className="h-64 relative">
              <img src={assets.serviceGrupal} alt="Sesión Grupal" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="bg-teal-500 text-xs font-bold px-3 py-1 rounded-md inline-block mb-2">Programa Completo</div>
                <h3 className="text-2xl font-serif font-bold">Método Sonora: Protocolo</h3>
                <p className="text-teal-400 text-sm font-bold tracking-widest uppercase">Intervención de 4 Semanas</p>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <p className="text-slate-400 text-sm mb-8">
                 Un viaje estructurado de transformación profunda. Cuatro fases diseñadas para integrar el bienestar sonoro como un hábito permanente en tu vida.
              </p>
              
              {/* Timeline Vertical */}
              <div className="space-y-6 mb-8 relative pl-4 border-l-2 border-slate-700 ml-2">
                {[
                    { title: "Semana 1: Fundamentos", desc: "Valoración y definición de la meta." },
                    { title: "Semana 2: Práctica", desc: "Hábitos y práctica diaria de escucha." },
                    { title: "Semana 3: Profundización", desc: "Visualización sonora inmersiva." },
                    { title: "Semana 4: Integración", desc: "Evaluación y consolidación." }
                ].map((week, i) => (
                   <div key={i} className="relative pl-6">
                      <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-teal-500"></div>
                      <h4 className="font-bold text-white text-sm">{week.title}</h4>
                      <p className="text-xs text-slate-400">{week.desc}</p>
                   </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto">
                <a href="https://wa.me/573206586727?text=Hola,%20me%20interesa%20el%20Protocolo%20de%204%20Semanas." target="_blank" rel="noreferrer" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold text-center text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={18}/> Aplicar
                </a>
                <a href="#" className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold text-center text-sm hover:bg-teal-500 transition-colors flex items-center justify-center gap-2">
                  <DollarSign size={18}/> Invertir
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

// 5. SOBRE MÍ (TEXTOS DE AJUSTES.DOCX)
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
            <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Neuromúsico</span>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Francisco Javier Lagos Luna</h2>
            <p className="text-xl text-slate-500 mb-6 font-light">Ingeniero | Musicoterapeuta | Investigador</p>
            
            <div className="prose prose-slate text-slate-600 mb-8 text-justify">
              <p>
                Mi camino une ciencia, arte y conciencia. Como ingeniero aprendí a leer el mundo a través de vibraciones y resonancias. Como musicoterapeuta, descubrí que ese mismo lenguaje sonoro puede transformar emociones, activar memorias y generar bienestar real.
              </p>
              <p>
                He recorrido <strong>Ecuador, Perú, México, India y EE.UU.</strong> investigando cómo distintas culturas usan el sonido como medicina. De ese viaje nace el Método Sonora: una herramienta neuromusical que convierte la música en puente entre el cuerpo, la mente y el alma.
              </p>
              <p className="font-medium text-slate-800">
                Hoy acompaño a personas y organizaciones a reconectarse con su potencial… a través del poder del sonido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. FAQ (REEMPLAZO DE BLOG)
const FAQSection = () => {
    const faqs = [
        { q: "¿Necesito saber de música para tomar la terapia?", a: "No, en absoluto. El método es pasivo-receptivo. Tú solo necesitas disponer de tu atención y presencia; el sonido hace el trabajo de regulación." },
        { q: "¿Es una sesión presencial o virtual?", a: "Ambas modalidades son efectivas. Presencialmente utilizamos instrumentos en vivo y camilla vibratoria. Virtualmente usamos audio binaural de alta fidelidad." },
        { q: "¿Cuántas sesiones necesito?", a: "Desde la primera sesión sientes alivio. Para cambios estructurales de hábitos y ansiedad, recomendamos el ciclo de 4 semanas." },
        { q: "¿Qué pasa si me quedo dormido?", a: "Es muy común y es una buena señal. Tu sistema nervioso entra en reparación profunda. El efecto terapéutico sucede igual." }
    ];

    return (
        <section id="faq" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-2 block">Dudas Comunes</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Preguntas Frecuentes</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-start gap-2">
                                <HelpCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                                {item.q}
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed pl-7">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 7. TESTIMONIOS (CON 3 MÁS)
const TestimonialsSection = () => {
  const testimonials = [
    { text: "Llegué con la mente nublada y salí con una claridad que no sentía hace años.", author: "Ana María P.", role: "Empresaria" },
    { text: "No creía que el sonido pudiera tener tanto impacto físico. Dormí como un bebé.", author: "Elena R.", role: "Ingeniera" },
    { text: "La combinación de música y ciencia de Francisco es magistral.", author: "Dr. Alberto S.", role: "Médico" },
    { text: "Mi ansiedad bajó notablemente desde la segunda semana del protocolo.", author: "Carlos M.", role: "Abogado" },
    { text: "Es como un masaje para el cerebro. Salgo renovada.", author: "Sofia L.", role: "Diseñadora" },
    { text: "Francisco tiene una energía única. Muy profesional.", author: "Javier T.", role: "Docente" }
  ];

  return (
    <section className="py-24 bg-teal-900 text-white relative overflow-hidden">
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
              <p className="text-teal-100 italic mb-6 text-sm">"{t.text}"</p>
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

// 8. CONTACTO (CON MAPA REAL)
const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 overflow-hidden relative shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            
            {/* Columna Info */}
            <div className="text-white flex flex-col justify-center">
              <span className="text-teal-400 font-bold tracking-widest text-sm uppercase mb-2 block">Contacto Directo</span>
              <h2 className="text-4xl font-serif font-bold mb-6">Hablemos de tu bienestar</h2>
              <p className="text-slate-300 mb-8">
                Escríbenos directamente por WhatsApp. Te ayudamos a resolver tus dudas o agendar tu cita de forma rápida y personalizada.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-teal-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Visítanos</p>
                    <p className="font-bold text-lg">Carrera 39 # 20-24, Pasto</p>
                    <p className="text-xs text-slate-500">Avenida de los Estudiantes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-teal-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Escríbenos</p>
                    <p className="font-bold text-lg">Bioresonancia1@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                    href="https://wa.me/573206586727?text=Hola%20Francisco,%20me%20interesa%20agendar."
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold inline-flex items-center gap-3 transition-colors shadow-lg"
                >
                    <MessageCircle className="w-5 h-5" /> Chatear por WhatsApp
                </a>
              </div>
            </div>

            {/* Columna Mapa */}
            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border-4 border-slate-800 bg-slate-800 relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.916843657734!2d-77.28277252526685!3d1.217983661980315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed48766155555%3A0x5555555555555555!2sCra.%2039%20%2320-24%2C%20Pasto%2C%20Nari%C3%B1o!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
               ></iframe>
               <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-lg text-xs font-bold shadow-md">
                  📍 Sede Principal
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// 9. FOOTER (CON MODALES LEGALES)
const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: null });

  const openLegal = (type) => {
    let title = "";
    let content = null;
    if(type === 'privacy') { title = "Política de Privacidad"; content = legalContent.privacy; }
    if(type === 'terms') { title = "Términos y Condiciones"; content = legalContent.terms; }
    if(type === 'legal') { title = "Aviso Legal"; content = legalContent.legal; }
    
    setModalContent({ title, content });
    setModalOpen(true);
  };

  return (
    <>
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
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Legal</h5>
            <ul className="space-y-3 cursor-pointer">
              <li><button onClick={() => openLegal('privacy')} className="hover:text-teal-400 transition-colors text-left">Política de Privacidad</button></li>
              <li><button onClick={() => openLegal('terms')} className="hover:text-teal-400 transition-colors text-left">Términos y Condiciones</button></li>
              <li><button onClick={() => openLegal('legal')} className="hover:text-teal-400 transition-colors text-left">Aviso Legal</button></li>
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
          <span>&copy; 2026 Francisco Lagos Luna. Todos los derechos reservados.</span>
          <span className="flex items-center gap-1 text-slate-600">Desarrollado con <Brain className="w-3 h-3"/> por Iván Zúñiga</span>
        </div>
      </footer>

      {/* MODAL LEGAL */}
      <AnimatePresence>
        {modalOpen && (
          <LegalModal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)} 
            title={modalContent.title} 
            content={modalContent.content}
          />
        )}
      </AnimatePresence>
    </>
  );
};

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
      
      <ProcessAndBenefits />
      <ServicesSection />
      <AboutSection />
      <FAQSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;