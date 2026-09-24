import { NextRequest, NextResponse } from 'next/server';
import { INSTAGRAM_CATALOG } from '@/lib/instagram-catalog';

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841470280295397';
const PAGE_ACCESS_TOKEN = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN || 'EAAPftN7XjkwBSucszOTSMejuurthENaRZCD7fRzNwrqd47vs3XX1kptXGEKcDbu2EcOVVUJKACADaDX7fWFb9dOHVBF3h6180BOwd8dIJIoUncvjU4qViQBdwE4EqZA6OKXuTw3lwlhZBPMxaqYJI6qmCROkaXzz2BDCw2hVuRQr6WhSAnst8GakGau76iZBLa3k5muvd6EjZCQfatjPwPoi6';
const CRON_SECRET = process.env.CRON_SECRET || 'helpus_cron_secret_2026';

/**
 * Cloud Cron Endpoint for Autonomous Instagram Post Publishing
 * Triggered automatically by Vercel Cron or manual GET with ?secret=...
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Security Verification
    if (secret !== CRON_SECRET && req.headers.get('authorization') !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    // Determine post index using deterministic modulo based on current day count
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const postIndex = daysSinceEpoch % INSTAGRAM_CATALOG.length;
    const post = INSTAGRAM_CATALOG[postIndex];

    const host = req.headers.get('host') || 'accounting.helpusbr.com';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const imageUrl = `${protocol}://${host}/posts/${post.imageFileName}`;

    console.log(`[Vercel Cron] Publicando Post #${post.id} (${post.title}) na Meta Graph API...`);
    console.log(`[Vercel Cron] Image URL: ${imageUrl}`);

    // Step 1: Create Container on Instagram
    const containerUrl = `https://graph.facebook.com/v19.0/${INSTAGRAM_ACCOUNT_ID}/media`;
    const containerPayload = new URLSearchParams({
      image_url: imageUrl,
      caption: post.caption,
      access_token: PAGE_ACCESS_TOKEN
    });

    const containerRes = await fetch(containerUrl, {
      method: 'POST',
      body: containerPayload
    });
    const containerData = await containerRes.json();

    if (!containerData.id) {
      console.error('[Vercel Cron Error] Falha ao criar contêiner de mídia:', containerData);
      return NextResponse.json({ error: 'Falha ao criar contêiner', details: containerData }, { status: 500 });
    }

    const creationId = containerData.id;

    // Brief pause before publishing
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Step 2: Publish Container on Instagram
    const publishUrl = `https://graph.facebook.com/v19.0/${INSTAGRAM_ACCOUNT_ID}/media_publish`;
    const publishPayload = new URLSearchParams({
      creation_id: creationId,
      access_token: PAGE_ACCESS_TOKEN
    });

    const publishRes = await fetch(publishUrl, {
      method: 'POST',
      body: publishPayload
    });
    const publishData = await publishRes.json();

    if (publishData.id) {
      console.log(`[Vercel Cron Success] Post publicado no Instagram com ID: ${publishData.id}`);
      return NextResponse.json({
        status: 'SUCCESS',
        publishedPostId: publishData.id,
        postCatalogId: post.id,
        postTitle: post.title,
        triggerKeyword: post.triggerKeyword,
        publishedAt: new Date().toISOString()
      });
    }

    return NextResponse.json({ error: 'Falha ao publicar post no Instagram', details: publishData }, { status: 500 });
  } catch (err: any) {
    console.error('[Vercel Cron Error]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
