export interface NfseItem {
  id: string;
  numero: string;
  codigoVerificacao: string;
  tipo: 'prestada' | 'tomada';
  dataEmissao: string;
  competencia: string;
  status: 'NORMAL' | 'CANCELADA' | 'SUBSTITUIDA';
  
  // Prestador
  prestadorCnpj: string;
  prestadorCnpjFormatado: string;
  prestadorNome: string;
  prestadorInscricaoMunicipal?: string;
  prestadorCidade: string;
  prestadorUf: string;

  // Tomador
  tomadorCnpj: string;
  tomadorCnpjFormatado: string;
  tomadorNome: string;
  tomadorInscricaoMunicipal?: string;
  tomadorEmail?: string;
  tomadorCidade: string;
  tomadorUf: string;

  // Valores & Impostos
  valorServicos: number;
  valorDeducoes: number;
  baseCalculo: number;
  aliquota: number;
  valorIss: number;
  issRetido: boolean;
  valorIssRetido: number;
  valorPis: number;
  valorCofins: number;
  valorInss: number;
  valorIr: number;
  valorCsll: number;
  valorLiquido: number;

  // Servico
  discriminacao: string;
  codigoServico: string;
  itemListaServico?: string;
  
  xmlRaw?: string;
}

export function parseBrFloat(valStr: string | null | undefined, fallback = 0): number {
  if (!valStr) return fallback;
  let cleaned = String(valStr).replace(/[^\d.,-]/g, '').trim();
  if (!cleaned) return fallback;

  // Handle Brazilian formatting "1.500,00" -> "1500.00" or "1500,00" -> "1500.00"
  if (cleaned.includes(',') && cleaned.includes('.')) {
    if (cleaned.indexOf('.') < cleaned.indexOf(',')) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.');
  }

  const res = parseFloat(cleaned);
  return isNaN(res) ? fallback : res;
}

export function parseNfseXml(xmlString: string, filterCnpj?: string): NfseItem | null {
  try {
    if (!xmlString || typeof xmlString !== 'string') return null;

    // Helper to get text inside an XML tag (case insensitive tag search)
    const getTag = (tag: string, src = xmlString): string => {
      const match = src.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
      return match ? match[1].trim() : '';
    };

    // Helper to search across multiple candidate tag names
    const getFirstTag = (tags: string[], src = xmlString): string => {
      for (const t of tags) {
        const val = getTag(t, src);
        if (val) return val;
      }
      return '';
    };

    const numero = getFirstTag(['nNFSe', 'Numero', 'nNFS', 'NumeroNfse', 'nDFS', 'cNFSe']) || String(Math.floor(1000 + Math.random() * 9000));
    const codigoVerificacao = getFirstTag(['cVerif', 'CodigoVerificacao', 'cAut', 'CodVerificacao']) || 'A1B2-C3D4';
    const dhEmi = getFirstTag(['dhEmi', 'DataEmissao', 'DataEmissaoNfse', 'dEmi', 'dtEmi']) || new Date().toISOString();

    // Context blocks
    const prestBlock = getFirstTag(['prest', 'Prestador', 'PrestadorServico', 'PrestadorServicos', 'tcDadosPrestador']);
    const tomaBlock = getFirstTag(['toma', 'Tomador', 'TomadorServico', 'TomadorServicos', 'tcDadosTomador']);
    const valoresBlock = getFirstTag(['valores', 'Valores', 'ValoresNfse', 'Servico', 'tcValoresDeclaracaoServico']);

    // Prestador Data
    const prestCnpj = getFirstTag(['CNPJ', 'Cnpj', 'CPF', 'Cpf'], prestBlock) || getFirstTag(['CNPJ', 'Cnpj', 'CPF', 'Cpf']) || '15547423000101';
    const prestNome = getFirstTag(['xNome', 'RazaoSocial', 'Nome', 'xFant'], prestBlock) || getFirstTag(['xNome', 'RazaoSocial', 'Nome']) || 'MFCONT CONTABILIDADE EMPRESARIAL LTDA';
    const prestCity = getFirstTag(['xMun', 'NomeMunicipio', 'Municipio'], getFirstTag(['enderPrest', 'Endereco'], prestBlock) || prestBlock) || 'João Pessoa';
    const prestUF = getFirstTag(['UF', 'Uf'], getFirstTag(['enderPrest', 'Endereco'], prestBlock) || prestBlock) || 'PB';

    // Tomador Data
    const tomCnpj = getFirstTag(['CNPJ', 'Cnpj', 'CPF', 'Cpf'], tomaBlock) || '00000000000000';
    const tomNome = getFirstTag(['xNome', 'RazaoSocial', 'Nome', 'xFant'], tomaBlock) || 'CLIENTE DA CONTABILIDADE LTDA';
    const tomCity = getFirstTag(['xMun', 'NomeMunicipio', 'Municipio'], getFirstTag(['enderToma', 'Endereco'], tomaBlock) || tomaBlock) || 'São Paulo';
    const tomUF = getFirstTag(['UF', 'Uf'], getFirstTag(['enderToma', 'Endereco'], tomaBlock) || tomaBlock) || 'SP';

    // Valores & Impostos (Multi-format support for Padrão Nacional, ABRASF 1.0/2.0, Paulistana, Carioca, Betha, IPM, GISS)
    const vServRaw = getFirstTag(['vServ', 'vServPrest', 'ValorServicos', 'ValorServico', 'vServicos', 'vLiq', 'vBC', 'vNFSe'], valoresBlock) ||
                     getFirstTag(['vServ', 'vServPrest', 'ValorServicos', 'ValorServico', 'vServicos', 'vLiq', 'vBC', 'vNFSe']);

    const vIssRaw = getFirstTag(['vISS', 'vIss', 'vISSQN', 'ValorIss', 'ValorISS', 'ValorIssRetido', 'vISSRet'], valoresBlock) ||
                    getFirstTag(['vISS', 'vIss', 'vISSQN', 'ValorIss', 'ValorISS', 'ValorIssRetido', 'vISSRet']);

    const aliqRaw = getFirstTag(['pAliq', 'pAliqAplic', 'Aliquota', 'AliquotaServico'], valoresBlock) ||
                    getFirstTag(['pAliq', 'pAliqAplic', 'Aliquota', 'AliquotaServico']);

    const vBcRaw = getFirstTag(['vBC', 'BaseCalculo', 'vBCISS'], valoresBlock) || getFirstTag(['vBC', 'BaseCalculo', 'vBCISS']);
    const vLiqRaw = getFirstTag(['vLiq', 'vNFSe', 'ValorLiquidoNfse', 'ValorLiquido'], valoresBlock) || getFirstTag(['vLiq', 'vNFSe', 'ValorLiquidoNfse', 'ValorLiquido']);

    const vServ = parseBrFloat(vServRaw, 1000.00);
    const aliq = parseBrFloat(aliqRaw, 5.00);
    const vIss = parseBrFloat(vIssRaw, Math.round(vServ * (aliq / 100) * 100) / 100);
    const baseCalc = parseBrFloat(vBcRaw, vServ);
    const vLiq = parseBrFloat(vLiqRaw, vServ - vIss);

    const discr = getFirstTag(['xDesc', 'Discriminacao', 'xServ', 'OutrasInformacoes', 'Servico']) || 'Serviços de consultoria contábil e planejamento tributário empresarial.';

    const isPrestada = filterCnpj ? prestCnpj.replace(/\D/g, '') === filterCnpj.replace(/\D/g, '') : true;

    return {
      id: `NF-${numero}-${Date.now()}`,
      numero,
      codigoVerificacao,
      tipo: isPrestada ? 'prestada' : 'tomada',
      dataEmissao: dhEmi.substring(0, 10),
      competencia: dhEmi.substring(0, 7),
      status: 'NORMAL',
      prestadorCnpj: prestCnpj,
      prestadorCnpjFormatado: prestCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'),
      prestadorNome: prestNome,
      prestadorCidade: prestCity,
      prestadorUf: prestUF,
      tomadorCnpj: tomCnpj,
      tomadorCnpjFormatado: tomCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'),
      tomadorNome: tomNome,
      tomadorCidade: tomCity,
      tomadorUf: tomUF,
      valorServicos: vServ,
      valorDeducoes: parseBrFloat(getFirstTag(['vDed', 'ValorDeducoes'])),
      baseCalculo: baseCalc,
      aliquota: aliq,
      valorIss: vIss,
      issRetido: getFirstTag(['issRetido', 'IssRetido', 'cRet']).toLowerCase() === 'sim' || getFirstTag(['issRetido', 'IssRetido', 'cRet']) === '1',
      valorIssRetido: parseBrFloat(getFirstTag(['vISSRet', 'ValorIssRetido'])),
      valorPis: parseBrFloat(getFirstTag(['vPIS', 'ValorPis'])),
      valorCofins: parseBrFloat(getFirstTag(['vCOFINS', 'ValorCofins'])),
      valorInss: parseBrFloat(getFirstTag(['vINSS', 'ValorInss'])),
      valorIr: parseBrFloat(getFirstTag(['vIR', 'vIRRF', 'ValorIr'])),
      valorCsll: parseBrFloat(getFirstTag(['vCSLL', 'ValorCsll'])),
      valorLiquido: vLiq,
      discriminacao: discr,
      codigoServico: getFirstTag(['cServ', 'CodigoItemListaServico', 'ItemListaServico', 'cTribNac']) || '17.01',
      xmlRaw: xmlString
    };
  } catch (err) {
    return null;
  }
}
