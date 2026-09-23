import { NfseItem } from './xml-parser';

export function generateDanfseHtml(item: NfseItem): string {
  const isPrestada = item.tipo === 'prestada';
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>DANFSE - Nota Fiscal de Serviço Eletrônica Nº ${item.numero}</title>
  <style>
    body { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; color: #111; }
    .header-box { border: 2px solid #000; padding: 10px; text-align: center; margin-bottom: 10px; background: #f8f9fa; }
    .header-title { font-size: 16px; font-weight: bold; text-transform: uppercase; }
    .header-sub { font-size: 12px; margin-top: 4px; color: #444; }
    .grid-box { border: 1px solid #000; margin-bottom: 10px; }
    .grid-row { display: flex; border-bottom: 1px solid #ccc; }
    .grid-row:last-child { border-bottom: none; }
    .cell { padding: 6px 8px; border-right: 1px solid #ccc; flex: 1; }
    .cell:last-child { border-right: none; }
    .label { font-size: 9px; font-weight: bold; color: #555; text-transform: uppercase; display: block; margin-bottom: 2px; }
    .value { font-size: 11px; font-weight: 600; color: #000; }
    .section-header { background: #e9ecef; font-weight: bold; text-transform: uppercase; padding: 5px 8px; border-bottom: 1px solid #000; font-size: 10px; }
    .discriminacao { min-height: 80px; font-size: 10px; line-height: 1.4; white-space: pre-wrap; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; color: #fff; background: ${isPrestada ? '#16a34a' : '#2563eb'}; }
  </style>
</head>
<body>

  <div class="header-box">
    <div style="float: right;" class="badge">${isPrestada ? 'SERVIÇO PRESTADO' : 'SERVIÇO TOMADO'}</div>
    <div class="header-title">Documento Auxiliar da NFS-e (DANFSE)</div>
    <div class="header-sub">Nota Fiscal de Serviço Eletrônica — Padrão Nacional / ADN</div>
  </div>

  <div class="grid-box">
    <div class="grid-row">
      <div class="cell">
        <span class="label">Número da NFS-e</span>
        <span class="value">${item.numero}</span>
      </div>
      <div class="cell">
        <span class="label">Código de Verificação</span>
        <span class="value">${item.codigoVerificacao}</span>
      </div>
      <div class="cell">
        <span class="label">Data e Hora de Emissão</span>
        <span class="value">${item.dataEmissao}</span>
      </div>
      <div class="cell">
        <span class="label">Competência</span>
        <span class="value">${item.competencia}</span>
      </div>
    </div>
  </div>

  <!-- Prestador -->
  <div class="grid-box">
    <div class="section-header">Prestador de Serviços</div>
    <div class="grid-row">
      <div class="cell" style="flex: 2;">
        <span class="label">Razão Social / Nome</span>
        <span class="value">${item.prestadorNome}</span>
      </div>
      <div class="cell">
        <span class="label">CNPJ / CPF</span>
        <span class="value">${item.prestadorCnpjFormatado}</span>
      </div>
    </div>
    <div class="grid-row">
      <div class="cell">
        <span class="label">Município / UF</span>
        <span class="value">${item.prestadorCidade} / ${item.prestadorUf}</span>
      </div>
    </div>
  </div>

  <!-- Tomador -->
  <div class="grid-box">
    <div class="section-header">Tomador de Serviços</div>
    <div class="grid-row">
      <div class="cell" style="flex: 2;">
        <span class="label">Razão Social / Nome</span>
        <span class="value">${item.tomadorNome}</span>
      </div>
      <div class="cell">
        <span class="label">CNPJ / CPF</span>
        <span class="value">${item.tomadorCnpjFormatado}</span>
      </div>
    </div>
    <div class="grid-row">
      <div class="cell">
        <span class="label">Município / UF</span>
        <span class="value">${item.tomadorCidade} / ${item.tomadorUf}</span>
      </div>
    </div>
  </div>

  <!-- Discriminação dos Serviços -->
  <div class="grid-box">
    <div class="section-header">Discriminação dos Serviços</div>
    <div class="cell discriminacao">
      ${item.discriminacao}
    </div>
  </div>

  <!-- Detalhamento dos Valores -->
  <div class="grid-box">
    <div class="section-header">Detalhamento dos Valores e Impostos</div>
    <div class="grid-row">
      <div class="cell">
        <span class="label">Valor dos Serviços</span>
        <span class="value">R$ ${item.valorServicos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="cell">
        <span class="label">Base de Cálculo</span>
        <span class="value">R$ ${item.baseCalculo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="cell">
        <span class="label">Alíquota</span>
        <span class="value">${item.aliquota.toFixed(2)}%</span>
      </div>
      <div class="cell">
        <span class="label">Valor do ISS</span>
        <span class="value">R$ ${item.valorIss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="cell">
        <span class="label">ISS Retido</span>
        <span class="value">${item.issRetido ? 'SIM' : 'NÃO'}</span>
      </div>
    </div>
    <div class="grid-row">
      <div class="cell">
        <span class="label">PIS (R$)</span>
        <span class="value">${item.valorPis.toFixed(2)}</span>
      </div>
      <div class="cell">
        <span class="label">COFINS (R$)</span>
        <span class="value">${item.valorCofins.toFixed(2)}</span>
      </div>
      <div class="cell">
        <span class="label">INSS (R$)</span>
        <span class="value">${item.valorInss.toFixed(2)}</span>
      </div>
      <div class="cell">
        <span class="label">IR (R$)</span>
        <span class="value">${item.valorIr.toFixed(2)}</span>
      </div>
      <div class="cell">
        <span class="label">Valor Líquido da NFS-e</span>
        <span class="value" style="font-size: 13px; color: #16a34a;">R$ ${item.valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 15px; color: #666; font-size: 9px;">
    Documento gerado eletronicamente por <strong>Fabio Contabilidade — Portal NFS-e National Engine</strong>
  </div>

</body>
</html>`;
}
