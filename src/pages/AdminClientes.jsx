import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Award, Search } from "lucide-react";

// Mock data
const mockClientes = [
  {
    id: 1,
    created_by: "joao@example.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua Exemplo, 123",
    pontos_fidelidade: 150,
    codigo_indicacao: "JOAO123",
    desconto_disponivel: 10
  },
  {
    id: 2,
    created_by: "maria@example.com",
    telefone: "(11) 98888-8888",
    endereco: "Av. Teste, 456",
    pontos_fidelidade: 200,
    codigo_indicacao: "MARIA456",
    desconto_disponivel: 0
  }
];

export default function AdminClientes() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [clientes] = React.useState(mockClientes);

  const filteredClientes = clientes.filter(cliente =>
    cliente.created_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gold">Clientes</h1>
          <p className="text-xl text-gray-700">Gerencie sua base de clientes</p>
        </div>

        <Card className="bg-white border-2 border-gray-200 shadow-md mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                placeholder="Buscar por email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-black"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClientes.map(cliente => (
            <Card key={cliente.id} className="bg-white border-2 border-gray-200 hover:border-gold transition-all shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-gold mb-1">
                      {cliente.created_by}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{cliente.telefone || 'Sem telefone'}</p>
                  </div>
                  <Badge className="bg-gold text-black">
                    <Award className="w-3 h-3 mr-1" />
                    {cliente.pontos_fidelidade || 0}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Endereço</p>
                  <p className="text-sm text-gray-700">{cliente.endereco || 'Não informado'}</p>
                </div>
                {cliente.codigo_indicacao && (
                  <div>
                    <p className="text-xs text-gray-500">Código de Indicação</p>
                    <p className="text-sm font-mono text-gold font-semibold">{cliente.codigo_indicacao}</p>
                  </div>
                )}
                {cliente.desconto_disponivel > 0 && (
                  <Badge className="bg-green-600 text-white">
                    {cliente.desconto_disponivel}% de desconto disponível
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
