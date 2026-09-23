import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { parsePfxCertificate } from '@/lib/cert-engine';
import { queryAdnPortalNacional } from '@/lib/adn-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pfxBase64, passphrase, usePresetFabio, tipo = 'todas', dataInicio, dataFim } = body;

    let pfxBuffer: Buffer | null = null;
    let pwd = passphrase || '';

    if (usePresetFabio) {
      const fabioPath = `d:\\Documents\\OneDrive\\Pessoas\\Fabio Contador\\MFCONT CONTABILIDADE EMPRESARIAL LTDA_15547423000101- senha mfcont01.pfx`;
      if (fs.existsSync(fabioPath)) {
        pfxBuffer = fs.readFileSync(fabioPath);
        pwd = 'mfcont01';
      }
    } else if (pfxBase64) {
      pfxBuffer = Buffer.from(pfxBase64, 'base64');
    }

    if (!pfxBuffer) {
      return NextResponse.json(
        { success: false, error: 'Certificado A1 inválido ou ausente.' },
        { status: 400 }
      );
    }

    const certInfo = parsePfxCertificate(pfxBuffer, pwd);
    if (!certInfo.valid || !certInfo.pemKey || !certInfo.pemCert) {
      return NextResponse.json(
        { success: false, error: certInfo.error || 'Certificado digital A1 inválido ou expirado.' },
        { status: 400 }
      );
    }

    const queryResult = await queryAdnPortalNacional(
      certInfo.pemKey,
      certInfo.pemCert,
      {
        cnpj: certInfo.cnpj,
        tipo,
        dataInicio,
        dataFim
      },
      certInfo.companyName
    );

    return NextResponse.json({
      success: true,
      cert: {
        cnpj: certInfo.cnpj,
        cnpjFormatted: certInfo.cnpjFormatted,
        companyName: certInfo.companyName,
        validTo: certInfo.validTo,
        daysRemaining: certInfo.daysRemaining
      },
      queryResult
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao realizar consulta de NFS-e.' },
      { status: 500 }
    );
  }
}
