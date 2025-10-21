import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Car, Shield, Palette, Play, Award, Star } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'Trabalho Premium 1',
    category: 'Vitrificação Premium',
    video: '/img/video1.mp4',
    type: 'video',
    description: 'Vitrificação completa com proteção cerâmica de longa duração',
    tags: ['Vitrificação', 'Proteção', 'Premium']
  },
  {
    id: 2,
    title: 'Trabalho Premium 2',
    category: 'Polimento Técnico',
    video: '/img/video2.mp4',
    type: 'video',
    description: 'Restauração de pintura com polimento profissional',
    tags: ['Polimento', 'Restauração', 'Detalhamento']
  },
  {
    id: 3,
    title: 'Trabalho Premium 3',
    category: 'Detalhamento Interno',
    video: '/img/video3.mp4',
    type: 'video',
    description: 'Higienização profunda e tratamento completo',
    tags: ['Interior', 'Higienização', 'Premium']
  },
  {
    id: 4,
    title: 'Trabalho Premium 4',
    category: 'PPF Completo',
    video: '/img/video4.mp4',
    type: 'video',
    description: 'Película de proteção de pintura premium',
    tags: ['PPF', 'Proteção', 'Premium']
  },
  {
    id: 5,
    title: 'Trabalho Premium 5',
    category: 'Envelopamento',
    video: '/img/video5.mp4',
    type: 'video',
    description: 'Envelopamento completo com acabamento perfeito',
    tags: ['Envelopamento', 'Personalização', 'Premium']
  },
  {
    id: 6,
    title: 'Trabalho Premium 6',
    category: 'Proteção Completa',
    video: '/img/video6.mp4',
    type: 'video',
    description: 'Serviço completo de estética automotiva',
    tags: ['Premium', 'Completo', 'Proteção']
  },
  {
    id: 7,
    title: 'Trabalho Premium 7',
    category: 'Vitrificação Premium',
    video: '/img/video7.mp4',
    type: 'video',
    description: 'Vitrificação de alto padrão com acabamento espelhado',
    tags: ['Vitrificação', 'Premium', 'Brilho']
  }
];

const categories = [
  { name: 'Todos', icon: Sparkles },
  { name: 'Vitrificação', icon: Shield },
  { name: 'Polimento', icon: Car },
  { name: 'Personalização', icon: Palette }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = React.useState('Todos');
  const videoRefs = React.useRef({});

  const filteredItems = selectedCategory === 'Todos'
    ? portfolioItems
    : portfolioItems.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-yellow-500/20 px-6 py-2 rounded-full border border-gold/30 mb-6"
          >
            <Award className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold text-sm tracking-wider uppercase">Excelência Comprovada</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Nosso Portfólio
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conheça alguns dos nossos trabalhos e a excelência que entregamos em cada projeto premium
          </p>
          
          {/* Decorative Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8 max-w-md"
          />
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-2xl shadow-blue-500/50 scale-105 border-2 border-blue-400'
                    : 'bg-white/10 backdrop-blur-md text-gray-200 hover:bg-white/20 border-2 border-white/20 hover:border-white/40'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl shadow-xl transition-all duration-500 border-2 border-white/10 hover:border-gold/50 bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-xl hover:scale-105 h-full flex flex-col">
                <div className="relative h-80 overflow-hidden bg-black">
                  {item.type === 'video' ? (
                    <video
                      ref={el => videoRefs.current[item.id] = el}
                      src={item.video}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                    >
                      <source src={item.video} type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Category Badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="absolute top-4 right-4"
                  >
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-4 py-1.5 text-sm shadow-lg">
                      {item.category}
                    </Badge>
                  </motion.div>
                  
                  {/* Video Badge */}
                  {item.type === 'video' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="absolute bottom-4 left-4"
                    >
                      <Badge className="bg-black/80 backdrop-blur-sm text-white flex items-center gap-2 px-3 py-1.5 border border-white/20">
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span className="text-sm font-medium">Auto Play</span>
                      </Badge>
                    </motion.div>
                  )}

                  {/* Premium Badge */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
                    className="absolute top-4 left-4"
                  >
                    <Badge className="bg-gradient-to-r from-gold to-yellow-600 text-black font-bold px-3 py-1.5 text-xs shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" />
                      Premium
                    </Badge>
                  </motion.div>
                </div>

                <CardContent className="p-6 flex-grow flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-base leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  
                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.6 + tagIndex * 0.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="text-xs border-blue-400/50 text-blue-300 bg-blue-950/50 hover:bg-blue-900/50 transition-colors px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="relative bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 rounded-3xl p-12 md:p-16 text-white overflow-hidden border-2 border-white/10 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/30 to-yellow-500/30 px-6 py-2 rounded-full border border-gold/50 mb-6"
              >
                <Award className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold text-sm tracking-wider uppercase">Exclusividade</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Quer ver seu veículo aqui?
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Transforme seu carro com nossos serviços premium de estética automotiva
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-gradient-to-r from-gold to-yellow-600 text-black px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-gold/50 hover:shadow-gold/70 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Agende Seu Serviço Premium
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-4xl font-bold text-gold mb-2">500+</div>
                  <div className="text-sm text-gray-400">Clientes Satisfeitos</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-4xl font-bold text-gold mb-2">1000+</div>
                  <div className="text-sm text-gray-400">Projetos Realizados</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-4xl font-bold text-gold mb-2">5★</div>
                  <div className="text-sm text-gray-400">Avaliação Média</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

