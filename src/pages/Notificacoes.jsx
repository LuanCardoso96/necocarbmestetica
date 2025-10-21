import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ADMIN_EMAIL = "luancr71996@gmail.com";

// Mock notifications
const mockNotificacoes = [
  {
    id: 1,
    cliente_nome: "João Silva",
    data_agendamento: new Date(Date.now() + 86400000).toISOString(),
    veiculo_modelo: "Honda Civic 2020",
    servicos: [{ nome: "Lavagem Completa" }, { nome: "Polimento" }],
    valor_total: 500,
    status: "pendente"
  }
];

export default function Notificacoes() {
  const [user] = React.useState({ email: "demo@example.com" });
  const [isAdmin] = React.useState(false);
  const [notificacoes] = React.useState(mockNotificacoes);

  const statusColors = {
    pendente: "bg-yellow-500",
    confirmado: "bg-blue-500",
    em_andamento: "bg-purple-500",
    concluido: "bg-green-500"
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
            <Bell className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-gold">Notificações</h1>
            <p className="text-xl text-gray-700">
              {notificacoes.length} {isAdmin ? 'pendentes' : 'atualizações'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {notificacoes.map(notificacao => (
            <Card key={notificacao.id} className="bg-white border-2 border-gray-200 hover:border-gold transition-all shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <CardTitle className="text-gold mb-2">
                        {isAdmin ? `Novo agendamento - ${notificacao.cliente_nome}` : 'Atualização no seu agendamento'}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {format(new Date(notificacao.data_agendamento), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <Badge className={statusColors[notificacao.status]}>
                    {notificacao.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Veículo</p>
                    <p className="text-black font-semibold">{notificacao.veiculo_modelo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Valor Total</p>
                    <p className="text-gold font-bold">R$ {notificacao.valor_total?.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Serviços:</p>
                  <ul className="space-y-1">
                    {notificacao.servicos?.map((s, i) => (
                      <li key={i} className="text-black text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        {s.nome}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}

          {notificacoes.length === 0 && (
            <Card className="bg-white border-2 border-gray-200 shadow-md">
              <CardContent className="py-16 text-center">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg">Nenhuma notificação no momento</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
