---
title: "04 - Arquitetura Universal dos Futuros Módulos Contábeis"
created: 2026-09-23
tags: [roadmap, arquitetura-universal, nfe, cte, efd-reinf, sped, conciliacao]
---

# Arquitetura Universal e Multi-Tenant dos Futuros Módulos

A filosofia central do **HelpUS Accounting** é o **Zero-Lock-In e Acesso Universal sem Barreiras**: qualquer usuário (empresário, MEI, diretor financeiro, assistente fiscal ou contador) pode utilizar todas as ferramentas sem necessidade de configurações complexas, cadastros prévios ou infraestrutura dedicada.

## 📌 Links Relacionados
- [[01 - Visao Geral]]
- [[02 - Manual do Usuario]]
- [[03 - Arquitetura mTLS e Certificado A1]]

---

## 💡 Como os Novos Módulos Funcionarão de Forma Universal

### 1. Módulo NF-e de Produto (Mercadorias - SEFAZ Nacional)
- **Modo de Uso**: O usuário insere o Certificado A1 (.pfx) da sua empresa e a senha.
- **Mecanismo**: A API conecta-se ao webservice `nfeDistribuicaoDFe` da SEFAZ Nacional. O sistema consulta automaticamente todas as NF-e emitidas contra o CNPJ da empresa nos últimos 90 dias via NSU.
- **Ação com 1 Clique**: O usuário pode realizar a **Manifestação do Destinatário** (Ciência da Operação / Confirmação) diretamente na tela para liberar o download do XML completo e DANFE em PDF.

### 2. Módulo CT-e (Conhecimentos de Transporte - SEFAZ)
- **Modo de Uso**: Utiliza a mesma autenticação por Certificado A1.
- **Mecanismo**: Conexão com `cteDistribuicaoDFe`. Baixa automaticamente todos os conhecimentos de frete emitidos para acobertar o transporte de mercadorias da empresa, gerando o DACTE e relatório consolidado de custos de logística.

### 3. Módulo EFD-Reinf (Gerador de Eventos R-4010 / R-4020)
- **Modo de Uso**: Baseia-se nas notas fiscais tomadas e prestadas já capturadas ou enviadas por upload.
- **Mecanismo**: O sistema lê os valores de retenção de tributos federais (IRRF, PIS, COFINS, CSLL) e gera os arquivos XML de lote nos esquemas oficiais do SPED EFD-Reinf.
- **Envio Direto**: O usuário pode baixar os arquivos XML para o seu sistema contábil ou transmitir diretamente para o ambiente da Receita Federal via mTLS usando o mesmo certificado A1.

### 4. Módulo SPED Fiscal / EFD ICMS IPI
- **Modo de Uso**: O usuário importa ou seleciona o conjunto de notas do mês.
- **Mecanismo**: O motor converte automaticamente a estrutura dos XMLs de NF-e e CT-e no formato texto normatizado do SPED (`.txt` com blocos 0, C, D, E, 1, 9).
- **Validação**: Arquivo pronto para importação direta no PVA (Programa Validador e Assinador da Receita Federal).

### 5. Módulo de Conciliação Bancária & Financeira
- **Modo de Uso**: O usuário arrasta o extrato bancário (arquivo `.OFX` ou `.CSV`) exportado do seu internet banking (Itaú, Bradesco, Banco do Brasil, Santander, Nubank, Inter, Caixa, etc.).
- **Mecanismo**: O algoritmo cruza os lançamentos bancários (entradas e saídas) com o valor bruto e datas das NFS-e / NF-e prestadas e tomadas.
- **Resultado**: Aponta inconsistências, notas abertas não pagas e relatórios de fluxo de caixa em Excel em menos de 5 segundos.
