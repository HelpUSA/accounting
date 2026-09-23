export interface NfeItem {
  id: string;
  chave: string;
  numero: string;
  serie: string;
  dataEmissao: string;
  emitenteNome: string;
  emitenteCnpj: string;
  destinatarioNome: string;
  destinatarioCnpj: string;
  valorTotal: number;
  valorIcms: number;
  manifestacaoStatus: 'sem_manifesto' | 'ciencia' | 'confirmada';
  tipo: 'entrada' | 'saida';
  xmlRaw: string;
}

export function generateSampleNfeList(cnpj: string, companyName: string): NfeItem[] {
  const cleanCnpj = cnpj.replace(/\D/g, '') || '00000000000000';
  
  return [
    {
      id: 'nfe-1',
      chave: '35260933683111000280550010006991571234567890',
      numero: '699157',
      serie: '1',
      dataEmissao: '2026-09-15',
      emitenteNome: 'DELL COMPUTADORES DO BRASIL LTDA',
      emitenteCnpj: '72.381.189/0001-10',
      destinatarioNome: companyName || 'SUA EMPRESA LTDA',
      destinatarioCnpj: cleanCnpj,
      valorTotal: 8450.00,
      valorIcms: 1014.00,
      manifestacaoStatus: 'confirmada',
      tipo: 'entrada',
      xmlRaw: `<NFe><infNFe Id="NFe35260933683111000280550010006991571234567890"><ide><nNF>699157</nNF><dhEmi>2026-09-15T10:00:00-03:00</dhEmi></ide><total><ICMSTot><vNF>8450.00</vNF><vICMS>1014.00</vICMS></ICMSTot></total></infNFe></NFe>`
    },
    {
      id: 'nfe-2',
      chave: '35260915547423000101550010007292589876543210',
      numero: '729258',
      serie: '1',
      dataEmissao: '2026-09-18',
      emitenteNome: 'KALUNGA COMERCIO E SUPRIMENTOS LTDA',
      emitenteCnpj: '43.283.811/0001-50',
      destinatarioNome: companyName || 'SUA EMPRESA LTDA',
      destinatarioCnpj: cleanCnpj,
      valorTotal: 1250.30,
      valorIcms: 225.05,
      manifestacaoStatus: 'ciencia',
      tipo: 'entrada',
      xmlRaw: `<NFe><infNFe Id="NFe35260915547423000101550010007292589876543210"><ide><nNF>729258</nNF><dhEmi>2026-09-18T14:30:00-03:00</dhEmi></ide><total><ICMSTot><vNF>1250.30</vNF><vICMS>225.05</vICMS></ICMSTot></total></infNFe></NFe>`
    },
    {
      id: 'nfe-3',
      chave: '35260998765432000199550010007505341122334455',
      numero: '750534',
      serie: '1',
      dataEmissao: '2026-09-21',
      emitenteNome: 'SANTOS & SILVA DISTRIBUIDORA DE PAPEL LTDA',
      emitenteCnpj: '18.992.102/0001-33',
      destinatarioNome: companyName || 'SUA EMPRESA LTDA',
      destinatarioCnpj: cleanCnpj,
      valorTotal: 3490.00,
      valorIcms: 628.20,
      manifestacaoStatus: 'sem_manifesto',
      tipo: 'entrada',
      xmlRaw: `<NFe><infNFe Id="NFe35260998765432000199550010007505341122334455"><ide><nNF>750534</nNF><dhEmi>2026-09-21T09:15:00-03:00</dhEmi></ide><total><ICMSTot><vNF>3490.00</vNF><vICMS>628.20</vICMS></ICMSTot></total></infNFe></NFe>`
    }
  ];
}

export function generateDanfeHtml(item: NfeItem): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>DANFE - NF-e Nº ${item.numero}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; font-size: 12px; color: #111; }
        .header { border: 2px solid #000; padding: 10px; text-align: center; margin-bottom: 10px; }
        .title { font-size: 16px; font-weight: bold; }
        .box { border: 1px solid #000; padding: 8px; margin-bottom: 8px; }
        .grid { display: flex; justify-content: space-between; }
        .bold { font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 5px; text-align: left; }
        th { background: #f0f0f0; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">DANFE - DOCUMENTO AUXILIAR DA NOTA FISCAL ELETRÔNICA</div>
        <div>Nº ${item.numero} - SÉRIE ${item.serie}</div>
        <div style="margin-top: 5px; font-family: monospace; font-size: 11px;">CHAVE DE ACESSO: ${item.chave}</div>
      </div>
      <div class="box">
        <div class="bold">EMITENTE</div>
        <div>${item.emitenteNome} - CNPJ: ${item.emitenteCnpj}</div>
      </div>
      <div class="box">
        <div class="bold">DESTINATÁRIO / REMETENTE</div>
        <div>${item.destinatarioNome} - CNPJ: ${item.destinatarioCnpj}</div>
        <div>Data Emissão: ${item.dataEmissao}</div>
      </div>
      <div class="box">
        <div class="bold">CÁLCULO DO IMPOSTO</div>
        <div class="grid">
          <span>VALOR TOTAL DA NF-E: R$ ${item.valorTotal.toFixed(2)}</span>
          <span>VALOR DO ICMS: R$ ${item.valorIcms.toFixed(2)}</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição do Produto / Serviço</th>
            <th>Qtd</th>
            <th>Vl. Unit</th>
            <th>Vl. Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>AQUISIÇÃO DE EQUIPAMENTOS E MATERIAIS PARA REVENDA / USO</td>
            <td>1</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;
}
