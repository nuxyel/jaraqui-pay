'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Code2,
  Copy,
  CreditCard,
  Eye,
  FileText,
  Fingerprint,
  Home,
  KeyRound,
  Landmark,
  Link2,
  Lock,
  Menu,
  MoreHorizontal,
  Plus,
  QrCode,
  RefreshCcw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
  Unplug,
  WalletCards,
  Webhook,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Brand, FishMark } from '@/components/jaraqui/brand';
import { Landing, Login } from '@/components/jaraqui/marketing';
import { initialTxs, providerDependencies, salesData, type Tx } from '@/lib/jaraqui-data';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

type View =
  | 'overview'
  | 'transactions'
  | 'charges'
  | 'balance'
  | 'reconciliation'
  | 'developers'
  | 'cards'
  | 'security';
const nav = [
  ['overview', 'Visão geral', Home],
  ['transactions', 'Transações', WalletCards],
  ['charges', 'Cobranças', CircleDollarSign],
  ['balance', 'Saldo e ledger', Landmark],
  ['reconciliation', 'Conciliação', RefreshCcw],
  ['developers', 'Desenvolvedores', Code2],
  ['cards', 'Cartões', CreditCard],
  ['security', 'Segurança e riscos', Shield],
] as const;

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}
function Status({ children }: { children: string }) {
  return (
    <span className={`status ${children.toLowerCase().replaceAll(' ', '-')}`}>
      {children}
    </span>
  );
}
function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
function Metric({
  title,
  value,
  detail,
  tone = 'plain',
}: {
  title: string;
  value: string;
  detail: string;
  tone?: string;
}) {
  return (
    <Card className={`metric-card ${tone}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {tone === 'featured' ? (
          <Eye />
        ) : (
          <span className="positive">Em dia</span>
        )}
      </CardHeader>
      <CardContent>
        <strong>{value}</strong>
        <p>{detail}</p>
      </CardContent>
    </Card>
  );
}
function TxTable({
  items,
  onSelect,
}: {
  items: Tx[];
  onSelect: (tx: Tx) => void;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Método</th>
            <th>Status</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {items.map((tx) => (
            <tr
              key={tx.id}
              onClick={() => onSelect(tx)}
              className="clickable-row"
            >
              <td className="mono">{tx.id}</td>
              <td>{tx.customer}</td>
              <td>{tx.method}</td>
              <td>
                <Status>{tx.status}</Status>
              </td>
              <td>{tx.date}</td>
              <td>{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Overview({
  setView,
  openCharge,
  selectTx,
}: {
  setView: (v: View) => void;
  openCharge: () => void;
  selectTx: (tx: Tx) => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="DOMINGO, 6 DE SETEMBRO"
        title="Boa tarde, Renan"
        description="O dinheiro entrou. Agora veja o que já pode usar e o que precisa de atenção."
        action={
          <Button className="primary-button" onClick={openCharge}>
            <Plus />
            Nova cobrança
          </Button>
        }
      />
      <div className="metrics-grid">
        <Metric
          title="Saldo disponível"
          value="R$ 48.720,36"
          detail="Livre para repasse ou uso"
          tone="featured"
        />
        <Metric
          title="A liquidar"
          value="R$ 8.430,20"
          detail="Previsão: próximo dia útil"
        />
        <Metric
          title="Taxa de aprovação"
          value="96,8%"
          detail="+2,4 p.p. contra o período anterior"
        />
      </div>
      <div className="dashboard-primary-grid">
        <Card className="chart-card chart-card-real">
          <CardHeader>
            <div>
              <CardTitle>Volume processado</CardTitle>
              <p>R$ 126.840,50 nos últimos sete dias · 18,4% acima do período anterior</p>
            </div>
            <button className="soft-button">
              7 dias <ChevronDown />
            </button>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="sales-chart"
              config={{ amount: { label: 'Volume', color: '#6847f5' } }}
            >
              <AreaChart data={salesData} margin={{ left: 2, right: 2, top: 12, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip
                  cursor={{ stroke: '#b9afd9', strokeDasharray: '4 4' }}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-amount)"
                  strokeWidth={3}
                  fill="var(--color-amount)"
                  fillOpacity={0.11}
                  activeDot={{ r: 5, fill: '#6847f5', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="attention-card">
          <CardHeader>
            <div><p className="eyebrow">AGORA</p><CardTitle>Precisa da sua atenção</CardTitle></div>
            <span className="attention-count">3</span>
          </CardHeader>
          <CardContent>
            <button onClick={() => setView('reconciliation')}><span className="attention-icon critical"><AlertTriangle /></span><span><strong>Liquidação divergente</strong><small>R$ 8,40 de diferença em #JQ-9834</small></span><ArrowRight /></button>
            <button onClick={() => setView('security')}><span className="attention-icon warning"><Server /></span><span><strong>PSP com instabilidade</strong><small>Latência elevada há 12 minutos</small></span><ArrowRight /></button>
            <button onClick={() => setView('developers')}><span className="attention-icon info"><Webhook /></span><span><strong>Webhook em reenvio</strong><small>2 de 5 tentativas realizadas</small></span><ArrowRight /></button>
          </CardContent>
        </Card>
      </div>
      <div className="dashboard-secondary-grid">
        <Card className="data-card recent-card">
          <CardHeader><div><CardTitle>Transações recentes</CardTitle><p>Do clique à liquidação, sem mistério</p></div><button className="text-button" onClick={() => setView('transactions')}>Ver todas</button></CardHeader>
          <CardContent><TxTable items={initialTxs.slice(0, 4)} onSelect={selectTx} /></CardContent>
        </Card>
        <Card className="mix-card">
          <CardHeader><div><CardTitle>Como seus clientes pagam</CardTitle><p>Participação no volume</p></div></CardHeader>
          <CardContent>
            <div className="mix-row"><span><i className="pix" />Pix</span><strong>52%</strong><div><b style={{ width: '52%' }} /></div></div>
            <div className="mix-row"><span><i className="card-dot" />Cartão</span><strong>38%</strong><div><b style={{ width: '38%' }} /></div></div>
            <div className="mix-row"><span><i className="boleto" />Boleto</span><strong>10%</strong><div><b style={{ width: '10%' }} /></div></div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Transactions({ selectTx }: { selectTx: (tx: Tx) => void }) {
  const [filter, setFilter] = useState('Todas');
  const [query, setQuery] = useState('');
  const items = initialTxs.filter(
    (t) =>
      (filter === 'Todas' || t.status === filter) &&
      (t.customer + t.id + t.method)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        eyebrow="OPERAÇÕES"
        title="Transações"
        description="Acompanhe cada etapa do processamento e da liquidação."
      />
      <div className="toolbar">
        <label className="search-box">
          <Search />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por ID, cliente ou método"
          />
        </label>
        <div className="filter-pills">
          {['Todas', 'Aprovada', 'Pendente', 'Recusada', 'Estornada'].map(
            (f) => (
              <button
                key={f}
                className={filter === f ? 'selected' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ),
          )}
        </div>
        <Button variant="outline">
          <SlidersHorizontal />
          Filtros
        </Button>
      </div>
      <Card className="data-card">
        <CardHeader>
          <div>
            <CardTitle>{items.length} transações encontradas</CardTitle>
            <p>Dados simulados para demonstração acadêmica</p>
          </div>
          <Button variant="outline">
            <FileText />
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <TxTable items={items} onSelect={selectTx} />
        </CardContent>
      </Card>
    </>
  );
}

function Charges({ openCharge }: { openCharge: () => void }) {
  return (
    <>
      <PageHeader
        eyebrow="RECEBIMENTOS"
        title="Cobranças"
        description="Crie cobranças por Pix, boleto, cartão ou link de pagamento."
        action={
          <Button className="primary-button" onClick={openCharge}>
            <Plus />
            Criar cobrança
          </Button>
        }
      />
      <div className="option-grid">
        {[
          [QrCode, 'Pix', 'Recebimento instantâneo com QR Code'],
          [FileText, 'Boleto', 'Cobrança rastreável com vencimento'],
          [CreditCard, 'Cartão', 'Checkout tokenizado e seguro'],
          [Link2, 'Link de pagamento', 'Compartilhe por qualquer canal'],
        ].map(([Icon, title, desc]) => (
          <Card
            className="option-card"
            key={String(title)}
            onClick={openCharge}
          >
            <CardContent>
              <span className="option-icon">
                <Icon />
              </span>
              <h3>{String(title)}</h3>
              <p>{String(desc)}</p>
              <ArrowRight />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="data-card">
        <CardHeader>
          <div>
            <CardTitle>Cobranças recentes</CardTitle>
            <p>Links e faturas criados pela sua empresa</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="simple-list">
            <div>
              <span className="item-icon purple">
                <Link2 />
              </span>
              <p>
                <strong>Plano Pro — Norte SaaS</strong>
                <small>Link · criado há 12 min</small>
              </p>
              <Status>Ativa</Status>
              <b>R$ 499,00</b>
            </div>
            <div>
              <span className="item-icon teal">
                <QrCode />
              </span>
              <p>
                <strong>Pedido #4821</strong>
                <small>Pix · pago há 38 min</small>
              </p>
              <Status>Pago</Status>
              <b>R$ 1.249,90</b>
            </div>
            <div>
              <span className="item-icon amber">
                <FileText />
              </span>
              <p>
                <strong>Mensalidade setembro</strong>
                <small>Boleto · vence em 3 dias</small>
              </p>
              <Status>Pendente</Status>
              <b>R$ 750,00</b>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Balance() {
  return (
    <>
      <PageHeader
        eyebrow="FINANCEIRO"
        title="Saldo e ledger"
        description="Visão operacional dos recursos registrados no ledger próprio."
        action={
          <Button className="primary-button">
            <ArrowUpRight />
            Solicitar repasse
          </Button>
        }
      />
      <div className="metrics-grid">
        <Metric
          title="Saldo disponível"
          value="R$ 48.720,36"
          detail="Disponível para repasse"
          tone="featured"
        />
        <Metric
          title="Saldo pendente"
          value="R$ 8.430,20"
          detail="Aguardando liquidação"
        />
        <Metric
          title="Reserva operacional"
          value="R$ 3.200,00"
          detail="Proteção contra chargebacks"
        />
      </div>
      <div className="info-banner">
        <Server />
        <div>
          <strong>Ledger oficial mantido pela Jaraqui Pay</strong>
          <p>
            A Jaraqui Pay mantém uma trilha própria de eventos para auditoria e
            concilia diariamente os saldos com o provedor.
          </p>
        </div>
        <Status>Sincronizado</Status>
      </div>
      <Card className="data-card">
        <CardHeader>
          <div>
            <CardTitle>Lançamentos do ledger</CardTitle>
            <p>Créditos, débitos, tarifas, reservas e repasses</p>
          </div>
          <button className="soft-button">
            Últimos 30 dias <ChevronDown />
          </button>
        </CardHeader>
        <CardContent>
          <div className="simple-list ledger-list">
            {[
              [
                ArrowDownLeft,
                'Pagamento Pix liquidado',
                'tx_9842 · ledger evt_6219',
                '+ R$ 1.249,90',
                'positive-value',
              ],
              [
                ArrowUpRight,
                'Repasse bancário',
                'Conta final 8391 · repasse rp_201',
                '− R$ 12.000,00',
                'negative-value',
              ],
              [
                CircleDollarSign,
                'Tarifa de processamento',
                'Pix tx_9842',
                '− R$ 0,80',
                'negative-value',
              ],
              [
                ArrowDownLeft,
                'Captura de cartão',
                'tx_9841 · liquidação D+2',
                '+ R$ 389,00',
                'positive-value',
              ],
              [
                Shield,
                'Reserva de chargeback',
                'Cartão tx_9836',
                '− R$ 240,00',
                'negative-value',
              ],
            ].map(([Icon, t, sub, val, cls]) => (
              <div key={String(sub)}>
                <span className="item-icon">
                  <Icon />
                </span>
                <p>
                  <strong>{String(t)}</strong>
                  <small>{String(sub)}</small>
                </p>
                <b className={String(cls)}>{String(val)}</b>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Reconciliation() {
  const [tab, setTab] = useState('Divergentes');
  const rows = [
    [
      '#JQ-9828',
      'R$ 820,00',
      'R$ 819,20',
      'R$ 819,20',
      'Tarifa não registrada',
    ],
    ['#JQ-9817', 'R$ 1.450,00', 'R$ 1.450,00', '—', 'Liquidação pendente'],
    ['#JQ-9789', 'R$ 299,00', 'R$ 299,00', 'R$ 598,00', 'Evento duplicado'],
  ];
  return (
    <>
      <PageHeader
        eyebrow="CONTROLE FINANCEIRO"
        title="Conciliação"
        description="Compare Jaraqui Pay, ledger próprio, PSP e banco liquidante."
        action={
          <Button className="primary-button">
            <RefreshCcw />
            Conciliar agora
          </Button>
        }
      />
      <div className="provider-flow">
        <div>
          <span>
            <BookOpen />
          </span>
          <strong>Jaraqui Pay</strong>
          <Status>Operando</Status>
        </div>
        <ArrowRight />
        <div>
          <span>
            <Server />
          </span>
          <strong>Ledger próprio<small className="dependency-label">Controle interno · monitorado</small></strong>
          <Status>Operando</Status>
        </div>
        <ArrowRight />
        <div>
          <span>
            <Webhook />
          </span>
          <strong>PSP</strong>
          <Status>Instável</Status>
        </div>
        <ArrowRight />
        <div>
          <span>
            <Landmark />
          </span>
          <strong>Banco liquidante</strong>
          <Status>Operando</Status>
        </div>
      </div>
      <div className="recon-stats">
        <Card>
          <CardContent>
            <CheckCircle2 />
            <div>
              <strong>1.276</strong>
              <span>Conciliadas</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Clock3 />
            <div>
              <strong>5</strong>
              <span>Pendentes</span>
            </div>
          </CardContent>
        </Card>
        <Card className="danger-card">
          <CardContent>
            <AlertTriangle />
            <div>
              <strong>3</strong>
              <span>Divergentes</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="data-card">
        <CardHeader>
          <div className="filter-pills large">
            {['Conciliadas', 'Pendentes', 'Divergentes'].map((x) => (
              <button
                key={x}
                className={tab === x ? 'selected' : ''}
                onClick={() => setTab(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <Button variant="outline">Baixar relatório</Button>
        </CardHeader>
        <CardContent>
          {tab === 'Divergentes' ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Transação</th>
                    <th>Jaraqui Pay</th>
                    <th>Ledger</th>
                    <th>Banco</th>
                    <th>Motivo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((v, i) => (
                        <td key={`${r[0]}-${i}`}>
                          {i === 4 ? (
                            <span className="risk-text">
                              <AlertTriangle />
                              {v}
                            </span>
                          ) : (
                            v
                          )}
                        </td>
                      ))}
                      <td>
                        <Button size="sm" variant="outline">
                          Revisar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <CheckCircle2 />
              <h3>
                {tab === 'Conciliadas'
                  ? 'Todas as operações estão consistentes'
                  : '5 operações aguardam confirmação'}
              </h3>
              <p>
                Use a aba Divergentes durante a apresentação para demonstrar o
                risco de terceiros.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function Developers() {
  const [copied, setCopied] = useState('');
  const copy = (x: string) => {
    navigator.clipboard?.writeText(x);
    setCopied(x);
    setTimeout(() => setCopied(''), 1200);
  };
  return (
    <>
      <PageHeader
        eyebrow="INTEGRAÇÕES"
        title="Desenvolvedores"
        description="APIs simples, idempotentes e observáveis para integrar pagamentos."
        action={
          <Button className="primary-button">
            <BookOpen />
            Ver documentação
          </Button>
        }
      />
      <div className="dev-grid">
        <Card className="data-card">
          <CardHeader>
            <div>
              <CardTitle>Chaves da API</CardTitle>
              <p>As credenciais completas nunca são exibidas</p>
            </div>
            <Button variant="outline">
              <Plus />
              Nova chave
            </Button>
          </CardHeader>
          <CardContent>
            <div className="key-box">
              <span>
                <KeyRound />
              </span>
              <p>
                <strong>Chave de teste</strong>
                <code>jq_test_••••••••••••7f31</code>
              </p>
              <button onClick={() => copy('key')}>
                <Copy />
                {copied === 'key' ? 'Copiado' : ''}
              </button>
            </div>
            <div className="key-box">
              <span>
                <Lock />
              </span>
              <p>
                <strong>Chave de produção</strong>
                <code>jq_live_••••••••••••9a42</code>
              </p>
              <button onClick={() => copy('live')}>
                <Copy />
                {copied === 'live' ? 'Copiado' : ''}
              </button>
            </div>
          </CardContent>
        </Card>
        <Card className="api-health">
          <CardHeader>
            <CardTitle>Saúde da API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="health-score">
              <strong>99,98%</strong>
              <span>Disponibilidade</span>
            </div>
            <p>
              <span>Latência p95</span>
              <b>184 ms</b>
            </p>
            <p>
              <span>Erros nas últimas 24h</span>
              <b>0,02%</b>
            </p>
            <p>
              <span>Versão estável</span>
              <b>v1</b>
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="data-card">
        <CardHeader>
          <div>
            <CardTitle>Endpoints principais</CardTitle>
            <p>Exemplos fictícios da API REST</p>
          </div>
          <Status>Ambiente de teste</Status>
        </CardHeader>
        <CardContent>
          <div className="endpoints">
            <div>
              <span className="method post">POST</span>
              <code>/v1/charges</code>
              <p>Criar cobrança</p>
              <Status>Idempotente</Status>
            </div>
            <div>
              <span className="method get">GET</span>
              <code>/v1/transactions/:id</code>
              <p>Consultar transação</p>
              <Status>Autenticado</Status>
            </div>
            <div>
              <span className="method post">POST</span>
              <code>/v1/refunds</code>
              <p>Solicitar estorno</p>
              <Status>Idempotente</Status>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="data-card">
        <CardHeader>
          <div>
            <CardTitle>Webhooks recentes</CardTitle>
            <p>Eventos assinados e verificados</p>
          </div>
          <Button variant="outline">
            <Webhook />
            Configurar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="simple-list">
            <div>
              <span className="item-icon teal">
                <Check />
              </span>
              <p>
                <strong>payment.paid</strong>
                <small>200 OK · há 2 min · tentativa 1</small>
              </p>
              <Status>Entregue</Status>
            </div>
            <div>
              <span className="item-icon amber">
                <Clock3 />
              </span>
              <p>
                <strong>transfer.pending</strong>
                <small>202 Accepted · há 9 min</small>
              </p>
              <Status>Pendente</Status>
            </div>
            <div>
              <span className="item-icon purple">
                <RefreshCcw />
              </span>
              <p>
                <strong>payment.refunded</strong>
                <small>200 OK · há 21 min · tentativa 2</small>
              </p>
              <Status>Reenviado</Status>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Cards() {
  const [locked, setLocked] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="CARTÃO EMPRESARIAL"
        title="Cartões"
        description="Controle gastos da empresa com segurança e visibilidade."
        action={
          <Button className="primary-button">
            <Plus />
            Novo cartão
          </Button>
        }
      />
      <div className="cards-layout">
        <div className={`bank-card ${locked ? 'locked' : ''}`}>
          <div className="bank-card-top">
            <FishMark />
            <span>Jaraqui Pay</span>
            <i>VIRTUAL</i>
          </div>
          <div className="chip" />
          <strong>•••• &nbsp;•••• &nbsp;•••• &nbsp;4827</strong>
          <div className="bank-card-bottom">
            <span>
              RENAN NOGUEIRA<small>VALIDADE 09/29</small>
            </span>
            <b>VISA</b>
          </div>
          {locked && (
            <div className="locked-overlay">
              <Lock />
              Cartão bloqueado
            </div>
          )}
        </div>
        <Card className="card-controls">
          <CardHeader>
            <CardTitle>Controle do cartão</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span>Limite disponível</span>
              <strong>R$ 8.420,00</strong>
            </div>
            <div className="limit-bar">
              <i />
            </div>
            <p>R$ 1.580,00 utilizados de R$ 10.000,00</p>
            <Button
              variant={locked ? 'default' : 'destructive'}
              onClick={() => setLocked(!locked)}
            >
              {locked ? (
                <>
                  <Check />
                  Desbloquear cartão
                </>
              ) : (
                <>
                  <Lock />
                  Bloquear cartão
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card className="data-card">
        <CardHeader>
          <div>
            <CardTitle>Compras recentes</CardTitle>
            <p>Dados do cartão sempre mascarados</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="simple-list">
            <div>
              <span className="item-icon purple">
                <Server />
              </span>
              <p>
                <strong>Amazon Web Services</strong>
                <small>Infraestrutura em nuvem · Hoje</small>
              </p>
              <Status>Aprovada</Status>
              <b>− R$ 842,50</b>
            </div>
            <div>
              <span className="item-icon teal">
                <Terminal />
              </span>
              <p>
                <strong>Dev Tools Brasil</strong>
                <small>Software · Ontem</small>
              </p>
              <Status>Aprovada</Status>
              <b>− R$ 129,90</b>
            </div>
            <div>
              <span className="item-icon amber">
                <Shield />
              </span>
              <p>
                <strong>Secure ID</strong>
                <small>Segurança · 4 set</small>
              </p>
              <Status>Aprovada</Status>
              <b>− R$ 320,00</b>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Security() {
  return (
    <>
      <PageHeader
        eyebrow="GESTÃO DE RISCOS"
        title="Segurança e riscos"
        description="Controles, alertas e dependências críticas da operação."
        action={
          <Button className="primary-button">
            <ShieldCheck />
            Revisar controles
          </Button>
        }
      />
      <div className="security-score">
        <div className="score-ring">
          <strong>87</strong>
          <span>/100</span>
        </div>
        <div>
          <h2>Postura de segurança saudável</h2>
          <p>
            11 de 13 controles prioritários estão ativos. Há dois pontos que
            exigem acompanhamento.
          </p>
          <div className="control-tags">
            <span>
              <Check />
              MFA ativo
            </span>
            <span>
              <Check />
              Tokenização
            </span>
            <span>
              <Check />
              Logs imutáveis
            </span>
            <span>
              <Check />
              Idempotência
            </span>
          </div>
        </div>
      </div>
      <div className="risk-grid">
        <Card className="risk-card critical">
          <CardHeader>
            <AlertTriangle />
            <Status>Crítico</Status>
          </CardHeader>
          <CardContent>
            <h3>Disponibilidade do ledger próprio</h3>
            <p>
              Uma indisponibilidade pode impedir a confirmação imediata de saldos e
              repasses.
            </p>
            <div>
              <span>Probabilidade 4</span>
              <span>Impacto 5</span>
              <b>Risco 20</b>
            </div>
          </CardContent>
        </Card>
        <Card className="risk-card high">
          <CardHeader>
            <Unplug />
            <Status>Alto</Status>
          </CardHeader>
          <CardContent>
            <h3>Consumo inseguro de API</h3>
            <p>
              Falha de um fornecedor pode introduzir dados incorretos ou
              indisponibilidade.
            </p>
            <div>
              <span>Probabilidade 3</span>
              <span>Impacto 4</span>
              <b>Risco 12</b>
            </div>
          </CardContent>
        </Card>
        <Card className="risk-card medium">
          <CardHeader>
            <Webhook />
            <Status>Moderado</Status>
          </CardHeader>
          <CardContent>
            <h3>Webhook duplicado</h3>
            <p>
              Eventos repetidos podem provocar processamento duplo sem
              idempotência.
            </p>
            <div>
              <span>Probabilidade 3</span>
              <span>Impacto 3</span>
              <b>Risco 9</b>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="security-columns">
        <Card className="data-card">
          <CardHeader>
            <div>
              <CardTitle>Alertas recentes</CardTitle>
              <p>Monitoramento de fraude e infraestrutura</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="simple-list">
              <div>
                <span className="item-icon red">
                  <XCircle />
                </span>
                <p>
                  <strong>Tentativa de cartão bloqueada</strong>
                  <small>Regra: velocidade por dispositivo · há 8 min</small>
                </p>
                <Status>Contido</Status>
              </div>
              <div>
                <span className="item-icon amber">
                  <AlertTriangle />
                </span>
                <p>
                  <strong>Latência elevada no PSP</strong>
                  <small>p95 acima de 800 ms · há 19 min</small>
                </p>
                <Status>Monitorando</Status>
              </div>
              <div>
                <span className="item-icon teal">
                  <Fingerprint />
                </span>
                <p>
                  <strong>Novo acesso validado com MFA</strong>
                  <small>Manaus, AM · há 42 min</small>
                </p>
                <Status>Validado</Status>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="data-card providers">
          <CardHeader>
            <div><CardTitle>Componentes críticos</CardTitle><p>Serviços próprios e parceiros monitorados</p></div>
          </CardHeader>
          <CardContent>
            {providerDependencies.map((provider) => (
              <p key={provider.name} className={provider.name === 'Ledger próprio' ? 'critical-provider' : ''}>
                <span><strong>{provider.name}</strong><small>{provider.criticality}</small></span>
                <Status>{provider.status}</Status>
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function LegacyLanding({ onEnter }: { onEnter: () => void }) {
  const [apiMethod, setApiMethod] = useState<'Pix' | 'Cartão' | 'Boleto'>('Pix');
  const samples = {
    Pix: {
      icon: QrCode,
      endpoint: '/v1/charges',
      body: '{\n  "amount": 34990,\n  "method": "pix"\n}',
      response: '201 Created',
      event: 'charge.paid',
      time: '184 ms',
    },
    Cartão: {
      icon: CreditCard,
      endpoint: '/v1/charges',
      body: '{\n  "amount": 128000,\n  "method": "card"\n}',
      response: '201 Created',
      event: 'charge.captured',
      time: '241 ms',
    },
    Boleto: {
      icon: FileText,
      endpoint: '/v1/charges',
      body: '{\n  "amount": 75000,\n  "method": "boleto"\n}',
      response: '201 Created',
      event: 'charge.pending',
      time: '197 ms',
    },
  } as const;
  const sample = samples[apiMethod];
  const SampleIcon = sample.icon;
  const showApi = () =>
    document.getElementById('api-demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Brand />
        <nav>
          <a href="#produtos">Produto</a>
          <a href="#integracoes">Integração</a>
          <a href="#seguranca">Segurança</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>
        <div>
          <button className="nav-login" onClick={onEnter}>Entrar</button>
          <Button className="landing-cta" onClick={onEnter}>Abrir demo <ArrowUpRight /></Button>
        </div>
      </header>

      <section className="hero hero-rebuilt">
        <div className="hero-copy">
          <span className="hero-kicker"><i /> PAGAMENTOS PARA STARTUPS E SAAS BRASILEIROS</span>
          <h1>Pix, boleto e cartão.<br /><em>Uma API. Sem novela.</em></h1>
          <p>Crie cobranças, receba eventos por webhook e acompanhe cada pagamento entre PSP, ledger próprio e banco liquidante.</p>
          <div className="hero-actions">
            <Button className="landing-cta big" onClick={showApi}>Ver a API funcionando <ArrowRight /></Button>
            <button className="demo-link" onClick={onEnter}><span><BarChart3 /></span>Abrir dashboard demo</button>
          </div>
          <div className="click-trigger"><ShieldCheck /> Demonstração acadêmica · sem cadastro · sem dinheiro real</div>
        </div>
        <div className="api-console" id="api-demo">
          <div className="console-titlebar">
            <div className="terminal-dots"><i /><i /><i /></div>
            <span>sandbox.jaraqui.dev</span>
            <small>AO VIVO</small>
          </div>
          <div className="method-tabs" role="group" aria-label="Método de pagamento da demonstração">
            {(Object.keys(samples) as Array<keyof typeof samples>).map((method) => {
              const Icon = samples[method].icon;
              return <button key={method} className={apiMethod === method ? 'active' : ''} aria-pressed={apiMethod === method} onClick={() => setApiMethod(method)}><Icon />{method}</button>;
            })}
          </div>
          <div className="request-block">
            <div><span className="http-method">POST</span><code>{sample.endpoint}</code><small>{sample.time}</small></div>
            <pre>{sample.body}</pre>
          </div>
          <div className="console-result">
            <div className="result-icon"><SampleIcon /></div>
            <div><small>RESPOSTA</small><strong>{sample.response}</strong></div>
            <div><small>WEBHOOK</small><strong>{sample.event}</strong></div>
            <CheckCircle2 />
          </div>
          <div className="idempotency-line"><KeyRound /> Idempotency-Key <code>jq_demo_2026</code><span>validada</span></div>
          <div className="river-signature"><i /><i /><i /></div>
          <p className="console-caption">Uma cobrança inteira, sem esconder o caminho do dinheiro.</p>
        </div>
      </section>

      <section className="proof-strip"><p>O que acontece depois do “pagou” também importa.</p><div><span>PIX · BOLETO · CARTÃO</span><i /><span>API REST</span><i /><span>WEBHOOK ASSINADO</span><i /><span>CONCILIAÇÃO VISÍVEL</span></div></section>

      <section className="landing-section" id="produtos">
        <div className="section-intro"><span className="section-label">TUDO EM UM SÓ FLUXO</span><h2>Receba, acompanhe e cresça.</h2><p>Uma suíte enxuta para empresas que querem vender sem perder tempo com complexidade financeira.</p></div>
        <div className="feature-grid">
          <article className="feature-large"><span className="feature-icon"><QrCode /></span><h3>Receba como seu cliente preferir.</h3><p>Pix instantâneo, boleto rastreável e cartão com checkout tokenizado.</p><div className="payment-stack"><div><i>PIX</i><strong>R$ 349,90</strong><Status>Aprovada</Status></div><div><i>VISA •••• 4827</i><strong>R$ 1.280,00</strong><Status>Aprovada</Status></div><div><i>BOLETO</i><strong>R$ 750,00</strong><Status>Pendente</Status></div></div></article>
          <article className="feature-dark" id="integracoes"><span className="feature-icon"><Terminal /></span><h3>Uma API que fala a língua de quem desenvolve.</h3><p>Integração direta, idempotência nativa e webhooks assinados.</p><div className="code-card"><code><b>POST</b> /v1/charges</code><code>{'{ amount: 49900, method: "pix" }'}</code><span>201 Created · 184ms</span></div></article>
          <article className="feature-risk" id="seguranca"><span className="feature-icon"><ShieldCheck /></span><h3>Controle antes que vire problema.</h3><p>Fraude, dependências e divergências visíveis em tempo real.</p><div className="risk-meter"><span>Postura de segurança</span><strong>87<small>/100</small></strong><i><b /></i></div></article>
        </div>
      </section>

      <section className="manifesto" id="origem"><div><span className="section-label">NOSSA ORIGEM</span><h2>Inspirada nos rios.<br />Construída para movimentar.</h2></div><p>O jaraqui percorre as águas da Amazônia em grandes movimentos. A nossa tecnologia segue a mesma ideia: conectar negócios, pessoas e pagamentos com fluidez, segurança e direção.</p></section>
      <section className="final-cta"><Brand light /><h2>Deixe os pagamentos fluírem.</h2><p>Entre na plataforma demonstrativa e conheça a Jaraqui Pay por dentro.</p><Button className="final-button" onClick={onEnter}>Acessar plataforma <ArrowRight /></Button></section>
      <footer className="landing-footer"><Brand /><p>Protótipo acadêmico · Sistemas de Informação · 2026</p><span>Manaus, Amazonas</span></footer>
    </main>
  );
}

function LegacyLogin({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="login-page">
      <section className="login-art">
        <div className="river-lines" />
        <div className="login-brand">
          <FishMark />
          <strong>
            Jaraqui <span>Pay</span>
          </strong>
        </div>
        <div className="login-copy">
          <span className="login-pill">FEITA PARA NEGÓCIOS BRASILEIROS</span>
          <h1>Pagamentos que fluem com o seu negócio.</h1>
          <p>
            Receba por Pix, boleto e cartão. Acompanhe tudo em um só lugar, com
            clareza e segurança.
          </p>
          <div className="feature-row">
            <span>
              <Check />
              APIs simples
            </span>
            <span>
              <Check />
              Conciliação diária
            </span>
            <span>
              <Check />
              Proteção antifraude
            </span>
          </div>
        </div>
        <small>Protótipo acadêmico · Nenhuma transação real é processada</small>
      </section>
      <section className="login-panel">
        <div className="mobile-brand">
          <FishMark />
          <strong>Jaraqui Pay</strong>
        </div>
        <div className="login-form">
          <p className="eyebrow">BEM-VINDO DE VOLTA</p>
          <h2>Acesse sua conta</h2>
          <p>Entre para acompanhar o seu negócio.</p>
          <Button variant="outline" className="google-button" onClick={onLogin}>
            <b>G</b>Continuar com o Google
          </Button>
          <div className="divider">
            <span />
            ou entre com e-mail
            <span />
          </div>
          <label>
            E-mail de acesso
            <Input defaultValue="renan@acai-do-jaraqui.com.br" type="email" />
          </label>
          <label>
            Senha
            <Input defaultValue="jarAqui2026" type="password" />
          </label>
          <div className="form-options">
            <label>
              <input type="checkbox" defaultChecked />
              Lembrar acesso
            </label>
            <button>Esqueci minha senha</button>
          </div>
          <Button className="primary-button login-button" onClick={onLogin}>
            Entrar na plataforma <ArrowRight />
          </Button>
          <p className="terms">
            Ambiente demonstrativo com dados totalmente fictícios.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);
  const [logged, setLogged] = useState(false);
  const [view, setView] = useState<View>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Tx | null>(null);
  const [chargeOpen, setChargeOpen] = useState(false);
  const [chargeCreated, setChargeCreated] = useState(false);
  const [chargeMethod, setChargeMethod] = useState('Pix');
  const title = useMemo(() => nav.find((n) => n[0] === view)?.[1], [view]);
  if (showLanding) return <Landing onEnter={() => setShowLanding(false)} />;
  if (!logged) return <Login onLogin={() => setLogged(true)} />;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <aside
        className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
      >
        <div className="brand">
          <FishMark />
          {!collapsed && (
            <strong>
              Jaraqui <span>Pay</span>
            </strong>
          )}
        </div>
        <nav>
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              className={`nav-item ${view === id ? 'active' : ''}`}
              onClick={() => {
                setView(id);
                setMobileOpen(false);
              }}
              title={label}
            >
              <Icon />
              {!collapsed && label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="demo-badge">
            <span>DEMO</span>
            {!collapsed && <small>Ambiente acadêmico</small>}
          </div>
          <button
            className="collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Recolher menu"
          >
            <Menu />
          </button>
        </div>
      </aside>
      <section className={`app-shell ${collapsed ? 'shell-collapsed' : ''}`}>
        <header className="topbar">
          <button
            className="mobile-menu"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </button>
          <button className="company-switch">
            <span className="company-avatar">AJ</span>
            <span>
              <small>Empresa</small>Açaí do Jaraqui
            </span>
            <ChevronDown />
          </button>
          <span className="current-view">{title}</span>
          <div className="top-actions">
            <button aria-label="Pesquisar">
              <Search />
            </button>
            <button aria-label="Notificações" className="notification">
              <Bell />
              <i />
            </button>
            <button
              className="profile"
              onClick={() => setLogged(false)}
              title="Sair"
            >
              RN
            </button>
          </div>
        </header>
        <div className="page-wrap">
          {view === 'overview' && (
            <Overview
              setView={setView}
              openCharge={() => {
                setChargeCreated(false);
                setChargeOpen(true);
              }}
              selectTx={setSelectedTx}
            />
          )}{' '}
          {view === 'transactions' && <Transactions selectTx={setSelectedTx} />}{' '}
          {view === 'charges' && (
            <Charges
              openCharge={() => {
                setChargeCreated(false);
                setChargeOpen(true);
              }}
            />
          )}{' '}
          {view === 'balance' && <Balance />}{' '}
          {view === 'reconciliation' && <Reconciliation />}{' '}
          {view === 'developers' && <Developers />}{' '}
          {view === 'cards' && <Cards />} {view === 'security' && <Security />}
        </div>
      </section>
      <Dialog
        open={!!selectedTx}
        onOpenChange={(o) => !o && setSelectedTx(null)}
      >
        <DialogContent className="tx-dialog">
          <DialogHeader>
            <DialogTitle>Detalhes da transação {selectedTx?.id}</DialogTitle>
            <DialogDescription>
              Rastreabilidade do pagamento até a liquidação.
            </DialogDescription>
          </DialogHeader>
          {selectedTx && (
            <>
              <div className="tx-summary">
                <div>
                  <span>Valor</span>
                  <strong>{selectedTx.amount}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <Status>{selectedTx.status}</Status>
                </div>
                <div>
                  <span>Cliente</span>
                  <strong>{selectedTx.customer}</strong>
                </div>
                <div>
                  <span>Método</span>
                  <strong>{selectedTx.method}</strong>
                </div>
              </div>
              <div className="timeline">
                <div className="done">
                  <i>
                    <Check />
                  </i>
                  <p>
                    <strong>Requisição recebida</strong>
                    <span>Chave de idempotência validada</span>
                  </p>
                </div>
                <div className="done">
                  <i>
                    <Check />
                  </i>
                  <p>
                    <strong>Pagamento autorizado</strong>
                    <span>Antifraude e autenticação concluídos</span>
                  </p>
                </div>
                <div
                  className={
                    selectedTx.status === 'Pendente' ? 'pending' : 'done'
                  }
                >
                  <i>
                    {selectedTx.status === 'Pendente' ? <Clock3 /> : <Check />}
                  </i>
                  <p>
                    <strong>{selectedTx.stage}</strong>
                    <span>Evento registrado no ledger próprio</span>
                  </p>
                </div>
                <div>
                  <i>
                    <RefreshCcw />
                  </i>
                  <p>
                    <strong>Conciliação</strong>
                    <span>Comparação com PSP e banco liquidante</span>
                  </p>
                </div>
              </div>
              <div className="technical-box">
                <code>idempotency_key: idem_7g29••••</code>
                <code>provider_id: psp_84••••31</code>
                <code>ledger_event: evt_62••••19</code>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={chargeOpen} onOpenChange={setChargeOpen}>
        <DialogContent className="charge-dialog">
          <DialogHeader>
            <DialogTitle>
              {chargeCreated ? 'Cobrança criada' : 'Nova cobrança'}
            </DialogTitle>
            <DialogDescription>
              {chargeCreated
                ? 'O link demonstrativo está pronto para compartilhar.'
                : 'Escolha o método e preencha os dados fictícios.'}
            </DialogDescription>
          </DialogHeader>
          {chargeCreated ? (
            <div className="success-charge">
              <span>
                <Check />
              </span>
              <h3>R$ 499,00</h3>
              <p>Cobrança criada com sucesso</p>
              <div>
                <code>pay.jaraqui.demo/c/jq_72f9</code>
                <button>
                  <Copy />
                </button>
              </div>
              <div className="fake-qr">
                <QrCode />
              </div>
            </div>
          ) : (
            <div className="charge-form">
              <label>
                Método de pagamento
                <div className="method-buttons">
                  {['Pix', 'Boleto', 'Cartão', 'Link'].map((m) => (
                    <button
                      key={m}
                      className={chargeMethod === m ? 'selected' : ''}
                      onClick={() => setChargeMethod(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </label>
              <label>
                Descrição
                <Input defaultValue="Plano Pro — setembro" />
              </label>
              <div className="form-row">
                <label>
                  Valor
                  <Input defaultValue="R$ 499,00" />
                </label>
                <label>
                  Vencimento
                  <Input defaultValue="10/09/2026" />
                </label>
              </div>
              <label>
                E-mail do cliente
                <Input defaultValue="cliente@exemplo.com" />
              </label>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setChargeOpen(false)}>
              Fechar
            </Button>
            {!chargeCreated && (
              <Button
                className="primary-button"
                onClick={() => setChargeCreated(true)}
              >
                Criar cobrança
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
