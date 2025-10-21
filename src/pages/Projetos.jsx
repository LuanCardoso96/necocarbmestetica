import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, Star } from 'lucide-react';

const projetos = [
  {
    id: 1,
    titulo: 'Restauração Completa - Fusca 1969',
    cliente: 'João Silva',
    data: '2024-01',
    duracao: '3 meses',
    status: 'Concluído',
    descricao: 'Restauração completa incluindo funilaria, pintura, motor e interior. Veículo retornou às condições de fábrica.',
    servicos: ['Funilaria', 'Pintura', 'Motor', 'Estofamento', 'Elétrica'],
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
  },
  {
    id: 2,
    titulo: 'Vitrificação Premium - Frota Empresarial',
    cliente: 'Empresa XYZ Ltda',
    data: '2024-02',
    duracao: '2 semanas',
    status: 'Concluído',
    descricao: 'Vitrificação de 15 veículos da frota empresarial com garantia estendida de 5 anos.',
    servicos: ['Vitrificação', 'Polimento', 'Higienização'],
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'
  },
  {
    id: 3,
    titulo: 'Customização Esportiva - Civic Type R',
    cliente: 'Maria Costa',
    data: '2024-03',
    duracao: '1 mês',
    status: 'Concluído',
    descricao: 'Envelopamento fosco, insulfilm, PPF e detalhamento completo para look racing.',
    servicos: ['Envelopamento', 'PPF', 'Insulfilm', 'Detalhamento'],
    destaque: false,
    imagem: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
  },
  {
    id: 4,
    titulo: 'Proteção Total - SUV Premium',
    cliente: 'Carlos Mendes',
    data: '2024-03',
    duracao: '10 dias',
    status: 'Em andamento',
    descricao: 'Pacote completo de proteção incluindo PPF full body, vitrificação e tratamento interno.',
    servicos: ['PPF', 'Vitrificação', 'Tratamento Couro', 'Higienização'],
    destaque: false,
    imagem: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
  }
];

const stats = [
  { label: 'Projetos Concluídos', value: '450+', icon: CheckCircle },
  { label: 'Clientes Satisfeitos', value: '98%', icon: Star },
  { label: 'Anos de Experiência', value: '15+', icon: Calendar },
  { label: 'Horas de Trabalho', value: '12k+', icon: Clock }
];

export default function Projetos() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Nossos Projetos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acompanhe os projetos especiais que transformam sonhos automotivos em realidade
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center border-2 border-blue-100 hover:border-blue-500 transition-colors">
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Projetos em Destaque */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Projetos em Destaque
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projetos.filter(p => p.destaque).map((projeto, index) => (
              <motion.div
                key={projeto.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-blue-500">
                  <div className="relative h-64">
                    <img
                      src={projeto.imagem}
                      alt={projeto.titulo}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 text-white">Destaque</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-blue-600">{projeto.titulo}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {projeto.data}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {projeto.duracao}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{projeto.descricao}</p>
                    <div className="flex flex-wrap gap-2">
                      {projeto.servicos.map((servico) => (
                        <Badge key={servico} variant="outline" className="border-blue-200 text-blue-700">
                          {servico}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Outros Projetos */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Projetos Recentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projetos.filter(p => !p.destaque).map((projeto, index) => (
              <motion.div
                key={projeto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={projeto.imagem}
                        alt={projeto.titulo}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{projeto.titulo}</CardTitle>
                          <Badge className={
                            projeto.status === 'Concluído'
                              ? 'bg-green-600'
                              : 'bg-yellow-600'
                          }>
                            {projeto.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Cliente: {projeto.cliente}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-3">{projeto.descricao}</p>
                        <div className="flex flex-wrap gap-2">
                          {projeto.servicos.map((servico) => (
                            <Badge key={servico} variant="outline" className="text-xs">
                              {servico}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tem um projeto em mente?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Nossa equipe está pronta para transformar sua visão em realidade
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
            Fale Conosco
          </button>
        </motion.div>
      </div>
    </div>
  );
}

