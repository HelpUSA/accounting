import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN || 'helpus_accounting_secret_token_2026';
const PAGE_ACCESS_TOKEN = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN || 'EAAPftN7XjkwBSucszOTSMejuurthENaRZCD7fRzNwrqd47vs3XX1kptXGEKcDbu2EcOVVUJKACADaDX7fWFb9dOHVBF3h6180BOwd8dIJIoUncvjU4qViQBdwE4EqZA6OKXuTw3lwlhZBPMxaqYJI6qmCROkaXzz2BDCw2hVuRQr6WhSAnst8GakGau76iZBLa3k5muvd6EjZCQfatjPwPoi6';

/**
 * Meta Webhook Verification (GET)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Instagram Webhook] Token de verificação validado com sucesso!');
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Token de verificação inválido.' }, { status: 403 });
}

/**
 * Meta Webhook Event Handler (POST) - Resposta Automática no Direct ao comentar nos posts
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[Instagram Webhook Event Received]:', JSON.stringify(body, null, 2));

    if (body.object === 'page' || body.object === 'instagram') {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];
        const messaging = entry.messaging || [];

        // 1. Comentários no Instagram (Private Reply via comment_id)
        for (const change of changes) {
          const val = change.value || {};
          const commentId = val.id;
          const senderId = val.from?.id || val.sender?.id;

          if (commentId || senderId) {
            console.log(`[Instagram Webhook] Comentário/evento detectado: "${val.text}" (Comment ID: ${commentId})`);
            await sendPrivateReplyOrDirect(senderId, commentId);
          }
        }

        // 2. DMs diretas recebidas
        for (const msg of messaging) {
          const senderId = msg.sender?.id;
          const text = msg.message?.text;
          if (senderId && text) {
            console.log(`[Instagram Webhook] DM direta recebida de ${senderId}: "${text}"`);
            await sendDirectMessage(senderId);
          }
        }
      }

      return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
    }

    return NextResponse.json({ status: 'IGNORED' }, { status: 200 });
  } catch (err: any) {
    console.error('[Instagram Webhook Error]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function sendPrivateReplyOrDirect(senderId?: string, commentId?: string) {
  const textMessage = `🚀 Olá! Seja bem-vindo ao HelpUS Accounting!\n\nConheça nossa suíte contábil 100% gratuita para consulta e download em lote de NFS-e, NF-e, CT-e, EFD-Reinf, SPED e Conciliação OFX:\n\n🌐 Portal de Acesso Gratuito:\nhttps://accounting.helpusbr.com\n\n💬 Falar no WhatsApp com a equipe:\nhttps://wa.me/5583998721848?text=Ol%C3%A1%2C%20vim%20pelo%20Instagram%20e%20gostaria%20de%20ajuda%20com%20o%20HelpUS%20Accounting`;

  if (commentId) {
    try {
      const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
      const payload = {
        recipient: { comment_id: commentId },
        message: { text: textMessage }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log('[Instagram Webhook] Private Reply via comment_id:', data);
      if (data.message_id || data.recipient_id) return;
    } catch (e) {
      console.error('[Instagram Private Reply Error]', e);
    }
  }

  if (senderId) {
    await sendDirectMessage(senderId);
  }
}

async function sendDirectMessage(recipientId: string) {
  try {
    const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    const textMessage = `🚀 Olá! Seja bem-vindo ao HelpUS Accounting!\n\nConheça nossa suíte contábil 100% gratuita para consulta e download em lote de NFS-e, NF-e, CT-e, EFD-Reinf, SPED e Conciliação OFX:\n\n🌐 Portal de Acesso Gratuito:\nhttps://accounting.helpusbr.com\n\n💬 Falar no WhatsApp com a equipe:\nhttps://wa.me/5583998721848?text=Ol%C3%A1%2C%20vim%20pelo%20Instagram%20e%20gostaria%20de%20ajuda%20com%20o%20HelpUS%20Accounting`;
    const payload = {
      recipient: { id: recipientId },
      message: { text: textMessage }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('[Instagram Webhook] Resposta de envio de Direct:', data);
  } catch (err) {
    console.error('[Instagram Direct Error]', err);
  }
}
