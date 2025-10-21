import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Mock data
const mockAgendamentos = [
  {
    id: 1,
    cliente_nome: "João Silva",
    veiculo_modelo: "Honda Civic",
    valor_total: 500,
    data_agendamento: new Date().toISOString()
  }
];

const mockClientes = [
  {
    id: 1,
    created_by: "joao@example.com",
    telefone: "(11) 99999-9999",
    pontos_fidelidade: 150
  }
];

const mockHistorico = [];

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total de Clientes",
      value: mockClientes.length,
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Agendamentos Hoje",
      value: mockAgendamentos.length,
      icon: Calendar,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Receita Mensal",
      value: "R$ 0.00",
      icon: DollarSign,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Serviços Concluídos",
      value: mockHistorico.length,
      icon: TrendingUp,
      color: "from-gold to-gold-dark"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gold">Dashboard Administrativo</h1>
          <p className="text-xl text-gray-700">Visão geral do negócio</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-gray-200 hover:border-gold transition-all shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white border-2 border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-gold">Agendamentos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAgendamentos.map(agendamento => (
                  <div key={agendamento.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-semibold text-black">{agendamento.cliente_nome}</p>
                      <p className="text-sm text-gray-600">{agendamento.veiculo_modelo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-semibold">R$ {agendamento.valor_total?.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{new Date(agendamento.data_agendamento).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-gold">Novos Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockClientes.map(cliente => (
                  <div key={cliente.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-semibold text-black">{cliente.created_by}</p>
                      <p className="text-sm text-gray-600">{cliente.telefone || 'Sem telefone'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-semibold">{cliente.pontos_fidelidade || 0} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
