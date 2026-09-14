# Media kit · Jaraqui Pay

Material oficial para a apresentação do projeto acadêmico de Governança, Gestão de Riscos e Integridade.

## O que é a Jaraqui Pay

Uma fintech brasileira fictícia para startups e SaaS. Reunimos Pix, boleto e cartão em uma única API, com webhooks, ledger próprio e rastreabilidade até o banco liquidante.

O protótipo usa dados simulados, não movimenta dinheiro real e não afirma autorização do Banco Central.

## Arquivos

- `assets/logo-horizontal.svg`: logo principal para fundo claro.
- `assets/logo-horizontal-dark.svg`: logo para fundo azul-marinho.
- `assets/logo-mark.svg`: símbolo para capa, avatar ou favicon ampliado.
- `assets/mark-square.svg`: símbolo quadrado para detalhes pequenos.
- `assets/dashboard-real.png`: captura real do dashboard.
- `assets/reconciliation-real.png`: captura real da conciliação.
- `assets/og-card.png`: card visual da marca.

## Identidade visual

| Uso | Cor | HEX |
|---|---|---|
| Fundo | Branco frio | `#F6F7F5` |
| Texto e navegação | Azul profundo | `#111936` |
| Ação e destaque | Roxo Jaraqui | `#6847F5` |
| Estado positivo | Turquesa | `#0FA89A` |
| Destaque claro | Turquesa claro | `#7CE7D6` |
| Alerta | Âmbar | `#E9A23B` |
| Risco crítico | Vermelho | `#D6455D` |
| Borda | Cinza azulado | `#DEE2E8` |

### Tipografia

- Títulos e capa: Bricolage Grotesque, peso 700 ou 800.
- Texto de apoio: Geist, peso 400 a 600.
- Código, IDs e eventos: Geist Mono.

Se a fonte não estiver disponível no PowerPoint, use Arial como substituta. Não estique, incline ou aplique sombra pesada na marca.

## Mensagens aprovadas

### Abertura

**Pix, boleto e cartão. Uma API. Sem novela.**

Pagamentos para startups e SaaS brasileiros, com cobrança, webhook, ledger próprio e conciliação em um só fluxo.

### Problema

**Cobrar é fácil. Fechar a conta é que pega.**

O desafio não termina quando o cliente paga. A operação precisa saber o que foi autorizado, capturado, registrado no ledger, liquidado e conciliado.

### Segurança e riscos

- Ledger próprio reduz a dependência operacional de terceiros.
- O risco principal passa a ser garantir disponibilidade, integridade, backup, recuperação e reconciliação.
- PSP, banco liquidante e nuvem continuam como componentes externos monitorados.
- Idempotência evita cobrança duplicada.
- Webhooks assinados e logs ajudam na rastreabilidade.

### Fechamento

**Uma cobrança inteira, sem esconder o caminho do dinheiro.**

## Roteiro visual sugerido para 10 a 15 minutos

1. Capa com `logo-horizontal-dark.svg` e a promessa principal.
2. Problema: pagamentos entram, mas a conciliação pode falhar.
3. Arquitetura: Jaraqui Pay, PSP, ledger próprio e banco liquidante.
4. Protótipo: usar `dashboard-real.png` para mostrar saldo, aprovação, volume e alertas.
5. Riscos: usar `reconciliation-real.png` para explicar divergências e controles.
6. Controles: MFA, tokenização, idempotência, assinatura de webhook, logs e monitoramento.
7. Limites: protótipo acadêmico, dados fictícios, sem dinheiro real e sem autorização própria do Banco Central.

## Regras rápidas para os slides

- Use azul profundo como base e roxo apenas para ação ou destaque.
- Prefira uma imagem grande e uma ideia por slide.
- Não use números do protótipo como métricas reais de mercado.
- Não diga que a Jaraqui Pay é autorizada pelo Banco Central.
- Não altere a proporção dos logos.
- Em slides escuros, use `logo-horizontal-dark.svg`; em slides claros, use `logo-horizontal.svg`.
