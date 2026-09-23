import { NextRequest, NextResponse } from 'next/server';
import { parsePfxCertificate } from '@/lib/cert-engine';
import { queryAdnPortalNacional } from '@/lib/adn-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pfxBase64, passphrase, tipo = 'todas', dataInicio, dataFim } = body;

    if (!pfxBase64) {
      return NextResponse.json(
        { success: false, error: 'Certificado A1 (.pfx) ausente.' },
        { status: 400 }
      );
    }

    const pfxBuffer = Buffer.from(pfxBase64, 'base64');
    const certInfo = parsePfxCertificate(pfxBuffer, passphrase || '');

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
