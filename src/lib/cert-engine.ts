import forge from 'node-forge';

export interface ParsedCertificateInfo {
  valid: boolean;
  cnpj: string;
  cnpjFormatted: string;
  companyName: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  pemKey: string;
  pemCert: string;
  error?: string;
}

export function formatCNPJ(cnpjRaw: string): string {
  const digits = cnpjRaw.replace(/\D/g, '');
  if (digits.length !== 14) return cnpjRaw;
  return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function parsePfxCertificate(pfxBuffer: Buffer, passphrase: string): ParsedCertificateInfo {
  try {
    const pfxDer = forge.util.createBuffer(pfxBuffer.toString('binary'));
    const pfxAsn1 = forge.asn1.fromDer(pfxDer);
    const pfx = forge.pkcs12.pkcs12FromAsn1(pfxAsn1, false, passphrase);

    let pemKey = '';
    let pemCert = '';
    let certObj: forge.pki.Certificate | null = null;

    for (const safeContents of pfx.safeContents) {
      for (const safeBaggage of safeContents.safeBags) {
        if (safeBaggage.key && !pemKey) {
          pemKey = forge.pki.privateKeyToPem(safeBaggage.key);
        }
        if (safeBaggage.cert && !pemCert) {
          pemCert = forge.pki.certificateToPem(safeBaggage.cert);
          certObj = safeBaggage.cert;
        }
      }
    }

    if (!pemKey || !pemCert || !certObj) {
      return {
        valid: false,
        cnpj: '',
        cnpjFormatted: '',
        companyName: '',
        validFrom: '',
        validTo: '',
        daysRemaining: 0,
        pemKey: '',
        pemCert: '',
        error: 'Não foi possível extrair a chave privada e o certificado do arquivo PFX.'
      };
    }

    let rawCNPJ = '';
    let companyName = '';

    // Extract CNPJ & Name from Subject Common Name (CN) or SAN
    const subjectAttrs = certObj.subject.attributes;
    const cnAttr = subjectAttrs.find(a => a.name === 'commonName' || a.shortName === 'CN');
    
    if (cnAttr && typeof cnAttr.value === 'string') {
      const cnValue = cnAttr.value;
      // Typical ICP-Brasil format: "RAZAO SOCIAL DA EMPRESA:15547423000101"
      if (cnValue.includes(':')) {
        const parts = cnValue.split(':');
        companyName = parts[0].trim();
        const possibleCnpj = parts[1].replace(/\D/g, '');
        if (possibleCnpj.length >= 14) {
          rawCNPJ = possibleCnpj.slice(0, 14);
        }
      } else {
        companyName = cnValue.trim();
        // Try regex match for 14 digits in string
        const match = cnValue.match(/\d{14}/);
        if (match) rawCNPJ = match[0];
      }
    }

    // Fallback search in all subject attributes if CNPJ not found
    if (!rawCNPJ) {
      for (const attr of subjectAttrs) {
        if (typeof attr.value === 'string') {
          const match = attr.value.match(/\d{14}/);
          if (match) {
            rawCNPJ = match[0];
            break;
          }
        }
      }
    }

    // Date validation
    const notBefore = certObj.validity.notBefore;
    const notAfter = certObj.validity.notAfter;
    const now = new Date();
    const daysRemaining = Math.ceil((notAfter.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const isValid = daysRemaining > 0 && now >= notBefore;

    return {
      valid: isValid,
      cnpj: rawCNPJ,
      cnpjFormatted: formatCNPJ(rawCNPJ),
      companyName: companyName || 'Empresa Titular do Certificado',
      validFrom: notBefore.toISOString().split('T')[0],
      validTo: notAfter.toISOString().split('T')[0],
      daysRemaining,
      pemKey,
      pemCert
    };
  } catch (err: any) {
    return {
      valid: false,
      cnpj: '',
      cnpjFormatted: '',
      companyName: '',
      validFrom: '',
      validTo: '',
      daysRemaining: 0,
      pemKey: '',
      pemCert: '',
      error: `Falha ao abrir certificado: ${err.message || 'Senha incorreta ou arquivo PFX inválido.'}`
    };
  }
}
