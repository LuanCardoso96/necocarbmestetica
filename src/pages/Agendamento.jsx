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
import { Calendar as CalendarIcon, Check, AlertCircle, Car, Clock, Sparkles, Star, Award } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

// Mock services - sincronizados com a página de Serviços
const mockServicos = [
  { id: 1, nome: "Polimento Comercial", descricao: "Polimento básico para revitalizar o brilho da pintura", preco_base: 500, ativo: true },
  { id: 2, nome: "Polimento Técnico", descricao: "Polimento profissional avançado com remoção de imperfeições", preco_base: 1200, ativo: true, destaque: true },
  { id: 3, nome: "Vitrificação", descricao: "Proteção cerâmica de alta performance para sua pintura", preco_base: 1200, ativo: true, destaque: true },
  { id: 4, nome: "Cristalização / Proteção", descricao: "Proteção de pintura com durabilidade de até 8 meses", preco_base: 250, ativo: true },
  { id: 5, nome: "Enceramento Profissional", descricao: "Aplicação profissional de cera premium", preco_base: 250, ativo: true },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            <span className="text-gold font-semibold text-sm tracking-wider uppercase">Agendamento Premium</span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Agende Seu Serviço
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Escolha os serviços, data e horário ideal para você em 3 passos simples
          </p>

          {/* Decorative Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8 max-w-md"
          />
        </motion.div>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert className="mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 backdrop-blur-xl shadow-2xl">
              <Check className="h-6 w-6 text-green-400" />
              <AlertDescription className="text-white font-semibold text-lg">
                ✨ Agendamento realizado com sucesso! Você receberá um email de confirmação.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert className="mb-8 bg-gradient-to-r from-red-500/20 to-rose-500/20 border-2 border-red-500 backdrop-blur-xl shadow-2xl">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <AlertDescription className="text-white font-semibold text-lg">
                {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* PASSO 1 - Serviços */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/95 to-blue-800/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
                <CardHeader className="border-b border-white/10 bg-gradient-to-r from-gold/10 to-yellow-500/10">
                  <CardTitle className="text-white text-2xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-yellow-600 flex items-center justify-center text-black font-bold shadow-lg">
                      1
                    </div>
                    Selecione os Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockServicos.map((servico, index) => (
                      <motion.div
                        key={servico.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => toggleServico(servico)}
                        className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedServicos.find(s => s.servico_id === servico.id)
                            ? 'border-gold bg-gradient-to-br from-gold/25 to-yellow-500/25 shadow-xl shadow-gold/20 scale-105'
                            : 'border-white/30 bg-slate-700/50 hover:border-gold/50 hover:bg-slate-700/70'
                        }`}
                      >
                        {servico.destaque && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gold to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                            <Star className="w-3 h-3 fill-black" />
                            TOP
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-white mb-2 text-lg">{servico.nome}</h3>
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2 leading-relaxed">{servico.descricao}</p>
                            {servico.preco_base && (
                              <Badge className="bg-gradient-to-r from-gold to-yellow-600 text-black font-bold text-sm px-3 py-1">
                                A partir de R$ {servico.preco_base.toFixed(2)}
                              </Badge>
                            )}
                          </div>
                          <Checkbox 
                            checked={!!selectedServicos.find(s => s.servico_id === servico.id)}
                            className="border-gold data-[state=checked]:bg-gold data-[state=checked]:text-black mt-1 w-6 h-6"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* PASSO 2 - Informações do Veículo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/95 to-blue-800/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
                <CardHeader className="border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-blue-500/10">
                  <CardTitle className="text-white text-2xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    Informações do Veículo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <Label htmlFor="modelo" className="text-white font-semibold text-base flex items-center gap-2">
                      <Car className="w-4 h-4 text-gold" />
                      Modelo do Veículo *
                    </Label>
                    <Input
                      id="modelo"
                      placeholder="Ex: Honda Civic 2020"
                      value={veiculoInfo.modelo}
                      onChange={(e) => setVeiculoInfo({...veiculoInfo, modelo: e.target.value})}
                      className="bg-slate-700/60 border-white/30 text-white placeholder:text-gray-400 mt-2 focus:border-gold h-12"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="placa" className="text-white font-semibold text-base">Placa</Label>
                      <Input
                        id="placa"
                        placeholder="ABC-1234"
                        value={veiculoInfo.placa}
                        onChange={(e) => setVeiculoInfo({...veiculoInfo, placa: e.target.value})}
                        className="bg-slate-700/60 border-white/30 text-white placeholder:text-gray-400 mt-2 focus:border-gold h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cor" className="text-white font-semibold text-base">Cor</Label>
                      <Input
                        id="cor"
                        placeholder="Preto"
                        value={veiculoInfo.cor}
                        onChange={(e) => setVeiculoInfo({...veiculoInfo, cor: e.target.value})}
                        className="bg-slate-700/60 border-white/30 text-white placeholder:text-gray-400 mt-2 focus:border-gold h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="obs" className="text-white font-semibold text-base">Observações</Label>
                    <Textarea
                      id="obs"
                      placeholder="Alguma observação especial sobre o veículo?"
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      className="bg-slate-700/60 border-white/30 text-white placeholder:text-gray-400 mt-2 focus:border-gold"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-8">
            {/* PASSO 3 - Data e Horário */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/95 to-blue-800/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
                <CardHeader className="border-b border-white/10 bg-gradient-to-r from-purple-600/10 to-purple-500/10">
                  <CardTitle className="text-white text-2xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    Data e Horário
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <Label className="text-white font-semibold text-base mb-3 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gold" />
                      Escolha a Data
                    </Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setSelectedHorario("");
                      }}
                      locale={ptBR}
                      disabled={(date) => date < new Date()}
                      className="rounded-xl border-2 border-white/30 bg-slate-700/60 text-white"
                    />
                  </div>

                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Label className="text-white font-semibold text-base mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold" />
                        Escolha o Horário
                      </Label>
                      <Select value={selectedHorario} onValueChange={setSelectedHorario}>
                        <SelectTrigger className="bg-slate-700/60 border-white/30 text-white font-medium h-12 focus:border-gold">
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          {horariosDisponiveis.map(horario => (
                            <SelectItem key={horario} value={horario} className="text-white hover:bg-slate-700">
                              {horario}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Resumo do Agendamento */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-gold/20 to-yellow-500/20 backdrop-blur-xl border-2 border-gold shadow-2xl sticky top-4">
                <CardHeader className="bg-gradient-to-r from-gold/30 to-yellow-500/30 border-b border-gold/30">
                  <CardTitle className="text-white flex items-center gap-3 text-2xl font-bold">
                    <Sparkles className="w-6 h-6 text-gold" />
                    Resumo do Agendamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div>
                    <p className="text-sm text-gray-200 mb-3 font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold" />
                      Serviços Selecionados:
                    </p>
                    {selectedServicos.length === 0 ? (
                      <p className="text-gray-400 italic text-sm bg-slate-800/50 p-3 rounded-lg border border-white/20">Nenhum serviço selecionado</p>
                    ) : (
                      <ul className="space-y-2">
                        {selectedServicos.map(s => (
                          <li key={s.servico_id} className="text-white text-base font-medium flex items-center gap-2 bg-slate-800/60 p-3 rounded-lg border border-white/20">
                            <Star className="w-4 h-4 text-gold flex-shrink-0" />
                            {s.nome}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {selectedDate && selectedHorario && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl border-2 border-blue-500/30"
                    >
                      <p className="text-sm text-gray-200 mb-2 font-semibold flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-blue-400" />
                        Data e Horário:
                      </p>
                      <p className="text-white font-bold text-lg">
                        {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                      <p className="text-gold font-bold text-2xl mt-1">{selectedHorario}</p>
                    </motion.div>
                  )}

                  {selectedServicos.length > 0 && (
                    <div className="pt-4 border-t-2 border-gold/30">
                      <div className="flex justify-between mb-3 text-lg">
                        <span className="text-gray-200 font-semibold">Subtotal:</span>
                        <span className="text-white font-bold">R$ {valorTotal.toFixed(2)}</span>
                      </div>
                      {descontoAplicado > 0 && (
                        <div className="flex justify-between mb-3 text-green-400">
                          <span className="font-semibold">Desconto ({descontoAplicado}%):</span>
                          <span className="font-bold">-R$ {(valorTotal - valorFinal).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-2xl font-bold pt-3 border-t-2 border-gold">
                        <span className="text-white">Total:</span>
                        <span className="text-gold">R$ {valorFinal.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedDate || !selectedHorario || selectedServicos.length === 0 || !veiculoInfo.modelo}
                    className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black hover:from-yellow-600 hover:to-gold font-bold text-lg py-7 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                  >
                    <Check className="w-6 h-6 mr-2" />
                    Confirmar Agendamento
                    <Sparkles className="w-6 h-6 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
