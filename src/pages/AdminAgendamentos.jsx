import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComp } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, CheckCircle2, Bell, Upload, Image as ImageIcon, X, Check, MessageCircle, Clock } from "lucide-react";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

// Mock data
const mockAgendamentos = [
  {
    id: 1,
    cliente_nome: "João Silva",
    cliente_email: "joao@example.com",
    data_agendamento: new Date(Date.now() + 86400000).toISOString(),
    veiculo_modelo: "Honda Civic 2020",
    veiculo_placa: "ABC-1234",
    servicos: [{ nome: "Lavagem Completa" }, { nome: "Polimento" }],
    valor_total: 500,
    desconto_aplicado: 10,
    status: "pendente",
    carro_pronto: false,
    fotos_antes: [],
    fotos_depois: []
  }
];

export default function AdminAgendamentos() {
  const [agendamentos, setAgendamentos] = React.useState(mockAgendamentos);
  const [selectedAgendamento, setSelectedAgendamento] = React.useState(null);
  const [showFotosDialog, setShowFotosDialog] = React.useState(false);
  const [showRemarcacaoDialog, setShowRemarcacaoDialog] = React.useState(false);
  const [uploadingFotos, setUploadingFotos] = React.useState({});
  const [notificationSuccess, setNotificationSuccess] = React.useState(false);
  const [remarcacao, setRemarcacao] = React.useState({
    novaData: null,
    novoHorario: "",
    motivo: ""
  });

  const updateStatus = (id, status) => {
    setAgendamentos(agendamentos.map(a => a.id === id ? { ...a, status } : a));
  };

  const notificarCarroPronto = (agendamento) => {
    console.log("Notificando carro pronto:", agendamento);
    setAgendamentos(agendamentos.map(a => 
      a.id === agendamento.id ? { ...a, carro_pronto: true } : a
    ));
    setNotificationSuccess(true);
    setTimeout(() => setNotificationSuccess(false), 3000);
  };

  const solicitarRemarcacao = () => {
    console.log("Solicitando remarcação:", remarcacao);
    setShowRemarcacaoDialog(false);
    setRemarcacao({ novaData: null, novoHorario: "", motivo: "" });
    alert("Solicitação de remarcação enviada ao cliente!");
  };

  const abrirWhatsApp = (telefone, nomeCliente) => {
    if (!telefone) {
      alert("Cliente não tem telefone cadastrado");
      return;
    }
    const numero = telefone.replace(/\D/g, '');
    const mensagem = encodeURIComponent(`Olá ${nomeCliente}, tudo bem? Aqui é da NecoCar!`);
    window.open(`https://wa.me/55${numero}?text=${mensagem}`, '_blank');
  };

  const horariosDisponiveis = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

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

  const tiposFoto = [
    { value: "frente", label: "Frente" },
    { value: "tras", label: "Traseira" },
    { value: "lateral_esquerda", label: "Lateral Esquerda" },
    { value: "lateral_direita", label: "Lateral Direita" },
    { value: "teto", label: "Teto" },
    { value: "interior", label: "Interior" }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gold">Gerenciar Agendamentos</h1>
          <p className="text-xl text-gray-700">Acompanhe e gerencie todos os agendamentos</p>
        </motion.div>

        {notificationSuccess && (
          <Alert className="mb-6 bg-green-50 border-2 border-green-500">
            <Check className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800 font-semibold">
              Notificação de carro pronto enviada com sucesso!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {agendamentos.map((agendamento, index) => (
            <motion.div
              key={agendamento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-all">
                <CardHeader className="bg-gradient-to-r from-gold/5 to-transparent">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <CardTitle className="text-gold mb-2 text-2xl">
                          {agendamento.cliente_nome}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">
                            {format(new Date(agendamento.data_agendamento), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        size="sm"
                        onClick={() => abrirWhatsApp("(11) 99999-9999", agendamento.cliente_nome)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      {agendamento.carro_pronto && (
                        <Badge className="bg-green-600 text-white font-bold">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Carro Pronto
                        </Badge>
                      )}
                      <Badge className={`${statusColors[agendamento.status]} font-bold text-sm px-3 py-1`}>
                        {statusLabels[agendamento.status]}
                      </Badge>
                      <Select
                        value={agendamento.status}
                        onValueChange={(status) => updateStatus(agendamento.id, status)}
                      >
                        <SelectTrigger className="w-40 bg-white border-gray-300 text-black font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="confirmado">Confirmado</SelectItem>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2 font-medium">Veículo</p>
                      <p className="text-black font-semibold text-lg">{agendamento.veiculo_modelo}</p>
                      <p className="text-sm text-gray-600">{agendamento.veiculo_placa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 font-medium">Serviços</p>
                      <ul className="space-y-1">
                        {agendamento.servicos?.map((s, i) => (
                          <li key={i} className="text-black text-sm font-medium">• {s.nome}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2 font-medium">Valor Total</p>
                      <p className="text-2xl font-bold text-gold">R$ {agendamento.valor_total?.toFixed(2)}</p>
                      {agendamento.desconto_aplicado > 0 && (
                        <p className="text-sm text-green-600 font-medium">Desconto: {agendamento.desconto_aplicado}%</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-gray-100">
                    <Button
                      onClick={() => {
                        setSelectedAgendamento(agendamento);
                        setShowFotosDialog(true);
                      }}
                      className="bg-gold text-black hover:bg-gold-dark font-semibold"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Gerenciar Fotos
                    </Button>

                    <Button
                      onClick={() => {
                        setSelectedAgendamento(agendamento);
                        setShowRemarcacaoDialog(true);
                      }}
                      className="bg-orange-600 text-white hover:bg-orange-700 font-semibold"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Solicitar Remarcação
                    </Button>
                    
                    <Button
                      onClick={() => notificarCarroPronto(agendamento)}
                      disabled={agendamento.carro_pronto || agendamento.status !== 'concluido'}
                      className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notificar Carro Pronto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Dialog de Remarcação */}
        <Dialog open={showRemarcacaoDialog} onOpenChange={setShowRemarcacaoDialog}>
          <DialogContent className="max-w-2xl bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gold">
                Solicitar Remarcação - {selectedAgendamento?.cliente_nome}
              </DialogTitle>
            </DialogHeader>
            
            {selectedAgendamento && (
              <div className="space-y-6">
                <div>
                  <Label className="text-black font-semibold mb-2 block">Data Atual</Label>
                  <p className="text-gray-700">
                    {format(new Date(selectedAgendamento.data_agendamento), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>

                <div>
                  <Label className="text-black font-semibold mb-2 block">Nova Data</Label>
                  <CalendarComp
                    mode="single"
                    selected={remarcacao.novaData}
                    onSelect={(date) => setRemarcacao({ ...remarcacao, novaData: date })}
                    locale={ptBR}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border-2 border-gray-200"
                  />
                </div>

                {remarcacao.novaData && (
                  <div>
                    <Label className="text-black font-semibold mb-2 block">Novo Horário</Label>
                    <Select value={remarcacao.novoHorario} onValueChange={(v) => setRemarcacao({ ...remarcacao, novoHorario: v })}>
                      <SelectTrigger className="bg-white border-gray-300 text-black">
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {horariosDisponiveis.map(h => (
                          <SelectItem key={h} value={h}>{h}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="text-black font-semibold mb-2 block">Motivo da Remarcação</Label>
                  <Textarea
                    value={remarcacao.motivo}
                    onChange={(e) => setRemarcacao({ ...remarcacao, motivo: e.target.value })}
                    placeholder="Explique o motivo da remarcação..."
                    className="bg-white border-gray-300 text-black"
                    rows={4}
                  />
                </div>

                <Button
                  onClick={solicitarRemarcacao}
                  disabled={!remarcacao.novaData || !remarcacao.novoHorario || !remarcacao.motivo}
                  className="w-full bg-gold text-black hover:bg-gold-dark font-bold text-lg py-6"
                >
                  Enviar Solicitação de Remarcação
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Fotos */}
        <Dialog open={showFotosDialog} onOpenChange={setShowFotosDialog}>
          <DialogContent className="max-w-5xl bg-white text-black max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gold">
                Gerenciar Fotos - {selectedAgendamento?.veiculo_modelo}
              </DialogTitle>
            </DialogHeader>
            
            {selectedAgendamento && (
              <div className="space-y-8">
                {/* Fotos ANTES */}
                <div>
                  <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-gold" />
                    Fotos ANTES do Serviço
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tiposFoto.map(tipo => (
                      <div key={tipo.value} className="space-y-2">
                        <Label className="text-gray-700 font-semibold">{tipo.label}</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gold transition-colors">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => console.log("File selected:", e.target.files[0])}
                            className="hidden"
                            id={`antes-${tipo.value}`}
                          />
                          <label htmlFor={`antes-${tipo.value}`} className="cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Adicionar foto</p>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fotos DEPOIS */}
                <div className="pt-6 border-t-2 border-gray-200">
                  <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Fotos DEPOIS do Serviço
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tiposFoto.map(tipo => (
                      <div key={tipo.value} className="space-y-2">
                        <Label className="text-gray-700 font-semibold">{tipo.label}</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => console.log("File selected:", e.target.files[0])}
                            className="hidden"
                            id={`depois-${tipo.value}`}
                          />
                          <label htmlFor={`depois-${tipo.value}`} className="cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Adicionar foto</p>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
