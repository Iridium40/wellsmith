import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Test API called:', {
      method: req.method,
      body: req.body,
      headers: req.headers,
    });

    res.json({
      success: true,
      message: 'Test API working',
      method: req.method,
      timestamp: new Date().toISOString(),
      env: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        hasResendAudience: !!process.env.RESEND_AUDIENCE_ID,
      }
    });
  } catch (error) {
    console.error('Test API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
