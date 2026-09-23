import { NextRequest, NextResponse } from 'next/server';
import { parseOfxOrCsvContent } from '@/lib/ofx-parser';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileContent = '' } = body;

    const summary = parseOfxOrCsvContent(fileContent);

    return NextResponse.json({
      success: true,
      summary
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao processar extrato bancário.' },
      { status: 500 }
    );
  }
}
