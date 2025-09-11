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

    // Import and use the actual newsletter handler
    const { handleNewsletterSubscribe } = await import('../../server/routes/newsletter');
    
    // Convert Vercel request/response to Express format
    const expressReq = {
      method: req.method,
      body: req.body,
      headers: req.headers,
    } as any;

    const expressRes = {
      json: (data: any) => {
        console.log('Sending JSON response:', data);
        return res.json(data);
      },
      status: (code: number) => ({
        json: (data: any) => {
          console.log(`Sending ${code} JSON response:`, data);
          return res.status(code).json(data);
        },
        send: (data: any) => {
          console.log(`Sending ${code} response:`, data);
          return res.status(code).send(data);
        },
      }),
      send: (data: any) => {
        console.log('Sending response:', data);
        return res.send(data);
      },
    } as any;

    await handleNewsletterSubscribe(expressReq, expressRes);

  } catch (error) {
    console.error('Newsletter API handler error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
