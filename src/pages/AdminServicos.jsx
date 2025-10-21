import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock services
const mockServicos = [
  { id: 1, nome: "Lavagem Completa", categoria: "estetica", descricao: "Lavagem completa interna e externa", preco_base: 150, duracao_estimada: 2, ativo: true },
  { id: 2, nome: "Polimento", categoria: "estetica", descricao: "Polimento profissional da pintura", preco_base: 350, duracao_estimada: 4, ativo: true },
  { id: 3, nome: "Vitrificação", categoria: "protecao", descricao: "Proteção cerâmica da pintura", preco_base: 800, duracao_estimada: 6, ativo: true },
];

export default function AdminServicos() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingServico, setEditingServico] = React.useState(null);
  const [servicos, setServicos] = React.useState(mockServicos);
  const [formData, setFormData] = React.useState({
    nome: "",
    categoria: "estetica",
    descricao: "",
    preco_base: 0,
    duracao_estimada: 1,
    ativo: true
  });

  const resetForm = () => {
    setFormData({
      nome: "",
      categoria: "estetica",
      descricao: "",
      preco_base: 0,
      duracao_estimada: 1,
      ativo: true
    });
    setEditingServico(null);
  };

  const handleEdit = (servico) => {
    setEditingServico(servico);
    setFormData(servico);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingServico) {
      setServicos(servicos.map(s => s.id === editingServico.id ? { ...formData, id: editingServico.id } : s));
    } else {
      setServicos([...servicos, { ...formData, id: Date.now() }]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Deseja realmente excluir este serviço?")) {
      setServicos(servicos.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-gold">Gerenciar Serviços</h1>
            <p className="text-xl text-gray-700">Configure os serviços oferecidos</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-gold text-black hover:bg-yellow-600">
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-2 border-gray-200 text-black max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-gold">
                  {editingServico ? 'Editar Serviço' : 'Novo Serviço'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">Nome do Serviço</Label>
                  <Input
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="bg-white border-gray-300 text-black"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Categoria</Label>
                  <Select value={formData.categoria} onValueChange={(v) => setFormData({...formData, categoria: v})}>
                    <SelectTrigger className="bg-white border-gray-300 text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acessorios">Acessórios</SelectItem>
                      <SelectItem value="restauracao">Restauração</SelectItem>
                      <SelectItem value="funilaria_pintura">Funilaria e Pintura</SelectItem>
                      <SelectItem value="personalizacao">Personalização</SelectItem>
                      <SelectItem value="protecao">Proteção</SelectItem>
                      <SelectItem value="estetica">Estética</SelectItem>
                      <SelectItem value="detalhamento">Detalhamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-700">Descrição</Label>
                  <Textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    className="bg-white border-gray-300 text-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Preço Base (R$)</Label>
                    <Input
                      type="number"
                      value={formData.preco_base}
                      onChange={(e) => setFormData({...formData, preco_base: parseFloat(e.target.value)})}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Duração (horas)</Label>
                    <Input
                      type="number"
                      value={formData.duracao_estimada}
                      onChange={(e) => setFormData({...formData, duracao_estimada: parseFloat(e.target.value)})}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-gold text-black hover:bg-yellow-600">
                  {editingServico ? 'Atualizar' : 'Criar'} Serviço
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map(servico => (
            <Card key={servico.id} className="bg-white border-2 border-gray-200 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-gold">{servico.nome}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(servico)}
                      className="text-gold hover:text-gold-dark"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(servico.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{servico.descricao}</p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-gold text-black">
                    R$ {servico.preco_base?.toFixed(2)}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {servico.duracao_estimada}h
                  </span>
                </div>
                <Badge variant={servico.ativo ? "default" : "secondary"} className={servico.ativo ? "bg-green-600 text-white" : ""}>
                  {servico.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
