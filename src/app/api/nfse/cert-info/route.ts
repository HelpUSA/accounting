import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parsePfxCertificate } from '@/lib/cert-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pfxBase64, passphrase, usePresetFabio } = body;

    let pfxBuffer: Buffer | null = null;
    let pwd = passphrase || '';

    if (usePresetFabio) {
      const fabioPath = `d:\\Documents\\OneDrive\\Pessoas\\Fabio Contador\\MFCONT CONTABILIDADE EMPRESARIAL LTDA_15547423000101- senha mfcont01.pfx`;
      if (fs.existsSync(fabioPath)) {
        pfxBuffer = fs.readFileSync(fabioPath);
        pwd = 'mfcont01';
      } else {
        return NextResponse.json(
          { success: false, error: 'Arquivo do certificado pré-configurado do Fábio não foi encontrado no caminho especificado.' },
          { status: 404 }
        );
      }
    } else if (pfxBase64) {
      pfxBuffer = Buffer.from(pfxBase64, 'base64');
    } else {
      return NextResponse.json(
        { success: false, error: 'Envie um arquivo PFX (base64) ou selecione o certificado do Fábio.' },
        { status: 400 }
      );
    }

    const certInfo = parsePfxCertificate(pfxBuffer, pwd);
    
    // Do not return raw PEM keys to client for security, return parsed metadata
    return NextResponse.json({
      success: certInfo.valid,
      cert: {
        cnpj: certInfo.cnpj,
        cnpjFormatted: certInfo.cnpjFormatted,
        companyName: certInfo.companyName,
        validFrom: certInfo.validFrom,
        validTo: certInfo.validTo,
        daysRemaining: certInfo.daysRemaining,
        valid: certInfo.valid
      },
      error: certInfo.error
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao processar certificado PFX' },
      { status: 500 }
    );
  }
}
