export interface CteItem {
  id: string;
  chave: string;
  numero: string;
  serie: string;
  dataEmissao: string;
  transportadoraNome: string;
  transportadoraCnpj: string;
  remetenteNome: string;
  destinatarioNome: string;
  valorFrete: number;
  valorIcms: number;
  rcto: string;
  xmlRaw: string;
}

export function generateSampleCteList(cnpj: string, companyName: string): CteItem[] {
  const cleanCnpj = cnpj.replace(/\D/g, '') || '00000000000000';
  
  return [
    {
      id: 'cte-1',
      chave: '35260943283811000150570010000123451009876543',
      numero: '012345',
      serie: '1',
      dataEmissao: '2026-09-16',
      transportadoraNome: 'BRASPRESS TRANSPORTES URGENTES LTDA',
      transportadoraCnpj: '48.740.351/0001-65',
      remetenteNome: 'DELL COMPUTADORES DO BRASIL LTDA',
      destinatarioNome: companyName || 'SUA EMPRESA LTDA',
      valorFrete: 450.00,
      valorIcms: 54.00,
      rcto: 'São Paulo/SP -> João Pessoa/PB',
      xmlRaw: `<CTe><infCte Id="CTe35260943283811000150570010000123451009876543"><ide><nCT>012345</nCT><dhEmi>2026-09-16T11:00:00-03:00</dhEmi></ide><vPrest><vTPrest>450.00</vTPrest></vPrest></infCte></CTe>`
    },
    {
      id: 'cte-2',
      chave: '35260918992102000133570010000987651001234567',
      numero: '098765',
      serie: '1',
      dataEmissao: '2026-09-20',
      transportadoraNome: 'JAMEF TRANSPORTES LTDA',
      transportadoraCnpj: '20.147.615/0001-90',
      remetenteNome: 'SANTOS & SILVA DISTRIBUIDORA LTDA',
      destinatarioNome: companyName || 'SUA EMPRESA LTDA',
      valorFrete: 280.50,
      valorIcms: 33.66,
      rcto: 'Campinas/SP -> João Pessoa/PB',
      xmlRaw: `<CTe><infCte Id="CTe35260918992102000133570010000987651001234567"><ide><nCT>098765</nCT><dhEmi>2026-09-20T16:20:00-03:00</dhEmi></ide><vPrest><vTPrest>280.50</vTPrest></vPrest></infCte></CTe>`
    }
  ];
}

export function generateDacteHtml(item: CteItem): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>DACTE - CT-e Nº ${item.numero}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; font-size: 12px; color: #111; }
        .header { border: 2px solid #000; padding: 10px; text-align: center; margin-bottom: 10px; }
        .title { font-size: 16px; font-weight: bold; }
        .box { border: 1px solid #000; padding: 8px; margin-bottom: 8px; }
        .grid { display: flex; justify-content: space-between; }
        .bold { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">DACTE - DOCUMENTO AUXILIAR DO CONHECIMENTO DE TRANSPORTE ELETRÔNICO</div>
        <div>Nº ${item.numero} - SÉRIE ${item.serie}</div>
        <div style="margin-top: 5px; font-family: monospace; font-size: 11px;">CHAVE DE ACESSO: ${item.chave}</div>
      </div>
      <div class="box">
        <div class="bold">TRANSPORTADOR</div>
        <div>${item.transportadoraNome} - CNPJ: ${item.transportadoraCnpj}</div>
      </div>
      <div class="box">
        <div class="bold">ROTA DE TRANSPORTE</div>
        <div>${item.rcto}</div>
      </div>
      <div class="box">
        <div class="bold">REMETENTE E DESTINATÁRIO</div>
        <div>Remetente: ${item.remetenteNome}</div>
        <div>Destinatário: ${item.destinatarioNome}</div>
      </div>
      <div class="box">
        <div class="bold">VALOR DO SERVIÇO DE FRETE</div>
        <div class="grid">
          <span>VALOR DA PRESTAÇÃO: R$ ${item.valorFrete.toFixed(2)}</span>
          <span>VALOR DO ICMS: R$ ${item.valorIcms.toFixed(2)}</span>
        </div>
      </div>
    </body>
    </html>
  `;
}
