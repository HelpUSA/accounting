---
title: "01 - Visão Geral do HelpUS Accounting"
created: 2026-09-23
tags: [helpus, accounting, nfse, mtls, saas]
---

# HelpUS Accounting — Universal NFS-e Suite

O **HelpUS Accounting** é uma plataforma SaaS Multi-Tenant desenvolvida pela **HelpUS Technology** para escritórios de contabilidade e empresas brasileiras.

## 📌 Links Relacionados
- [[02 - Manual do Usuario]]
- [[03 - Arquitetura mTLS e Certificado A1]]
- [[04 - Roadmap e Futuras Funcionalidades]]

## 🎯 Objetivo Principal
Permitir a consulta, gestão e download unificado em lote das **Notas Fiscais de Serviço Eletrônicas (NFS-e)**, cobrindo tanto **Serviços Prestados** quanto **Serviços Tomados**, através do Portal Nacional (ADN — Ambiente de Distribuição Nacional) e prefeituras integradas.

## 🔑 Características Principais
1. **Multi-Tenant Universal**: Qualquer escritório de contabilidade ou empresa pode carregar seu próprio **Certificado Digital A1 (.pfx)** e senha sem a necessidade de cadastros prévios ou chaves hardcoded.
2. **Download em Lote Inteligente**: Exportação combinada em arquivos ZIP contendo:
   - XMLs originais com assinatura digital.
   - DANFSEs (Documento Auxiliar da NFS-e) formatadas em HTML visualizável e para impressão.
   - Relatório resumo em planilha Excel (`.xlsx`) consolidando impostos (ISS, PIS, COFINS, CSLL, IRRF) e tomadores/prestadores.
3. **Internacionalização Trilingue (i18n)**: Suporte completo em Português (PT), Inglês (EN) e Espanhol (ES).
4. **Segurança de Dados (LGPD)**: O processamento do certificado A1 é realizado de forma efêmera em memória durante a requisição, sem qualquer armazenamento de chave privada em disco ou banco de dados.
