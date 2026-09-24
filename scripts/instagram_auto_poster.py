import requests
import json
import time
import os
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Configuração da API Oficial do Instagram (Meta Graph API)
# Para obter o INSTAGRAM_ACCOUNT_ID e ACCESS_TOKEN:
# 1. Crie um App no Meta for Developers (https://developers.facebook.com)
# 2. Vincule sua Conta do Instagram Business com uma Página do Facebook.
# 3. Gere o User Access Token com a permissão 'instagram_content_publish'.

INSTAGRAM_ACCOUNT_ID = os.getenv("INSTAGRAM_ACCOUNT_ID", "17841470280295397")
ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN", "EAAPftN7XjkwBSucszOTSMejuurthENaRZCD7fRzNwrqd47vs3XX1kptXGEKcDbu2EcOVVUJKACADaDX7fWFb9dOHVBF3h6180BOwd8dIJIoUncvjU4qViQBdwE4EqZA6OKXuTw3lwlhZBPMxaqYJI6qmCROkaXzz2BDCw2hVuRQr6WhSAnst8GakGau76iZBLa3k5muvd6EjZCQfatjPwPoi6")
BASE_URL = f"https://graph.facebook.com/v19.0/{INSTAGRAM_ACCOUNT_ID}"

POSTS = [
  {
    "image_url": "https://accounting.helpusbr.com/instagram_post_1.jpg",
    "caption": """🚀 CHEGOU O HELPUS ACCOUNTING — 100% GRATUITO!

Chega de sofrer para baixar Nota Fiscal de Serviço (NFS-e) uma por uma!

Conheça a plataforma universal e gratuita para Escritórios de Contabilidade e Empresas.

✅ Baixe todas as NFS-e (Prestadas e Tomadas) em lote
✅ Pacote ZIP com XMLs assinados + DANFSEs em HTML + Planilha Excel (.xlsx)
✅ Sem necessidade de cadastro ou mensalidades
✅ 100% Seguro: Retenção ZERO de chave privada do Certificado A1

👉 Acesse agora mesmo: https://accounting.helpusbr.com

#contabilidade #contador #nfse #gestaofiscal #notaeletronica #certificadodigital #helpusaccounting #fiscal #empresa"""
  },
  {
    "image_url": "https://accounting.helpusbr.com/instagram_post_2.jpg",
    "caption": """🔥 SUITE CONTÁBIL 6 EM 1 TOTALMENTE GRATUITA!

Sua gestão fiscal e financeira completa em um só lugar, acessível por qualquer empresa com Certificado A1:

1️⃣ Módulo NFS-e: Captura e download em lote de notas de serviço
2️⃣ Módulo NF-e: Manifestação do destinatário e download de mercadorias SEFAZ
3️⃣ Módulo CT-e: Controle de fretes e DACTE
4️⃣ Módulo EFD-Reinf: Gerador de lotes XML R-4010 / R-4020
5️⃣ Módulo SPED Fiscal: Conversor para arquivo .txt do PVA
6️⃣ Módulo Conciliação OFX: Importador de extratos bancários

👉 Acesse gratuitamente em: https://accounting.helpusbr.com

#contabilidade #sped #efdreinf #nfe #cte #conciliacaobancaria #contador #empresas #helpusbr"""
  }
]

def publish_post(image_url, caption):
    if INSTAGRAM_ACCOUNT_ID == "SEU_INSTAGRAM_USER_ID":
        print("[DEMO] Chaves da API do Meta Graph API não configuradas. Exibindo simulado:")
        print(f"Postando imagem: {image_url}")
        print(f"Legenda:\n{caption}\n")
        return True

    print(f"Criando contêiner de mídia no Instagram para: {image_url}...")
    container_url = f"{BASE_URL}/media"
    payload = {
        'image_url': image_url,
        'caption': caption,
        'access_token': ACCESS_TOKEN
    }
    
    res = requests.post(container_url, data=payload)
    data = res.json()
    
    if 'id' not in data:
        print("Erro ao criar mídia no Instagram:", data)
        return False
        
    creation_id = data['id']
    print(f"Contêiner criado ID: {creation_id}. Aguardando publicação...")
    time.sleep(10)
    
    publish_url = f"{BASE_URL}/media_publish"
    pub_payload = {
        'creation_id': creation_id,
        'access_token': ACCESS_TOKEN
    }
    
    pub_res = requests.post(publish_url, data=pub_payload)
    pub_data = pub_res.json()
    
    if 'id' in pub_data:
        print(f"🚀 Post publicado com sucesso no Instagram! ID do Post: {pub_data['id']}")
        return True
    else:
        print("Erro ao publicar post:", pub_data)
        return False

if __name__ == "__main__":
    print("--- Automação de Publicação no Instagram (HelpUS Accounting) ---")
    for post in POSTS:
        publish_post(post['image_url'], post['caption'])
        time.sleep(5)
