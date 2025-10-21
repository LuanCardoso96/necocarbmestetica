import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Car, Shield, Palette } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'Range Rover Sport',
    category: 'Vitrificação Premium',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    description: 'Vitrificação completa com proteção cerâmica de 5 anos',
    tags: ['Vitrificação', 'Proteção', 'Premium']
  },
  {
    id: 2,
    title: 'BMW M3',
    category: 'Polimento Técnico',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    description: 'Restauração de pintura com polimento em 3 etapas',
    tags: ['Polimento', 'Restauração', 'Detalhamento']
  },
  {
    id: 3,
    title: 'Mercedes-Benz',
    category: 'Detalhamento Interno',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    description: 'Higienização profunda e tratamento de couro',
    tags: ['Interior', 'Higienização', 'Couro']
  },
  {
    id: 4,
    title: 'Porsche 911',
    category: 'PPF Completo',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    description: 'Película de proteção de pintura em todo o veículo',
    tags: ['PPF', 'Proteção', 'Premium']
  },
  {
    id: 5,
    title: 'Audi RS6',
    category: 'Envelopamento',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    description: 'Envelopamento completo em preto fosco',
    tags: ['Envelopamento', 'Personalização', 'Fosco']
  },
  {
    id: 6,
    title: 'Tesla Model S',
    category: 'Proteção Completa',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    description: 'Vitrificação + PPF + Tratamento interno',
    tags: ['Premium', 'Completo', 'Proteção']
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

  const filteredItems = selectedCategory === 'Todos'
    ? portfolioItems
    : portfolioItems.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Nosso Portfólio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça alguns dos nossos trabalhos e a excelência que entregamos em cada projeto
          </p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 text-white">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-blue-200 text-blue-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quer ver seu veículo aqui?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Transforme seu carro com nossos serviços premium
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
              Agende Agora
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

