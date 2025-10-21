import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Wrench, Sparkles, Shield, Droplet, Eye, 
  Zap, Wind, Palette, Star 
} from "lucide-react";

const categoryIcons = {
  acessorios: Wrench,
  restauracao: Star,
  funilaria_pintura: Palette,
  personalizacao: Zap,
  protecao: Shield,
  estetica: Sparkles,
  detalhamento: Eye
};

const categoryNames = {
  acessorios: "Acessórios",
  restauracao: "Restauração",
  funilaria_pintura: "Funilaria e Pintura",
  personalizacao: "Personalização",
  protecao: "Proteção",
  estetica: "Estética",
  detalhamento: "Detalhamento"
};

// Mock services data
const mockServicos = [
  { id: 1, nome: "Lavagem Completa", categoria: "estetica", descricao: "Lavagem completa interna e externa", preco_base: 150, duracao_estimada: 2, ativo: true },
  { id: 2, nome: "Polimento", categoria: "estetica", descricao: "Polimento profissional da pintura", preco_base: 350, duracao_estimada: 4, ativo: true },
  { id: 3, nome: "Vitrificação", categoria: "protecao", descricao: "Proteção cerâmica da pintura", preco_base: 800, duracao_estimada: 6, ativo: true },
  { id: 4, nome: "Higienização Interna", categoria: "detalhamento", descricao: "Limpeza profunda do interior", preco_base: 200, duracao_estimada: 3, ativo: true },
  { id: 5, nome: "Envelopamento", categoria: "personalizacao", descricao: "Envelopamento completo do veículo", preco_base: 3000, duracao_estimada: 24, ativo: true },
  { id: 6, nome: "PPF - Película Protetora", categoria: "protecao", descricao: "Película de proteção de pintura", preco_base: 5000, duracao_estimada: 12, ativo: true }
];

export default function Servicos() {
  const servicosPorCategoria = mockServicos.reduce((acc, servico) => {
    if (!acc[servico.categoria]) acc[servico.categoria] = [];
    acc[servico.categoria].push(servico);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gold via-yellow-500 to-gold bg-clip-text text-transparent">
            Nossos Serviços
          </h1>
          <p className="text-xl text-gray-700">
            Serviços premium de estética automotiva
          </p>
        </motion.div>

        <div className="space-y-16">
          {Object.entries(servicosPorCategoria).map(([categoria, items]) => {
            const Icon = categoryIcons[categoria] || Wrench;
            return (
              <motion.div
                key={categoria}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-gold/50">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-3xl font-bold text-gold">
                    {categoryNames[categoria]}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((servico, index) => (
                    <motion.div
                      key={servico.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white border-2 border-gray-200 hover:border-gold transition-all hover:scale-105 group h-full shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-lg">
                            <span className="text-black font-bold">{servico.nome}</span>
                            {servico.preco_base && (
                              <Badge className="bg-gold text-black font-bold text-sm">
                                R$ {servico.preco_base.toFixed(2)}
                              </Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-4 text-base leading-relaxed">
                            {servico.descricao || "Serviço de alta qualidade com acabamento profissional"}
                          </p>
                          {servico.duracao_estimada && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Sparkles className="w-4 h-4 text-gold" />
                              <span className="font-medium">Duração: {servico.duracao_estimada}h</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
