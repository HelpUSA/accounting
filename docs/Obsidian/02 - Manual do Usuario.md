---
title: "02 - Manual do Usuário"
created: 2026-09-23
tags: [manual, tutorial, passo-a-passo, usuario]
---

# Manual do Usuário — HelpUS Accounting

Este guia passo a passo orienta sobre como utilizar o módulo de NFS-e da plataforma **HelpUS Accounting**.

## 📌 Links Relacionados
- [[01 - Visao Geral]]
- [[03 - Arquitetura mTLS e Certificado A1]]
- [[04 - Roadmap e Futuras Funcionalidades]]

---

## 🚀 Passo 1: Seleção do Certificado Digital A1

1. Acesse o portal em [https://accounting.helpusbr.com](https://accounting.helpusbr.com).
2. Na seção **Conexão com Certificado Digital A1**, clique na área de upload ou arraste o arquivo do certificado digital da empresa (arquivo com extensão `.pfx` ou `.p12`).
3. Digite a **Senha da Chave Privada** do certificado digital.
4. Clique em **Autenticar & Conectar**.

---

## 🔍 Passo 2: Consulta e Visualização das Notas

Após a autenticação bem-sucedida:
1. O sistema validará a validade do certificado (CNPJ, Razão Social e dias restantes de validade).
2. O sistema consultará automaticamente o ADN (Portal Nacional) e prefeituras associadas.
3. As notas serão exibidas no painel com contadores KPI (Total Prestado, Total Tomado, ISS Apurado e Quantidade de Notas).
4. Utilize os filtros **Todas**, **Prestadas** ou **Tomadas** e o campo de pesquisa por CNPJ, Nome ou Número de Nota.

---

## 📄 Passo 3: Pré-visualização de DANFSE e XML

1. Clique no ícone de olho 👁️ em qualquer linha da tabela para abrir o modal de pré-visualização.
2. Alterne entre as abas **DANFSE** (espelho visual da nota para impressão) e **XML** (código XML original assinado).

---

## 📦 Passo 4: Download em Lote (ZIP e Excel)

1. Marque as caixas de seleção das notas desejadas (ou selecione todas no cabeçalho da tabela).
2. Clique no botão **Baixar Selecionadas (.ZIP)** para fazer o download do pacote completo contendo XMLs, DANFSEs em HTML e a planilha Excel.
3. Clique em **Exportar Excel (.xlsx)** para baixar exclusivamente a planilha financeira consolidada.
