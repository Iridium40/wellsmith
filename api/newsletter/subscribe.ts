import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Newsletter API handler called:', {
      method: req.method,
      body: req.body,
      headers: req.headers,
    });

    // Check environment variables
    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    const resendKey = process.env.RESEND_API_KEY;

    if (!hubspotToken || !resendKey) {
      console.error('Missing environment variables:', {
        hasHubspotToken: !!hubspotToken,
        hasResendKey: !!resendKey,
      });
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
        details: 'Missing required environment variables'
      });
    }

    // For now, return a simple success response to test the API routing
    res.json({
      success: true,
      message: 'Newsletter API is working',
      method: req.method,
      timestamp: new Date().toISOString(),
      env: {
        hasHubspotToken: !!hubspotToken,
        hasResendKey: !!resendKey,
      }
    });

  } catch (error) {
    console.error('Newsletter API handler error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
