import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Star, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  ArrowRight,
  Building,
  Home,
  Palmtree,
  Calendar,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

// --- FONTS & STYLES ---
const fontStyles = (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
      
      .font-heading { font-family: 'Cormorant Garamond', serif; }
      .font-body { font-family: 'Montserrat', sans-serif; }
      
      /* Smooth Scrolling */
      html { scroll-behavior: smooth; }
      
      /* Custom Selection Color */
      ::selection {
        background-color: #C6A667;
        color: white;
      }
    `}
  </style>
);

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// --- COMPONENTS ---

// Navigation Component
const Navbar = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', id: 'home' },
    { name: 'Pourquoi Nous', id: 'features' },
    { name: 'Nos Packs', id: 'pricing' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {fontStyles}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled || activePage !== 'home' ? 'bg-[#0A1A33]/95 backdrop-blur-md shadow-xl py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={() => handleNavClick('home')} className="flex flex-col leading-none group text-left">
            <span className={`font-heading font-bold text-3xl tracking-wide transition-colors duration-300 text-white`}>
              HOUSE<span className="text-[#C6A667]">WISE</span>
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)}
                className={`font-body font-medium text-sm uppercase tracking-wider hover:text-[#C6A667] transition-colors duration-300 relative group ${
                  activePage === link.id ? 'text-[#C6A667]' : 'text-white/90'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#C6A667] transition-all duration-300 ${activePage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="bg-[#C6A667] hover:bg-[#b08d55] text-white px-6 py-3 rounded-full font-body font-bold uppercase tracking-wider text-xs shadow-lg shadow-[#C6A667]/20 transition-all"
            >
              Audit Gratuit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A1A33] fixed inset-0 z-40 flex flex-col pt-24 px-6"
            >
              <div className="flex flex-col space-y-8 text-center">
                {navLinks.map((link) => (
                  <button 
                    key={link.id} 
                    onClick={() => handleNavClick(link.id)}
                    className={`font-heading text-3xl hover:text-[#C6A667] transition-colors ${activePage === link.id ? 'text-[#C6A667]' : 'text-[#F7F4EF]'}`}
                  >
                    {link.name}
                  </button>
                ))}
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="bg-[#C6A667] text-white py-4 px-8 rounded-full font-body font-bold uppercase tracking-widest text-sm inline-block mx-auto w-full max-w-xs"
                >
                  Audit Gratuit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// Generic Header for internal pages
const PageHeader = ({ title, subtitle }) => (
  <div className="relative pt-32 pb-16 bg-[#0A1A33] overflow-hidden text-center">
     <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#C6A667 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
     <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-[#C6A667] font-body text-xs font-bold tracking-[0.2em] uppercase mb-4 block">{subtitle}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">{title}</h1>
        </motion.div>
     </div>
  </div>
);

// --- REUSABLE CONTENT SECTIONS ---

const HeroSection = ({ setActivePage }) => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A1A33]">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Architecture Marocaine Zellige" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1A33]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A33]/90 via-[#0A1A33]/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <div className="md:w-3/4 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0A1A33]/60 text-[#C6A667] border border-[#C6A667]/50 px-5 py-2 rounded-full text-xs font-body font-bold tracking-[0.15em] uppercase mb-8 inline-flex items-center gap-2 backdrop-blur-md"
            >
              <Star size={12} className="fill-[#C6A667]" /> Conciergerie Premium Casablanca
            </motion.span>
            
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight">
              L'excellence <br/>
              pour votre <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE5B4] to-[#C6A667]">
                bien immobilier
              </span>
              <span className="text-[#C6A667]">.</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed font-light">
              Nous transformons votre propriété en une expérience hôtelière d'exception. Revenus optimisés, sérénité totale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setActivePage('pricing')}
                className="px-8 py-4 bg-[#C6A667] hover:bg-[#b08d55] text-white rounded-lg font-body font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#C6A667]/20 flex items-center justify-center gap-2"
              >
                Découvrir nos offres <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setActivePage('contact')}
                className="px-8 py-4 bg-[#0A1A33]/40 text-white border border-white/20 rounded-lg font-body font-bold text-sm uppercase tracking-widest transition-all backdrop-blur-sm"
              >
                Nous contacter
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
);

const FeaturesSection = ({ showTitle = true }) => {
    const features = [
        {
        icon: <TrendingUp className="text-[#C6A667]" size={28} />,
        title: "Revenus Maximisés",
        desc: "Algorithmes de pricing dynamique ajustés quotidiennement pour battre le marché."
        },
        {
        icon: <ShieldCheck className="text-[#C6A667]" size={28} />,
        title: "Zéro Stress",
        desc: "Nous gérons tout : remise des clés, ménage, maintenance et urgences."
        },
        {
        icon: <Star className="text-[#C6A667]" size={28} />,
        title: "Standards 5 Étoiles",
        desc: "Linge de qualité hôtelière et ménage professionnel pour des avis élogieux."
        },
        {
        icon: <MapPin className="text-[#C6A667]" size={28} />,
        title: "Experts Locaux",
        desc: "Une équipe HouseWise dédiée qui connaît chaque recoin de la ville blanche."
        }
    ];

    return (
        <section className="py-24 bg-[#F7F4EF]">
            <div className="container mx-auto px-6">
                {showTitle && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#C6A667] font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Expertise</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#0A1A33] mb-6">L'Expérience HouseWise</h2>
                        <div className="w-20 h-1 bg-[#C6A667] mx-auto mb-6"></div>
                        <p className="font-body text-gray-600 max-w-2xl mx-auto text-lg font-light">
                            Une gestion locative nouvelle génération qui allie technologie de pointe et chaleur humaine.
                        </p>
                    </motion.div>
                )}

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                    <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-[#F7F4EF] transition-all duration-300 hover:shadow-xl hover:border-[#C6A667]/30"
                    >
                        <div className="bg-[#F7F4EF] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                        {feature.icon}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-[#0A1A33] mb-3">{feature.title}</h3>
                        <p className="font-body text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const FAQSection = () => {
    const faqData = [
        { q: "Comment suis-je payé ?", a: "C'est vous qui encaissez directement les revenus des plateformes (Airbnb, Booking). Nous vous envoyons ensuite une facture détaillée en fin de mois correspondant à notre commission." },
        { q: "Comment gérez-vous la fiscalité ?", a: "Nous pouvons vous orienter sur les statuts existants au Maroc (comme l'auto-entrepreneur) pour déclarer vos revenus en toute légalité." },
        { q: "Mon bien est-il assuré ?", a: "Les plateformes comme Airbnb offrent des garanties (AirCover). Nous veillons également à ce que les voyageurs respectent les lieux." },
        { q: "Puis-je utiliser mon bien quand je veux ?", a: "Absolument. Vous bloquez simplement vos dates dans le calendrier partagé. C'est votre propriété avant tout." },
    ];
    const [activeIdx, setActiveIdx] = useState(null);

    return (
        <section className="py-24 bg-[#F7F4EF] border-t border-[#C6A667]/10">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-[#C6A667] font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 block">FAQ</span>
                    <h3 className="font-heading text-4xl font-bold text-[#0A1A33]">Questions Fréquentes</h3>
                </div>
                <div className="space-y-4">
                    {faqData.map((item, i) => (
                        <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <button 
                                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-heading font-bold text-lg text-[#0A1A33]">{item.q}</span>
                                <ChevronDown className={`text-[#C6A667] transition-transform duration-300 ${activeIdx === i ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeIdx === i && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 font-body text-gray-600 leading-relaxed text-sm bg-gray-50/50"
                                    >
                                        {item.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PricingSection = ({ setActivePage, showTitle = true }) => {
    const packs = [
        {
        title: "Pack Digital",
        percentage: "8%",
        subtitle: "Gestion digitale complète",
        isPopular: false,
        features: [
            "Création annonce Airbnb/Booking",
            "SEO & photos (fournies)",
            "Sync. des calendriers",
            "Pricing dynamique hebdo",
            "Communication voyageurs",
            "Compte rendu mensuel"
        ]
        },
        {
        title: "Pack Essential",
        percentage: "15%",
        subtitle: "Délégation opérationnelle",
        isPopular: true,
        features: [
            "Tout du Pack Digital",
            "Installation boîte à clés",
            "Check-in / Check-out",
            "Ménage professionnel",
            "Linge de maison premium",
            "Gestion du calendrier",
            "Pricing dynamique journalier",
            "Assistance 7j/7",
            "Réapprovisionnement consommables"
        ]
        },
        {
        title: "Pack Sérénité",
        percentage: "20%",
        subtitle: "Clé en main haut de gamme",
        isPopular: false,
        isPremium: true,
        features: [
            "Tout du Pack Essential",
            "Photos professionnelles incluses",
            "Guide digital voyageurs",
            "Optimisation proactive",
            "Support prioritaire dédié",
            "Conseil stratégie locative",
            "Analyse de rentabilité"
        ]
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F7F4EF] hidden lg:block -skew-x-12 translate-x-32" />

            <div className="container mx-auto px-6 relative z-10">
                {showTitle && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#C6A667] font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Transparence</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#0A1A33] mb-6">Nos Formules</h2>
                        <div className="w-20 h-1 bg-[#C6A667] mx-auto mb-6"></div>
                        <p className="font-body text-xl text-gray-500 font-light">Investissez dans votre tranquillité d'esprit.</p>
                    </motion.div>
                )}

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto"
                >
                    {packs.map((pack, index) => (
                    <motion.div 
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                        pack.isPopular 
                            ? 'bg-[#0A1A33] text-white shadow-2xl scale-105 z-10 border border-[#C6A667]/50' 
                            : 'bg-white text-[#0A1A33] shadow-lg border border-[#F7F4EF]'
                        }`}
                    >
                        {pack.isPopular && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C6A667] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                            <Star size={12} className="fill-white" /> Le plus populaire
                        </div>
                        )}
                        
                        <div className="mb-8 pt-4">
                        <h3 className={`font-heading text-3xl font-bold mb-3 ${pack.isPremium ? 'text-[#C6A667]' : ''}`}>{pack.title}</h3>
                        <p className={`font-body text-xs uppercase tracking-wider mb-6 ${pack.isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                            {pack.subtitle}
                        </p>
                        <div className="flex items-center mb-4">
                            <span className={`font-heading text-5xl font-bold ${pack.isPopular ? 'text-[#F7F4EF]' : 'text-[#0A1A33]'}`}>{pack.percentage}</span>
                            <span className={`ml-3 font-body text-xs opacity-70 ${pack.isPopular ? 'text-gray-300' : 'text-gray-500'}`}>des revenus locatifs</span>
                        </div>
                        </div>

                        <div className="w-full h-px bg-current opacity-10 mb-8"></div>

                        <div className="flex-grow mb-8 space-y-4">
                        {pack.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                            <div className={`mt-1 mr-3 flex-shrink-0 ${pack.isPopular ? 'text-[#C6A667]' : 'text-[#0A1A33]'}`}>
                                <Check size={14} strokeWidth={3} />
                            </div>
                            <span className={`font-body text-sm ${pack.isPopular ? 'text-gray-200' : 'text-gray-600'}`}>{feature}</span>
                            </div>
                        ))}
                        </div>

                        <button 
                        onClick={() => setActivePage('contact')}
                        className={`w-full py-4 rounded-xl font-body font-bold uppercase tracking-widest text-xs text-center transition-all ${
                            pack.isPopular 
                            ? 'bg-[#C6A667] text-white hover:bg-[#b08d55]' 
                            : 'bg-[#F7F4EF] text-[#0A1A33] hover:bg-[#e8e4dc]'
                        }`}
                        >
                        Choisir ce pack
                        </button>
                    </motion.div>
                    ))}
                </motion.div>
                
                <div className="mt-16 text-center text-gray-400 font-body text-xs tracking-wide">
                    * Commission sur revenus nets. Frais de ménage payés par les voyageurs.
                </div>
            </div>
        </section>
    );
};

const ContactSection = () => {
    const [selectedProperty, setSelectedProperty] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showCalendly, setShowCalendly] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setTimeout(() => {
        setIsSubmitted(true);
        setTimeout(() => setShowCalendly(true), 1000); 
      }, 800);
    };
  
    const PropertyCard = ({ type, Icon, label }) => (
      <div 
        onClick={() => setSelectedProperty(type)}
        className={`cursor-pointer p-4 border rounded-xl transition-all duration-300 flex flex-col items-center gap-3 ${
          selectedProperty === type 
            ? 'border-[#C6A667] bg-[#F7F4EF] text-[#0A1A33]' 
            : 'border-gray-200 bg-white text-gray-400 hover:border-[#0A1A33]'
        }`}
      >
        <Icon size={24} className={selectedProperty === type ? 'text-[#C6A667]' : 'text-gray-300'} />
        <span className="font-body font-semibold text-xs uppercase tracking-wider">{label}</span>
      </div>
    );
  
    return (
        <section className="py-24 bg-white">
            <CalendlyModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
            <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
                
                <div className="lg:w-2/5 bg-[#0A1A33] p-12 text-[#F7F4EF] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10" style={{backgroundImage: 'radial-gradient(#C6A667 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                
                <div className="relative z-10">
                    <span className="text-[#C6A667] font-body text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Discussion</span>
                    <h3 className="font-heading text-4xl font-bold mb-6">Optimisons vos revenus.</h3>
                    <p className="font-body text-gray-300 mb-10 leading-relaxed font-light">
                    Discutons de votre bien à Casablanca. Notre équipe vous recontacte sous 24h pour une estimation précise.
                    </p>
                    
                    <div className="space-y-8 font-body">
                    <div className="flex items-start gap-4">
                        <div className="text-[#C6A667]"><Phone size={24} /></div>
                        <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                        <p className="text-lg">+212 6 00 00 00 00</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="text-[#C6A667]"><Mail size={24} /></div>
                        <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email</p>
                        <p className="text-lg">housewisecontact@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="text-[#C6A667]"><MapPin size={24} /></div>
                        <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Bureau</p>
                        <p className="text-lg">Casablanca, Maroc</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                
                <div className="lg:w-3/5 p-8 md:p-12 bg-white relative">
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <h4 className="font-heading text-3xl font-bold text-[#0A1A33] mb-6">Audit Gratuit</h4>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                            <label className="text-xs font-bold text-[#0A1A33] uppercase tracking-wide">Nom complet</label>
                            <input required type="text" className="w-full px-4 py-3 bg-[#F7F4EF] rounded-lg border border-transparent focus:border-[#C6A667] focus:bg-white outline-none transition-colors font-body" placeholder="Votre nom" />
                            </div>
                            <div className="space-y-2">
                            <label className="text-xs font-bold text-[#0A1A33] uppercase tracking-wide">Téléphone</label>
                            <input required type="tel" className="w-full px-4 py-3 bg-[#F7F4EF] rounded-lg border border-transparent focus:border-[#C6A667] focus:bg-white outline-none transition-colors font-body" placeholder="+212..." />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#0A1A33] uppercase tracking-wide">Type de bien</label>
                            <div className="grid grid-cols-3 gap-4">
                                <PropertyCard type="Appartement" Icon={Building} label="Appart" />
                                <PropertyCard type="Villa" Icon={Home} label="Villa" />
                                <PropertyCard type="Riad" Icon={Palmtree} label="Riad" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#0A1A33] uppercase tracking-wide">Localisation</label>
                            <input required type="text" className="w-full px-4 py-3 bg-[#F7F4EF] rounded-lg border border-transparent focus:border-[#C6A667] focus:bg-white outline-none transition-colors font-body" placeholder="Quartier à Casablanca" />
                        </div>

                        <button className="w-full bg-[#0A1A33] hover:bg-[#1a2f4d] text-white py-4 rounded-xl font-body font-bold uppercase tracking-widest text-sm transition-all flex justify-center items-center gap-2 mt-4">
                            Obtenir mon estimation
                            <ArrowRight size={18} />
                        </button>
                    </motion.form>
                    ) : (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col justify-center items-center text-center p-8"
                    >
                        <div className="w-20 h-20 bg-[#F7F4EF] rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 size={40} className="text-[#0A1A33]" />
                        </div>
                        <h4 className="font-heading text-3xl font-bold text-[#0A1A33] mb-4">Message reçu !</h4>
                        <p className="font-body text-gray-500 max-w-md mb-8">
                            Merci de votre confiance. Notre calendrier va s'ouvrir pour planifier votre appel découverte.
                        </p>
                        <button 
                            onClick={() => setShowCalendly(true)}
                            className="px-8 py-3 bg-[#C6A667] text-white rounded-full font-body font-bold uppercase tracking-widest text-xs hover:bg-[#b08d55] transition-colors"
                        >
                            Ouvrir le calendrier
                        </button>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>
            </div>
        </section>
    );
};

// --- PAGES ---

// Updated HomePage: Includes ALL sections
const HomePage = ({ setActivePage }) => {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <HeroSection setActivePage={setActivePage} />
      {/* On Home, we show the title in the section */}
      <FeaturesSection showTitle={true} />
      <PricingSection setActivePage={setActivePage} showTitle={true} />
      <ContactSection />
      {/* FAQ moved to bottom of Home Page */}
      <FAQSection />
    </motion.div>
  );
};

const FeaturesPage = () => {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <PageHeader title="L'Expérience HouseWise" subtitle="Notre Expertise" />
      {/* On Features Page, we hide the title because PageHeader already shows it */}
      <FeaturesSection showTitle={false} />
      <FAQSection />
    </motion.div>
  );
};

const PricingPage = ({ setActivePage }) => {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <PageHeader title="Nos Formules" subtitle="Transparence Totale" />
      <PricingSection setActivePage={setActivePage} showTitle={false} />
    </motion.div>
  );
};

const ContactPage = () => {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <PageHeader title="Contactez-nous" subtitle="Estimation Gratuite" />
      <ContactSection />
    </motion.div>
  );
};

// --- SHARED COMPONENTS ---

const CalendlyModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A1A33]/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="p-5 bg-[#0A1A33] flex justify-between items-center text-[#F7F4EF] shrink-0 border-b border-[#C6A667]/20">
               <div className="flex items-center gap-3">
                 <Calendar className="text-[#C6A667]" size={20} />
                 <span className="font-heading font-bold text-xl tracking-wide">Réserver un audit</span>
               </div>
               <button onClick={onClose} className="hover:text-[#C6A667] transition-colors p-1">
                 <X size={24} />
               </button>
            </div>
            <div className="flex-grow w-full h-full relative bg-[#F7F4EF]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                   <iframe 
                     src="https://calendly.com/d/cpj9-rmw-2x9/housewise-appel-decouverte?month=2024-05"
                     width="100%" 
                     height="100%" 
                     frameBorder="0"
                     title="Calendly Scheduling Page"
                     className="w-full h-full"
                   ></iframe>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Footer = ({ setActivePage }) => {
  return (
    <footer className="bg-[#0A1A33] text-white py-12 border-t border-[#C6A667]/20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <button onClick={() => setActivePage('home')} className="font-heading font-bold text-2xl tracking-wide hover:opacity-80 transition-opacity">
            HOUSE<span className="text-[#C6A667]">WISE</span>
          </button>
          <p className="text-gray-400 text-xs font-body uppercase tracking-wider mt-2">© 2024 HouseWise. Tous droits réservés.</p>
        </div>
        <div className="flex gap-8 text-gray-400 text-xs font-body uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage setActivePage={setActivePage} />;
      case 'features': return <FeaturesPage />;
      case 'pricing': return <PricingPage setActivePage={setActivePage} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="antialiased bg-white selection:bg-[#C6A667] selection:text-white min-h-screen flex flex-col">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
};

export default App;
