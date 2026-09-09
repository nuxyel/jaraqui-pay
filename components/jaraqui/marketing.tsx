'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  Code2,
  CreditCard,
  Database,
  FileCheck2,
  FileText,
  Fingerprint,
  KeyRound,
  Landmark,
  Lock,
  QrCode,
  RefreshCcw,
  Server,
  ShieldCheck,
  Webhook,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/jaraqui/brand';

type PaymentMethod = 'Pix' | 'Cartão' | 'Boleto';

const apiSamples = {
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

function ApiConsole() {
  const [apiMethod, setApiMethod] = useState<PaymentMethod>('Pix');
  const sample = apiSamples[apiMethod];
  const SampleIcon = sample.icon;

  return (
    <div className="api-console" id="api-demo">
      <div className="console-titlebar">
        <div className="terminal-dots"><i /><i /><i /></div>
        <span>sandbox.jaraqui.dev</span>
        <small>AO VIVO</small>
      </div>
      <div className="method-tabs" role="group" aria-label="Método de pagamento da demonstração">
        {(Object.keys(apiSamples) as PaymentMethod[]).map((method) => {
          const Icon = apiSamples[method].icon;
          return (
            <button
              key={method}
              className={apiMethod === method ? 'active' : ''}
              aria-pressed={apiMethod === method}
              onClick={() => setApiMethod(method)}
            >
              <Icon />{method}
            </button>
          );
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
  );
}

function ProductProof() {
  return (
    <section className="landing-section product-proof" id="produtos">
      <div className="section-heading split-heading">
        <div>
          <span className="section-label">O PROBLEMA DE VERDADE</span>
          <h2>Cobrar é fácil.<br />Fechar a conta é que pega.</h2>
        </div>
        <p>Seu cliente pagou. Agora você ainda precisa saber quem autorizou, quando capturou, onde liquidou e por que o saldo não bateu. A Jaraqui mostra o caminho inteiro.</p>
      </div>

      <div className="proof-cards">
        <article className="proof-card checkout-proof">
          <div className="proof-card-copy">
            <span className="proof-number">01</span>
            <QrCode />
            <h3>Uma cobrança.<br />Três jeitos de pagar.</h3>
            <p>Pix, boleto e cartão entram pelo mesmo fluxo. Menos integração para manter, mais tempo para construir o produto.</p>
          </div>
          <div className="checkout-receipt">
            <header><span>JQ</span><small>CHECKOUT DEMO</small></header>
            <strong>R$ 349,90</strong>
            <p>Plano Norte · mensal</p>
            <div><button className="selected"><QrCode /> Pix</button><button><CreditCard /> Cartão</button></div>
            <span className="receipt-status"><CheckCircle2 /> Pagamento confirmado</span>
          </div>
        </article>

        <article className="proof-card api-proof" id="integracoes">
          <div className="proof-card-copy">
            <span className="proof-number">02</span>
            <Code2 />
            <h3>Webhook falhou?<br />Você vê onde encalhou.</h3>
            <p>Idempotência, assinatura e reenvio deixam de ser detalhes escondidos e viram parte visível da operação.</p>
          </div>
          <div className="event-stream">
            <div className="event-ok"><i /><code>charge.created</code><span>184ms</span></div>
            <div className="event-ok"><i /><code>charge.paid</code><span>200</span></div>
            <div className="event-warn"><i /><code>webhook.retry</code><span>2/5</span></div>
            <div><i /><code>ledger.posted</code><span>aguardando</span></div>
          </div>
        </article>

        <article className="proof-card recon-proof">
          <div className="proof-card-copy">
            <span className="proof-number">03</span>
            <RefreshCcw />
            <h3>O saldo não bateu.<br />A divergência aparece.</h3>
            <p>Jaraqui Pay, ledger próprio, PSP e banco liquidante lado a lado — inclusive quando algum deles discorda.</p>
          </div>
              <div className="recon-mini-table real-reconciliation-preview">
                <img src="/reconciliation-preview.png" alt="Tela real de conciliação da Jaraqui Pay comparando ledger próprio, PSP e banco liquidante" />
                <span className="real-preview-label">TELA REAL · CONCILIAÇÃO</span>
              </div>
        </article>
      </div>
    </section>
  );
}

function PaymentFlow() {
  const nodes = [
    [Server, 'Jaraqui Pay', 'API + eventos'],
    [Building2, 'PSP', 'Processamento'],
    [Database, 'Ledger próprio', 'Registro oficial'],
    [Landmark, 'Banco', 'Liquidação'],
  ] as const;

  return (
    <section className="flow-section" id="como-funciona">
      <div className="flow-intro">
        <span className="section-label">SEM CAIXA-PRETA</span>
        <h2>Do checkout à liquidação,<br />sem sumiço.</h2>
        <p>A dependência de parceiros existe. Fingir que não existe é que vira risco.</p>
      </div>
      <div className="payment-flow">
        {nodes.map(([Icon, title, detail], index) => (
          <div className="flow-step-wrap" key={title}>
            <article className={title === 'Ledger próprio' ? 'own-node' : ''}>
              <span>0{index + 1}</span>
              <Icon />
              <strong>{title}</strong>
              <small>{detail}</small>
              {title === 'Ledger próprio' && <em>controle interno</em>}
            </article>
            {index < nodes.length - 1 && <ArrowRight className="flow-arrow" />}
          </div>
        ))}
      </div>
      <div className="flow-controls">
        <span><KeyRound /> Idempotência</span>
        <span><Fingerprint /> Tokenização</span>
        <span><Webhook /> Webhook assinado</span>
        <span><FileCheck2 /> Trilha de auditoria</span>
      </div>
    </section>
  );
}

function DashboardProof({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="dashboard-proof-section">
      <div className="dashboard-proof-copy">
        <span className="section-label">POR DENTRO DA OPERAÇÃO</span>
        <h2>Você não precisa<br />caçar o problema.</h2>
        <p>O painel prioriza o que entrou, o que ainda vai liquidar e o que precisa de atenção agora.</p>
        <button onClick={onEnter}>Explorar o dashboard <ArrowRight /></button>
      </div>
      <div className="landing-dashboard real-dashboard-preview">
        <img src="/dashboard-preview.png" alt="Dashboard real da Jaraqui Pay com saldo, aprovação, volume processado e alertas operacionais" />
        <span className="real-preview-label">TELA REAL · DASHBOARD DEMO</span>
      </div>
    </section>
  );
}

function SecurityAndFaq() {
  return (
    <>
      <section className="security-section" id="seguranca">
        <div className="security-title">
          <span className="section-label">SEGURANÇA QUE APARECE</span>
          <h2>Controle antes<br />que vire incidente.</h2>
        </div>
        <div className="security-list">
          <article><Fingerprint /><div><strong>Autenticação multifator</strong><span>Acesso reforçado para contas críticas.</span></div><Check /></article>
          <article><Lock /><div><strong>Tokenização</strong><span>Dados sensíveis nunca aparecem completos.</span></div><Check /></article>
          <article><KeyRound /><div><strong>Idempotência</strong><span>Repetição de requisição sem cobrança duplicada.</span></div><Check /></article>
          <article><Webhook /><div><strong>Webhooks assinados</strong><span>Origem validada e reenvio observável.</span></div><Check /></article>
        </div>
      </section>

      <section className="faq-section">
        <div>
          <span className="section-label">SEM LETRA MIÚDA</span>
          <h2>Antes que você pergunte.</h2>
        </div>
        <div className="faq-list">
          <details open><summary>A Jaraqui Pay movimenta dinheiro real?</summary><p>Não. Este é um protótipo acadêmico com dados e fluxos totalmente simulados.</p></details>
          <details><summary>A empresa é autorizada pelo Banco Central?</summary><p>Não afirmamos autorização própria. O cenário considera a dependência de parceiros regulados no Brasil.</p></details>
          <details><summary>Quem mantém o ledger oficial?</summary><p>A própria Jaraqui Pay mantém o ledger oficial. Isso reduz a dependência operacional, mas exige controles fortes de disponibilidade, integridade, backup, recuperação e reconciliação.</p></details>
          <details><summary>Quais pagamentos entram na demonstração?</summary><p>Pix, boleto e cartão. Split e movimentação financeira real ficam fora do escopo.</p></details>
        </div>
      </section>
    </>
  );
}

export function Landing({ onEnter }: { onEnter: () => void }) {
  const showApi = () => document.getElementById('api-demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <main className="landing-page">
      <header className="landing-nav">
        <a href="#top" aria-label="Ir para o início"><Brand /></a>
        <nav aria-label="Navegação principal">
          <a href="#produtos">Produto</a>
          <a href="#integracoes">Integração</a>
          <a href="#seguranca">Segurança</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>
        <div><button className="nav-login" onClick={onEnter}>Entrar</button><Button className="landing-cta" onClick={onEnter}>Abrir demo <ArrowUpRight /></Button></div>
      </header>

      <section className="hero hero-rebuilt" id="top">
        <div className="hero-copy">
          <span className="hero-kicker"><i /> PAGAMENTOS PARA STARTUPS E SAAS BRASILEIROS</span>
          <h1>Pix, boleto e cartão.<br /><em>Uma API. Sem novela.</em></h1>
          <p>Crie cobranças, receba eventos por webhook e acompanhe cada pagamento entre PSP, ledger próprio e banco liquidante.</p>
          <div className="hero-actions"><Button className="landing-cta big" onClick={showApi}>Ver a API funcionando <ArrowRight /></Button><button className="demo-link" onClick={onEnter}><span><BarChart3 /></span>Abrir dashboard demo</button></div>
          <div className="click-trigger"><ShieldCheck /> Demonstração acadêmica · sem cadastro · sem dinheiro real</div>
        </div>
        <ApiConsole />
      </section>

      <section className="proof-strip"><p>O que acontece depois do “pagou” também importa.</p><div><span>PIX · BOLETO · CARTÃO</span><i /><span>API REST</span><i /><span>WEBHOOK ASSINADO</span><i /><span>CONCILIAÇÃO VISÍVEL</span></div></section>
      <ProductProof />
      <PaymentFlow />
      <DashboardProof onEnter={onEnter} />
      <SecurityAndFaq />

      <section className="final-cta"><Brand light /><h2>Bora tirar o pagamento<br />do caminho?</h2><p>Entre no ambiente demonstrativo e acompanhe a operação por dentro.</p><Button className="final-button" onClick={onEnter}>Acessar plataforma <ArrowRight /></Button></section>
      <footer className="landing-footer"><Brand /><p>Protótipo acadêmico · Sistemas de Informação · 2026</p><span>Manaus, Amazonas</span></footer>
    </main>
  );
}

export function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="login-page login-rebuilt">
      <section className="login-proof">
        <a href="#" onClick={(event) => event.preventDefault()}><Brand light /></a>
        <div className="login-proof-copy">
          <span className="login-pill">SANDBOX ACADÊMICO</span>
          <h1>Entre. O painel explica o resto.</h1>
          <p>Uma visão clara de cobranças, liquidação, conciliação e riscos — tudo com dados fictícios.</p>
          <div className="login-event-card">
            <div><i /><code>charge.paid</code><span>agora</span></div>
            <strong>R$ 1.249,90</strong>
            <small>Pix confirmado · ledger pendente</small>
          </div>
        </div>
        <small>Nenhuma transação real é processada.</small>
      </section>

      <section className="login-panel">
        <div className="mobile-brand"><Brand /></div>
        <div className="login-form">
          <p className="eyebrow">BEM-VINDO À DEMO</p>
          <h2>Acesse a Jaraqui Pay</h2>
          <p>Não precisa configurar nada. É só entrar.</p>
          <Button className="google-button primary-login" onClick={onLogin}><b>G</b> Continuar com Google <ArrowRight /></Button>
          <details className="email-login">
            <summary>Entrar com e-mail</summary>
            <label>E-mail de acesso<input defaultValue="renan@acai-do-jaraqui.com.br" type="email" /></label>
            <label>Senha<input defaultValue="jarAqui2026" type="password" /></label>
            <Button className="secondary-login" onClick={onLogin}>Entrar na plataforma</Button>
          </details>
          <div className="login-assurances"><span><Check /> Dados fictícios</span><span><Check /> Sem cadastro</span><span><Check /> Ambiente local</span></div>
        </div>
      </section>
    </main>
  );
}
