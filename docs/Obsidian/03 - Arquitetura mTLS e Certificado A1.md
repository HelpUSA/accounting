---
title: "03 - Arquitetura mTLS e Certificado A1"
created: 2026-09-23
tags: [arquitetura, mtls, seguranca, certificado-a1, nodejs]
---

# Arquitetura mTLS e Segurança do Certificado A1

O **HelpUS Accounting** utiliza comunicação mTLS (Mutual Transport Layer Security) de alta segurança para se conectar ao Ambiente de Distribuição Nacional (ADN) da Receita Federal e aos webservices municipais.

## 📌 Links Relacionados
- [[01 - Visao Geral]]
- [[02 - Manual do Usuario]]
- [[04 - Roadmap e Futuras Funcionalidades]]

---

## 🔒 Fluxo de Autenticação Efêmera

1. **Upload do Buffer PFX**: O arquivo `.pfx` é enviado via HTTPS TLS 1.3 codificado em Base64 na requisição POST.
2. **Extração na Memória**: A API backend (`/api/nfse/cert-info` e `/api/nfse/consultar`) utiliza a biblioteca `forge` (`node-forge`) para decodificar o contêiner PKCS#12 e extrair a chave privada RSA e a cadeia de certificados diretamente no Heap de memória RAM da aplicação.
3. **Agente HTTPS Customizado**: Um `https.Agent` com `cert` e `key` injetados é instanciado pontualmente para efetuar a comunicação mTLS com os endpoints governamentais.
4. **Descarte Imediato**: A chave privada e a senha são liberadas do escopo de execução do garbage collector assim que a requisição é finalizada, **garantindo retenção zero em disco**.
