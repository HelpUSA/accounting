const nodemailer = require('nodemailer');

// Configuração do Transporter SMTP do Gmail (HelpUS Accounting)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'helpus.ecommerce@gmail.com',
    pass: process.env.SMTP_PASS || 'wanorsuyyefzgaec',
  },
});

// Lista Expandida e Atualizada de Escritórios de Contabilidade e Contadores no Brasil
const targetEmails = [
  { name: 'Equipe HelpUS', email: 'helpus.ecommerce@gmail.com', office: 'HelpUS Accounting' },
  { name: 'Atendimento Contábil', email: 'contato@contabilidade.com.br', office: 'Contabilidade Brasil' },
  { name: 'Contato Fiscal', email: 'atendimento@contabil.com.br', office: 'Escritório Contábil' },
  { name: 'Setor Fiscal', email: 'fiscal@contabilidadeonline.com.br', office: 'Contabilidade Online' },
  { name: 'Comercial Contábil', email: 'contato@confirp.com.br', office: 'Confirp Consultoria Contábil' },
  { name: 'Atendimento Contábil', email: 'contato@octacontabilidade.com.br', office: 'Octa Contabilidade' },
  { name: 'Contato Comercial', email: 'contato@agilize.com.br', office: 'Agilize Contabilidade' },
  { name: 'Contato Contabilidade', email: 'contato@senhorcontabil.com.br', office: 'Senhor Contábil' },
  { name: 'Atendimento Fiscal', email: 'falecom@conube.com.br', office: 'Conube Contabilidade Online' },
  { name: 'Atendimento MEI/Contábil', email: 'contato@meumeicontabilidade.com.br', office: 'Meu MEI Contabilidade' },
  { name: 'Contato Contábil', email: 'contato@contabilizei.com.br', office: 'Contabilizei' },
  { name: 'Atendimento Fiscal', email: 'contato@osayk.com.br', office: 'Osayk Contabilidade' },
  { name: 'Equipe de Atendimento', email: 'contato@webcontabil.com.br', office: 'Web Contábil' },
  { name: 'Contato Gestão Fiscal', email: 'contato@facilite.co', office: 'Facilite Contabilidade' },
  { name: 'Atendimento Contábil', email: 'contato@contabilnet.com.br', office: 'ContabilNet' }
];

const subject = '[Contabilidade] Chega de baixar NFS-e uma a uma: Conheça a ferramenta 100% Gratuita!';

const getHtmlContent = (recipientName) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HelpUS Accounting - Download de NFS-e Grátis</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: Arial, Helvetica, sans-serif; color: #f8fafc;">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 20px 0;">
    <tr>
      <td align="center">
        
        <!-- Container Principal -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #0f172a; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          
          <!-- Cabeçalho / Banner Topo -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 28px 24px; text-align: center; border-bottom: 2px solid #fbbf24;">
              <span style="background-color: #fbbf24; color: #020617; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">NOVIDADE 100% GRATUITA</span>
              <h1 style="color: #ffffff; font-size: 24px; margin: 16px 0 6px 0; font-weight: 800;">HELPUS <span style="color: #fbbf24;">ACCOUNTING</span></h1>
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">A solução definitiva para busca e download de NFS-e no Brasil</p>
            </td>
          </tr>

          <!-- Imagem da Postagem do Instagram -->
          <tr>
            <td align="center" style="padding: 20px; background-color: #020617;">
              <a href="https://accounting.helpusbr.com" target="_blank" style="text-decoration: none;">
                <img src="https://accounting.helpusbr.com/images/instagram_post_nfse.png" alt="Baixe NFS-e Grátis em Lote - HelpUS Accounting" style="width: 100%; max-width: 580px; height: auto; border-radius: 12px; border: 1px solid #334155; display: block;">
              </a>
            </td>
          </tr>

          <!-- Corpo do Texto -->
          <tr>
            <td style="padding: 24px 28px;">
              <h2 style="color: #fbbf24; font-size: 19px; margin-top: 0; font-weight: 700;">Olá${recipientName ? `, ${recipientName}` : ''}! Chega de sofrer baixando Nota Fiscal de Serviço uma por uma! 🚀</h2>
              
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
                Sabemos o quanto a rotina fiscal de um escritório de contabilidade é corrida. Perder horas acessando portais prefeiturais individualmente para obter arquivos de <strong>NFS-e (Prestadas e Tomadas)</strong> de cada cliente é coisa do passado.
              </p>

              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
                O <strong>HelpUS Accounting</strong> foi desenvolvido especialmente para economizar seu tempo e automatizar o fechamento mensal da sua equipe!
              </p>

              <!-- Destaques dos Recursos -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #334155;">
                <tr>
                  <td>
                    <h3 style="color: #38bdf8; font-size: 16px; margin: 0 0 14px 0;">O que o HelpUS Accounting faz por você:</h3>
                    
                    <div style="margin-bottom: 10px; font-size: 14px; color: #f1f5f9;">
                      ✅ <strong>Download de NFS-e em Lote</strong>: Notas Prestadas e Tomadas capturadas com agilidade.
                    </div>
                    <div style="margin-bottom: 10px; font-size: 14px; color: #f1f5f9;">
                      ✅ <strong>Pacote Completo em ZIP</strong>: Baixe arquivos XMLs assinados + DANFSEs formatadas em HTML.
                    </div>
                    <div style="margin-bottom: 10px; font-size: 14px; color: #f1f5f9;">
                      ✅ <strong>Relatório em Planilha Excel (.xlsx)</strong>: Resumo pronto com tomador, prestador, valores, retenções e tributos.
                    </div>
                    <div style="margin-bottom: 0; font-size: 14px; color: #f1f5f9;">
                      🔒 <strong>100% Seguro & Sem Cadastro</strong>: O Certificado A1 é processado localmente no seu navegador. Nenhuma senha ou certificado fica salvo em servidor.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Chamadas para Ação (Botões) -->
              <div style="text-align: center; margin: 28px 0;">
                
                <!-- Botão 1: Acessar Plataforma -->
                <a href="https://accounting.helpusbr.com" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); color: #020617; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 8px; margin-bottom: 14px; width: 80%; box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);">
                  💻 ACESSAR O HELPUS ACCOUNTING AGORA (GRÁTIS)
                </a>

                <br>

                <!-- Botão 2: Instagram -->
                <a href="https://www.instagram.com/helpus.ecommerce" target="_blank" style="display: inline-block; background-color: #833ab4; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 11px 22px; border-radius: 8px; margin-bottom: 12px; width: 75%;">
                  📸 Siga nosso Instagram (@helpus.ecommerce)
                </a>

                <br>

                <!-- Botão 3: Site Principal HelpUS -->
                <a href="https://helpusbr.com" target="_blank" style="display: inline-block; background-color: #334155; color: #38bdf8; font-size: 13px; font-weight: bold; text-decoration: none; padding: 10px 22px; border-radius: 8px; width: 75%; border: 1px solid #475569;">
                  🌐 Conheça o Portal Principal HelpUS (helpusbr.com)
                </a>

              </div>

            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td style="background-color: #020617; padding: 20px; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
              <p style="margin: 0 0 6px 0;">HelpUS Accounting • Soluções Inteligentes para Contabilidade</p>
              <p style="margin: 0 0 10px 0;">E-mail oficial: <a href="mailto:helpus.ecommerce@gmail.com" style="color: #94a3b8; text-decoration: underline;">helpus.ecommerce@gmail.com</a> | Site: <a href="https://helpusbr.com" style="color: #38bdf8; text-decoration: underline;">helpusbr.com</a></p>
              <p style="margin: 0; font-size: 11px; color: #475569;">Você recebeu esta mensagem institucional como profissional ou escritório contábil. Caso não queira receber nossas atualizações, responda com "Descadastrar".</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

async function sendOutreachCampaign() {
  console.log(`🚀 Iniciando Campanha de Divulgação HelpUS Accounting (Domínio Oficial: helpusbr.com)...`);
  console.log(`📬 Total de destinatários na lista: ${targetEmails.length}`);
  
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < targetEmails.length; i++) {
    const recipient = targetEmails[i];
    console.log(`\n[${i + 1}/${targetEmails.length}] Enviando para: ${recipient.office} <${recipient.email}>...`);

    try {
      const info = await transporter.sendMail({
        from: '"HelpUS Accounting" <helpus.ecommerce@gmail.com>',
        to: recipient.email,
        replyTo: 'helpus.ecommerce@gmail.com',
        subject: subject,
        html: getHtmlContent(recipient.name),
      });

      console.log(`  ✅ Enviado com sucesso! Message ID: ${info.messageId}`);
      successCount++;
    } catch (err) {
      console.error(`  ❌ Erro ao enviar para ${recipient.email}:`, err.message);
      errorCount++;
    }

    // Intervalo de segurança entre disparos para respeitar limites SMTP
    if (i < targetEmails.length - 1) {
      console.log('  ⏳ Aguardando 2 segundos para o próximo disparo...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n==============================================`);
  console.log(`🎉 Campanha concluída com o domínio corrigido (helpusbr.com)!`);
  console.log(`  - Enviados com Sucesso: ${successCount}`);
  console.log(`  - Erros: ${errorCount}`);
  console.log(`==============================================\n`);
}

sendOutreachCampaign();
