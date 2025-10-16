import { NextResponse } from 'next/server';

// Endpoint de prueba para verificar webhooks
export async function POST(req: Request) {
  const body = await req.json();

  console.log('🔍 [DEBUG] Webhook test received:', {
    timestamp: new Date().toISOString(),
    headers: Object.fromEntries(req.headers.entries()),
    body: body,
  });

  return NextResponse.json({
    success: true,
    message: 'Webhook test received',
    timestamp: new Date().toISOString()
  });
}

export async function GET(req: Request) {
  return NextResponse.json({
    message: 'Webhook test endpoint is working',
    timestamp: new Date().toISOString()
  });
}
