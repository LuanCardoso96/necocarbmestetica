import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, Shield, Star, Award, Clock, Info, CheckCircle2, Calendar
} from "lucide-react";

// Serviços atualizados
const mockServicos = [
  { 
    id: 1, 
    nome: "Polimento Comercial", 
    categoria: "estetica", 
    descricao: "Polimento básico para revitalizar o brilho da pintura do seu veículo", 
    preco_base: 500, 
    duracao_estimada: 4, 
    ativo: true,
    destaque: false
  },
  { 
    id: 2, 
    nome: "Polimento Técnico", 
    categoria: "estetica", 
    descricao: "Polimento profissional avançado com remoção de imperfeições e acabamento premium", 
    preco_base: 1200, 
    duracao_estimada: 8, 
    ativo: true,
    destaque: true
  },
  { 
    id: 3, 
    nome: "Vitrificação", 
    categoria: "protecao", 
    descricao: "Proteção cerâmica de alta performance para sua pintura com durabilidade superior", 
    preco_base: 1200, 
    duracao_estimada: 6, 
    ativo: true,
    destaque: true
  },
  { 
    id: 4, 
    nome: "Cristalização / Proteção", 
    categoria: "protecao", 
    descricao: "Proteção de pintura com durabilidade de até 8 meses. Modelos disponíveis de 1 a 3 anos", 
    preco_base: 250, 
    duracao_estimada: 3, 
    ativo: true,
    destaque: false,
    detalhes: "Duração de até 8 meses. Temos modelos de proteção de 1 ano até 3 anos."
  },
  { 
    id: 5, 
    nome: "Enceramento Profissional", 
    categoria: "estetica", 
    descricao: "Aplicação profissional de cera premium para brilho intenso e proteção", 
    preco_base: 250, 
    duracao_estimada: 2, 
    ativo: true,
    destaque: false
  }
];

export default function Servicos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gold/8 to-yellow-500/8 rounded-full blur-3xl"></div>
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
            <span className="text-gold font-semibold text-sm tracking-wider uppercase">Excelência em Estética Automotiva</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Nossos Serviços
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Serviços premium de estética automotiva com tecnologia de ponta
          </p>
          
          {/* Decorative Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8 max-w-md"
          />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mockServicos.map((servico, index) => (
            <motion.div
              key={servico.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
            >
              <Card className={`group overflow-hidden hover:shadow-2xl shadow-xl transition-all duration-500 border-2 bg-gradient-to-br from-slate-800/95 to-blue-800/95 backdrop-blur-xl hover:scale-105 h-full flex flex-col relative ${
                servico.destaque 
                  ? 'border-gold shadow-gold/20' 
                  : 'border-white/20 hover:border-blue-400/50'
              }`}>
                {/* Premium Badge */}
                {servico.destaque && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-gold to-yellow-600 text-black px-4 py-1.5 rounded-bl-xl rounded-tr-xl font-bold text-xs flex items-center gap-1 shadow-lg z-10">
                    <Star className="w-3.5 h-3.5 fill-black" />
                    DESTAQUE
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-gold transition-colors duration-300 pr-20">
                    {servico.nome}
                  </CardTitle>
                  
                  {/* Price Badge */}
                  <div className="flex items-center gap-3 mt-4">
                    <Badge className="bg-gradient-to-r from-gold to-yellow-600 text-black font-bold text-base px-4 py-1.5">
                      A partir de R$ {servico.preco_base.toFixed(2)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-300 text-base leading-relaxed mb-4 flex-grow">
                    {servico.descricao}
                  </p>

                  {/* Additional Details */}
                  {servico.detalhes && (
                    <div className="bg-blue-900/50 border border-blue-400/40 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-100 leading-relaxed">
                          {servico.detalhes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Clock className="w-4 h-4 text-gold" />
                    <span className="font-medium">Duração estimada: {servico.duracao_estimada}h</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

                  {/* Action Button */}
                  <Button
                    onClick={() => navigate('/Agendamento')}
                    className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black hover:from-yellow-600 hover:to-gold font-bold py-6 text-base shadow-lg hover:shadow-gold/50 transition-all group-hover:scale-105"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Agora
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/80 to-slate-800/80 backdrop-blur-xl border-2 border-blue-400/40 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="bg-gold/20 p-3 rounded-full border-2 border-gold/40">
              <Info className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                Informações Importantes
              </h3>
              <div className="space-y-2 text-gray-300 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span>Modelos de proteção disponíveis de <strong className="text-white">1 ano até 3 anos</strong>. Consulte nossos profissionais para mais detalhes.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span><strong className="text-white">Observação:</strong> Todas as proteções dependem dos cuidados e manutenção que você tem com o veículo.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span>Tire suas dúvidas diretamente com nosso profissional durante a aplicação.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-gold/20 via-yellow-500/20 to-gold/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-gold/30 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Pronto para transformar seu veículo?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Agende agora e garanta um atendimento premium para seu carro
            </p>
            <Button
              onClick={() => navigate('/Agendamento')}
              className="bg-gradient-to-r from-gold to-yellow-600 text-black hover:from-yellow-600 hover:to-gold font-bold text-lg px-12 py-7 rounded-full shadow-2xl shadow-gold/50 hover:shadow-gold/70 transition-all hover:scale-105"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Agendar Meu Serviço
              <Sparkles className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
