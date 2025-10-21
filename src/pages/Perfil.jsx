import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User, Award, Calendar, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

import PerfilInfo from "../components/perfil/PerfilInfo";
import CodigoIndicacao from "../components/perfil/CodigoIndicacao";

// Mock data
const mockUser = {
  full_name: "Usuário Demo",
  email: "demo@example.com"
};

const mockCliente = {
  telefone: "(11) 99999-9999",
  endereco: "Rua Exemplo, 123",
  cidade: "São Paulo",
  estado: "SP",
  pontos_fidelidade: 150,
  codigo_indicacao: "DEMO123",
  desconto_disponivel: 10,
  lgpd_consentimento: true
};

const mockHistorico = [
  {
    id: 1,
    data_conclusao: new Date().toISOString(),
    servicos_realizados: ["Lavagem Completa", "Polimento"],
    valor_pago: 500,
    pontos_ganhos: 50,
    fotos_antes: [],
    fotos_depois: []
  }
];

const mockAgendamentos = [
  {
    id: 1,
    data_agendamento: new Date(Date.now() + 86400000).toISOString(),
    veiculo_modelo: "Honda Civic 2020",
    servicos: [{ nome: "Lavagem Completa" }, { nome: "Polimento" }],
    valor_total: 500,
    status: "pendente"
  }
];

export default function Perfil() {
  const [user] = React.useState(mockUser);
  const [cliente] = React.useState(mockCliente);
  const [historico] = React.useState(mockHistorico);
  const [agendamentos] = React.useState(mockAgendamentos);
  const [expandedImage, setExpandedImage] = React.useState(null);

  const statusColors = {
    pendente: "bg-yellow-500 text-black",
    confirmado: "bg-blue-500 text-white",
    em_andamento: "bg-purple-500 text-white",
    concluido: "bg-green-500 text-white",
    cancelado: "bg-red-500 text-white"
  };

  const statusLabels = {
    pendente: "Pendente",
    confirmado: "Confirmado",
    em_andamento: "Em Andamento",
    concluido: "Concluído",
    cancelado: "Cancelado"
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gold">Meu Perfil</h1>
          <p className="text-xl text-gray-700">
            Acompanhe seu histórico e recompensas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <PerfilInfo user={user} cliente={cliente} />
          
          <Card className="bg-white border-2 border-gold shadow-lg">
            <CardHeader>
              <CardTitle className="text-gold flex items-center gap-2 font-bold">
                <Award className="w-5 h-5" />
                Pontos de Fidelidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-6xl font-bold text-gold mb-2">
                  {cliente?.pontos_fidelidade || 0}
                </p>
                <p className="text-gray-700 font-semibold">pontos acumulados</p>
              </div>
            </CardContent>
          </Card>

          <CodigoIndicacao cliente={cliente} />
        </div>

        <Tabs defaultValue="historico" className="space-y-6">
          <TabsList className="bg-gray-100 border-2 border-gray-200">
            <TabsTrigger 
              value="historico" 
              className="data-[state=active]:bg-gold data-[state=active]:text-black text-gray-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger 
              value="agendamentos" 
              className="data-[state=active]:bg-gold data-[state=active]:text-black text-gray-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="historico">
            <div className="grid md:grid-cols-2 gap-6">
              {historico.map((item) => (
                <Card key={item.id} className="bg-white border-2 border-gray-200 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-gold">
                        {format(new Date(item.data_conclusao), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </CardTitle>
                      <Badge className="bg-green-600 text-white font-bold">
                        +{item.pontos_ganhos || 0} pts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2 font-medium">Serviços:</p>
                      <ul className="space-y-1">
                        {item.servicos_realizados?.map((s, i) => (
                          <li key={i} className="text-black text-sm font-medium">• {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Valor: </p>
                      <p className="text-black font-bold text-lg">R$ {item.valor_pago?.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {historico.length === 0 && (
                <Card className="bg-white border-2 border-gray-200 col-span-2 shadow-md">
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Nenhum serviço realizado ainda</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="agendamentos">
            <div className="grid md:grid-cols-2 gap-6">
              {agendamentos.map((agendamento) => (
                <Card key={agendamento.id} className="bg-white border-2 border-gray-200 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-gold">
                        {format(new Date(agendamento.data_agendamento), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </CardTitle>
                      <Badge className={`${statusColors[agendamento.status]} font-bold`}>
                        {statusLabels[agendamento.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Veículo:</p>
                      <p className="text-black font-semibold">{agendamento.veiculo_modelo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">Serviços:</p>
                      <ul className="space-y-1">
                        {agendamento.servicos?.map((s, i) => (
                          <li key={i} className="text-black text-sm font-medium">• {s.nome}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t-2 border-gray-200">
                      <p className="text-gold font-bold text-lg">
                        Total: R$ {agendamento.valor_total?.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {agendamentos.length === 0 && (
                <Card className="bg-white border-2 border-gray-200 col-span-2 shadow-md">
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Nenhum agendamento encontrado</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={!!expandedImage} onOpenChange={() => setExpandedImage(null)}>
          <DialogContent className="max-w-4xl bg-white border-2 border-gold">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpandedImage(null)}
              className="absolute top-2 right-2 text-gold hover:text-gold-dark z-50"
            >
              <X className="w-6 h-6" />
            </Button>
            {expandedImage && (
              <img 
                src={expandedImage} 
                alt="Ampliada" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
