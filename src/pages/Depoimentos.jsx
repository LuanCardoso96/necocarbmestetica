import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, ChevronLeft, ChevronRight, User, Calendar, Award, TrendingUp } from 'lucide-react';

const depoimentos = [
  {
    id: 1,
    nome: 'Carlos Silva',
    foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    cargo: 'Empresário',
    data: '15 de março de 2024',
    rating: 5,
    titulo: 'Serviço Impecável!',
    texto: 'Meu carro ficou irreconhecível! A atenção aos detalhes é impressionante. A equipe da BM Estética é extremamente profissional e dedicada. Fiz vitrificação e polimento no meu Range Rover e o resultado superou todas as expectativas.',
    servico: 'Vitrificação Premium',
    destaque: true
  },
  {
    id: 2,
    nome: 'Marina Costa',
    foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina',
    cargo: 'Médica',
    data: '22 de fevereiro de 2024',
    rating: 5,
    titulo: 'Programa de Fidelidade Excelente',
    texto: 'Já sou cliente há 2 anos e o programa de fidelidade é incrível! Os pontos acumulados me deram descontos significativos. Além disso, a qualidade do serviço é sempre consistente. Meu BMW está sempre impecável.',
    servico: 'Cliente VIP',
    destaque: true
  },
  {
    id: 3,
    nome: 'Roberto Oliveira',
    foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    cargo: 'Advogado',
    data: '10 de janeiro de 2024',
    rating: 5,
    titulo: 'Confiança Total',
    texto: 'Confio de olhos fechados na BM Estética. Já trouxe 3 carros diferentes e todos ficaram perfeitos. A transparência no atendimento e o cuidado com cada detalhe fazem toda a diferença.',
    servico: 'Polimento Técnico',
    destaque: false
  },
  {
    id: 4,
    nome: 'Ana Paula',
    foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    cargo: 'Arquiteta',
    data: '5 de abril de 2024',
    rating: 5,
    titulo: 'Melhor da Região',
    texto: 'Pesquisei muito antes de escolher onde fazer o PPF do meu Porsche. A BM Estética foi a melhor escolha! Profissionais altamente capacitados e resultado impecável. Super recomendo!',
    servico: 'PPF Completo',
    destaque: true
  },
  {
    id: 5,
    nome: 'João Santos',
    foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    cargo: 'Engenheiro',
    data: '18 de março de 2024',
    rating: 5,
    titulo: 'Atendimento Nota 10',
    texto: 'Desde o primeiro contato até a entrega do veículo, tudo foi perfeito. A equipe é muito atenciosa e explica cada etapa do processo. Meu Audi ficou show de bola!',
    servico: 'Detalhamento Completo',
    destaque: false
  },
  {
    id: 6,
    nome: 'Fernanda Lima',
    foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda',
    cargo: 'Dentista',
    data: '28 de fevereiro de 2024',
    rating: 5,
    titulo: 'Vale Cada Centavo',
    texto: 'Fiz a vitrificação no meu Mercedes e está brilhando há meses! O investimento vale muito a pena. A proteção é real e a durabilidade surpreendente. Já indiquei para vários amigos!',
    servico: 'Vitrificação',
    destaque: false
  },
  {
    id: 7,
    nome: 'Ricardo Mendes',
    foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo',
    cargo: 'Colecionador',
    data: '12 de janeiro de 2024',
    rating: 5,
    titulo: 'Restauração Perfeita',
    texto: 'Restaurei meu Fusca 1969 clássico na BM Estética. O trabalho foi meticuloso e o resultado ficou além do esperado. Equipe muito competente e dedicada. Meu carro voltou a ser uma jóia!',
    servico: 'Restauração Completa',
    destaque: true
  }
];

const stats = [
  { label: 'Clientes Satisfeitos', value: '450+', icon: User },
  { label: 'Avaliação Média', value: '4.9★', icon: Star },
  { label: 'Taxa de Retorno', value: '95%', icon: TrendingUp },
  { label: 'Anos no Mercado', value: '15+', icon: Award }
];

export default function Depoimentos() {
  const [selectedDepoimento, setSelectedDepoimento] = useState(0);
  const [filtro, setFiltro] = useState('todos');

  const depoimentosFiltrados = filtro === 'todos' 
    ? depoimentos 
    : depoimentos.filter(d => d.destaque);

  const currentDepoimento = depoimentosFiltrados[selectedDepoimento];

  const nextDepoimento = () => {
    setSelectedDepoimento((prev) => 
      prev === depoimentosFiltrados.length - 1 ? 0 : prev + 1
    );
  };

  const prevDepoimento = () => {
    setSelectedDepoimento((prev) => 
      prev === 0 ? depoimentosFiltrados.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Depoimentos dos Clientes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre nossos serviços
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 hover:border-blue-500 transition-all">
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

        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            onClick={() => {
              setFiltro('todos');
              setSelectedDepoimento(0);
            }}
            className={filtro === 'todos' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }
          >
            Todos ({depoimentos.length})
          </Button>
          <Button
            onClick={() => {
              setFiltro('destaque');
              setSelectedDepoimento(0);
            }}
            className={filtro === 'destaque' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }
          >
            Destaques ({depoimentos.filter(d => d.destaque).length})
          </Button>
        </div>

        {/* Depoimento Principal */}
        <div className="mb-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDepoimento}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-300 shadow-2xl overflow-hidden">
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 opacity-10">
                    <Quote className="w-24 h-24 text-blue-600" />
                  </div>

                  <CardContent className="p-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Foto */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl">
                            <img 
                              src={currentDepoimento.foto} 
                              alt={currentDepoimento.nome}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {currentDepoimento.destaque && (
                            <div className="absolute -top-2 -right-2">
                              <Badge className="bg-blue-600 text-white">
                                ⭐ Destaque
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Rating */}
                        <div className="flex justify-center md:justify-start gap-1 mb-4">
                          {[...Array(currentDepoimento.rating)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Título */}
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                          {currentDepoimento.titulo}
                        </h3>

                        {/* Texto */}
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                          &ldquo;{currentDepoimento.texto}&rdquo;
                        </p>

                        {/* Info */}
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                          <div>
                            <p className="font-bold text-blue-600 text-lg">
                              {currentDepoimento.nome}
                            </p>
                            <p className="text-sm text-gray-600">
                              {currentDepoimento.cargo}
                            </p>
                          </div>
                          <div className="h-8 w-px bg-gray-300 hidden md:block" />
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {currentDepoimento.data}
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                            {currentDepoimento.servico}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navegação */}
          <button
            onClick={prevDepoimento}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg hover:scale-110 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextDepoimento}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg hover:scale-110 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {depoimentosFiltrados.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedDepoimento(index)}
                className={`h-2 rounded-full transition-all ${
                  selectedDepoimento === index 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2 bg-gray-300 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Todos os Depoimentos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {depoimentosFiltrados.map((depoimento, index) => (
            <motion.div
              key={depoimento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedDepoimento(index)}
              className="cursor-pointer"
            >
              <Card className={`hover:shadow-xl transition-all border-2 h-full ${
                selectedDepoimento === index 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={depoimento.foto} 
                      alt={depoimento.nome}
                      className="w-12 h-12 rounded-full border-2 border-blue-500"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{depoimento.nome}</p>
                      <p className="text-xs text-gray-600">{depoimento.cargo}</p>
                    </div>
                    {depoimento.destaque && (
                      <Badge className="bg-blue-600 text-xs">⭐</Badge>
                    )}
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(depoimento.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <h4 className="font-bold text-gray-900 mb-2">{depoimento.titulo}</h4>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                    {depoimento.texto}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{depoimento.data}</span>
                    <Badge variant="outline" className="text-xs">
                      {depoimento.servico}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quer fazer parte dessa história?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Venha experimentar nossos serviços e se torne nosso próximo cliente satisfeito
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            Agende Sua Visita
          </button>
        </motion.div>
      </div>
    </div>
  );
}

