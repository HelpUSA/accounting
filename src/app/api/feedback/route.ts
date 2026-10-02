import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios ausentes (Nome, E-mail e Mensagem)' },
        { status: 400 }
      );
    }

    const recipient = 'helpus.ecommerce@gmail.com';
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    // SMTP Credentials Configuration
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER || 'helpus.ecommerce@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '';

    let emailSent = false;
    let mailError = null;

    // Method 1: Nodemailer via SMTP if credentials are defined
    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; padding: 24px; border: 1px solid #334155;">
            <div style="border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #fbbf24; margin: 0 0 4px 0; font-size: 20px;">📩 Nova Sugestão / Feedback - HelpUS Accounting</h2>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Recebido via formulário do site em ${timestamp}</p>
            </div>

            <div style="background-color: #1e293b; padding: 16px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #475569;">
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>👤 De / Nome:</strong> ${name}</p>
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>📧 E-mail de Contato:</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: underline;">${email}</a></p>
              <p style="margin: 0; font-size: 14px;"><strong>📌 Categoria / Assunto:</strong> <span style="color: #fbbf24; font-weight: bold;">${subject || 'Sugestão Geral'}</span></p>
            </div>

            <div style="background-color: #020617; padding: 20px; border-radius: 12px; border-left: 4px solid #fbbf24;">
              <h4 style="color: #94a3b8; font-size: 12px; text-transform: uppercase; margin: 0 0 10px 0;">Mensagem / Sugestão de Melhoria:</h4>
              <p style="font-size: 14px; line-height: 1.6; color: #f1f5f9; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #334155; font-size: 11px; color: #64748b; text-align: center;">
              HelpUS Security & Notification Protocol • Responda diretamente a este e-mail para contatar ${email}
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"HelpUS Accounting Feedback" <${smtpUser}>`,
          to: recipient,
          replyTo: email,
          subject: `[HelpUS Accounting] Sugestão: ${subject || name}`,
          html: htmlContent,
        });

        emailSent = true;
      } catch (err: any) {
        console.error('[HelpUS Feedback SMTP Error]:', err.message);
        mailError = err.message;
      }
    }

    // Method 2: Direct HTTP Mail Service Dispatch to helpus.ecommerce@gmail.com
    if (!emailSent) {
      try {
        const fsRes = await fetch('https://formsubmit.co/ajax/helpus.ecommerce@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HelpUS-Accounting/1.0',
            'Referer': 'https://accounting.helpusbr.com/'
          },
          body: JSON.stringify({
            name: `${name} (${email})`,
            email: email,
            _subject: `[HelpUS Accounting - Sugestão] ${subject || 'Feedback'}`,
            _replyto: email,
            _captcha: 'false',
            _template: 'table',
            Assunto: subject || 'Sugestão de Melhoria',
            Remetente: `${name} <${email}>`,
            Mensagem: message,
            DataHora: timestamp
          })
        });

        const fsData = await fsRes.json();
        if (fsRes.ok && (fsData.success === 'true' || fsData.success === true)) {
          emailSent = true;
        } else {
          mailError = fsData.message || 'Aguardando ativação inicial do FormSubmit ou envio SMTP.';
          console.warn('[HelpUS Feedback FormSubmit Notice]:', fsData.message);
        }
      } catch (err: any) {
        console.error('[FormSubmit Dispatch Error]:', err.message);
        mailError = err.message;
      }
    }

    console.log(`[HelpUS Accounting - Feedback Recebido] Para: ${recipient} | De: ${name} (${email}) | Sent: ${emailSent}`);

    return NextResponse.json({
      success: true,
      emailSent,
      message: 'Sugestão enviada com sucesso para helpus.ecommerce@gmail.com!',
      destination: recipient,
      timestamp,
      mailError
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao processar envio de mensagem' },
      { status: 500 }
    );
  }
}
