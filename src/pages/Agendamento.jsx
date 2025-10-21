import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Check, AlertCircle, Car, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

// Mock services
const mockServicos = [
  { id: 1, nome: "Lavagem Completa", descricao: "Lavagem completa interna e externa", preco_base: 150, ativo: true },
  { id: 2, nome: "Polimento", descricao: "Polimento profissional da pintura", preco_base: 350, ativo: true },
  { id: 3, nome: "Vitrificação", descricao: "Proteção cerâmica da pintura", preco_base: 800, ativo: true },
];

export default function Agendamento() {
  const [user] = React.useState({ full_name: "Usuário Demo", email: "demo@example.com" });
  const [cliente] = React.useState({ desconto_disponivel: 10 });
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedHorario, setSelectedHorario] = React.useState("");
  const [selectedServicos, setSelectedServicos] = React.useState([]);
  const [veiculoInfo, setVeiculoInfo] = React.useState({
    modelo: "",
    placa: "",
    cor: ""
  });
  const [observacoes, setObservacoes] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const horariosDisponiveis = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const toggleServico = (servico) => {
    setSelectedServicos(prev => {
      const exists = prev.find(s => s.servico_id === servico.id);
      if (exists) {
        return prev.filter(s => s.servico_id !== servico.id);
      } else {
        return [...prev, {
          servico_id: servico.id,
          nome: servico.nome,
          preco: servico.preco_base || 0
        }];
      }
    });
  };

  const valorTotal = selectedServicos.reduce((sum, s) => sum + s.preco, 0);
  const descontoAplicado = cliente?.desconto_disponivel || 0;
  const valorFinal = valorTotal * (1 - descontoAplicado / 100);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedHorario || selectedServicos.length === 0 || !veiculoInfo.modelo) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    // Simulate API call
    console.log("Agendamento criado:", {
      cliente_email: user.email,
      cliente_nome: user.full_name,
      servicos: selectedServicos,
      veiculo_modelo: veiculoInfo.modelo,
      data: selectedDate,
      horario: selectedHorario,
      valor_final: valorFinal
    });

    setSuccess(true);
    setError("");
    setSelectedServicos([]);
    setSelectedDate(null);
    setSelectedHorario("");
    setVeiculoInfo({ modelo: "", placa: "", cor: "" });
    setObservacoes("");
    
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gold">Agendar Serviço</h1>
          <p className="text-xl text-gray-700">
            Escolha os serviços, data e horário ideal para você
          </p>
        </motion.div>

        {success && (
          <Alert className="mb-6 bg-green-50 border-2 border-green-500">
            <Check className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800 font-semibold text-base">
              Agendamento realizado com sucesso! Você receberá um email de confirmação.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 bg-red-50 border-2 border-red-500">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 font-semibold text-base">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-2 border-gray-200 shadow-md">
              <CardHeader className="bg-gold/5">
                <CardTitle className="text-gold text-xl font-bold">1. Selecione os Serviços</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {mockServicos.map(servico => (
                    <div
                      key={servico.id}
                      onClick={() => toggleServico(servico)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedServicos.find(s => s.servico_id === servico.id)
                          ? 'border-gold bg-gold/10 shadow-md'
                          : 'border-gray-300 hover:border-gold/50 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-black mb-1 text-base">{servico.nome}</h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{servico.descricao}</p>
                          {servico.preco_base && (
                            <Badge className="bg-gold text-black font-bold">
                              R$ {servico.preco_base.toFixed(2)}
                            </Badge>
                          )}
                        </div>
                        <Checkbox 
                          checked={!!selectedServicos.find(s => s.servico_id === servico.id)}
                          className="border-gold data-[state=checked]:bg-gold data-[state=checked]:text-black mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-200 shadow-md">
              <CardHeader className="bg-gold/5">
                <CardTitle className="text-gold text-xl font-bold">2. Informações do Veículo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label htmlFor="modelo" className="text-black font-semibold text-base">Modelo *</Label>
                  <Input
                    id="modelo"
                    placeholder="Ex: Honda Civic 2020"
                    value={veiculoInfo.modelo}
                    onChange={(e) => setVeiculoInfo({...veiculoInfo, modelo: e.target.value})}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-400 mt-2"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="placa" className="text-black font-semibold text-base">Placa</Label>
                    <Input
                      id="placa"
                      placeholder="ABC-1234"
                      value={veiculoInfo.placa}
                      onChange={(e) => setVeiculoInfo({...veiculoInfo, placa: e.target.value})}
                      className="bg-white border-gray-300 text-black placeholder:text-gray-400 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cor" className="text-black font-semibold text-base">Cor</Label>
                    <Input
                      id="cor"
                      placeholder="Preto"
                      value={veiculoInfo.cor}
                      onChange={(e) => setVeiculoInfo({...veiculoInfo, cor: e.target.value})}
                      className="bg-white border-gray-300 text-black placeholder:text-gray-400 mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="obs" className="text-black font-semibold text-base">Observações</Label>
                  <Textarea
                    id="obs"
                    placeholder="Alguma observação especial?"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-400 mt-2"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-2 border-gray-200 shadow-md">
              <CardHeader className="bg-gold/5">
                <CardTitle className="text-gold text-xl font-bold">3. Data e Horário</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label className="text-black font-semibold text-base mb-2 block">Escolha a Data</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedHorario("");
                    }}
                    locale={ptBR}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border-2 border-gray-200 bg-white"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-black font-semibold text-base mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Escolha o Horário
                    </Label>
                    <Select value={selectedHorario} onValueChange={setSelectedHorario}>
                      <SelectTrigger className="bg-white border-gray-300 text-black font-medium">
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {horariosDisponiveis.map(horario => (
                          <SelectItem key={horario} value={horario} className="text-black">
                            {horario}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gold shadow-lg sticky top-4">
              <CardHeader className="bg-gold/10">
                <CardTitle className="text-gold flex items-center gap-2 text-xl font-bold">
                  <Car className="w-5 h-5" />
                  Resumo do Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Serviços Selecionados:</p>
                  {selectedServicos.length === 0 ? (
                    <p className="text-gray-400 italic text-sm">Nenhum serviço selecionado</p>
                  ) : (
                    <ul className="space-y-1">
                      {selectedServicos.map(s => (
                        <li key={s.servico_id} className="text-black text-sm font-medium">
                          • {s.nome}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {selectedDate && selectedHorario && (
                  <div className="bg-gold/10 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Data e Horário:</p>
                    <p className="text-black font-bold">
                      {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                    <p className="text-gold font-bold text-lg">{selectedHorario}</p>
                  </div>
                )}

                {selectedServicos.length > 0 && (
                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-semibold">Subtotal:</span>
                      <span className="text-black font-bold">R$ {valorTotal.toFixed(2)}</span>
                    </div>
                    {descontoAplicado > 0 && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span className="font-semibold">Desconto ({descontoAplicado}%):</span>
                        <span className="font-bold">-R$ {(valorTotal - valorFinal).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200">
                      <span className="text-gold">Total:</span>
                      <span className="text-gold">R$ {valorFinal.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedDate || !selectedHorario || selectedServicos.length === 0 || !veiculoInfo.modelo}
                  className="w-full bg-gold text-black hover:bg-yellow-600 font-bold text-lg py-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar Agendamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
