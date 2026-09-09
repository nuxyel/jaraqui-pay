export type Tx = {
  id: string;
  method: string;
  status: string;
  date: string;
  amount: string;
  customer: string;
  stage?: string;
};

export const initialTxs: Tx[] = [
  { id: '#JQ-9842', method: 'Pix', status: 'Aprovada', date: 'Hoje, 14:32', amount: 'R$ 1.249,90', customer: 'Norte SaaS Ltda.', stage: 'Liquidada' },
  { id: '#JQ-9841', method: 'Cartão', status: 'Aprovada', date: 'Hoje, 13:58', amount: 'R$ 389,00', customer: 'Marina Costa', stage: 'Capturada' },
  { id: '#JQ-9840', method: 'Boleto', status: 'Pendente', date: 'Hoje, 12:41', amount: 'R$ 750,00', customer: 'Amazônia Cloud', stage: 'Aguardando pagamento' },
  { id: '#JQ-9839', method: 'Pix', status: 'Estornada', date: 'Hoje, 11:16', amount: 'R$ 89,90', customer: 'Lucas Almeida', stage: 'Estornada' },
  { id: '#JQ-9838', method: 'Cartão', status: 'Recusada', date: 'Hoje, 10:49', amount: 'R$ 2.180,00', customer: 'Studio Tucumã', stage: 'Negada pelo emissor' },
  { id: '#JQ-9837', method: 'Pix', status: 'Aprovada', date: 'Ontem, 22:03', amount: 'R$ 459,50', customer: 'Banzeiro Digital', stage: 'Liquidada' },
];

export const salesData = [
  { day: 'Seg', amount: 12400 },
  { day: 'Ter', amount: 17800 },
  { day: 'Qua', amount: 14900 },
  { day: 'Qui', amount: 22100 },
  { day: 'Sex', amount: 19400 },
  { day: 'Sáb', amount: 24800 },
  { day: 'Dom', amount: 21700 },
];

export const providerDependencies = [
  { name: 'Ledger próprio', status: 'Operando', criticality: 'Crítica' },
  { name: 'PSP principal', status: 'Instável', criticality: 'Alta' },
  { name: 'Banco liquidante', status: 'Operando', criticality: 'Alta' },
  { name: 'Nuvem — Brasil', status: 'Operando', criticality: 'Alta' },
] as const;
