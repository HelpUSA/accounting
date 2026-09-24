import requests
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Script para converter User Access Token em Long-Lived Access Token (60 Dias Renovável)

APP_ID = "1090392855907916"

def generate_long_lived_token(app_secret, short_lived_token):
    url = "https://graph.facebook.com/v19.0/oauth/access_token"
    params = {
        'grant_type': 'fb_exchange_token',
        'client_id': APP_ID,
        'client_secret': app_secret,
        'fb_exchange_token': short_lived_token
    }
    
    res = requests.get(url, params=params)
    data = res.json()
    
    if 'access_token' in data:
        long_token = data['access_token']
        print(f"OK: Token de Longa Duracao (60 dias) gerado com sucesso!")
        print(f"Token: {long_token}")
        
        # Obter Page Access Token permanente
        page_res = requests.get(f"https://graph.facebook.com/v19.0/me/accounts?access_token={long_token}")
        page_data = page_res.json()
        print("\nPaginas e Tokens de Longa Duracao disponiveis:")
        print(json.dumps(page_data, indent=2))
        return long_token
    else:
        print("Erro ao gerar token de longa duracao:", json.dumps(data, indent=2))
        return None

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python scripts/generate_long_lived_token.py <APP_SECRET> <SHORT_TOKEN>")
    else:
        generate_long_lived_token(sys.argv[1], sys.argv[2])

