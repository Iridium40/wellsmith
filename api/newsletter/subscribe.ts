import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Email validation schema
const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// HubSpot integration
async function addToHubSpot(email: string) {
  const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  
  if (!hubspotToken) {
    throw new Error('HubSpot token not configured');
  }

  try {
    // Search for existing contact
    const searchResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: "EQ",
                  value: email,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`HubSpot search failed: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();

    if (searchData.results && searchData.results.length > 0) {
      // Update existing contact
      const contactId = searchData.results[0].id;
      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${hubspotToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            properties: {
              hs_analytics_source: "wellsmith",
              hs_email_optout: "false",
              lifecyclestage: "subscriber",
              hs_analytics_source_data_1: "newsletter_signup",
            },
          }),
        }
      );

      if (updateResponse.ok) {
        return { success: true, contactId };
      } else {
        throw new Error(`HubSpot update failed: ${updateResponse.statusText}`);
      }
    } else {
      // Create new contact
      const createResponse = await fetch(
        "https://api.hubapi.com/crm/v3/objects/contacts",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${hubspotToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            properties: {
              email: email,
              hs_analytics_source: "wellsmith",
              hs_email_optout: "false",
              lifecyclestage: "subscriber",
              hs_analytics_source_data_1: "newsletter_signup",
              createdate: new Date().toISOString(),
            },
          }),
        }
      );

      if (createResponse.ok) {
        const createData = await createResponse.json();
        return { success: true, contactId: createData.id };
      } else {
        const errorData = await createResponse.text();
        throw new Error(`HubSpot create failed: ${createResponse.statusText} - ${errorData}`);
      }
    }
  } catch (error) {
    console.error("HubSpot integration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Resend integration
async function sendWelcomeEmail(email: string) {
  const resendKey = process.env.RESEND_API_KEY;
  
  if (!resendKey) {
    throw new Error('Resend API key not configured');
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "kayce@smithhelthwellness.com",
        to: [email],
        subject: "Welcome to WellSmith! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Welcome to WellSmith!</h1>
            <p>Thank you for subscribing to our newsletter. You'll receive health tips, recipes, and coaching insights delivered to your inbox.</p>
            <p>We're excited to be part of your wellness journey!</p>
            <p>Best regards,<br>Kayce Smith<br>Independent OPTAVIA Certified Health Coach</p>
            <hr>
            <p style="font-size: 12px; color: #666;">
              You can unsubscribe at any time by clicking the link in our emails or contacting us directly.
            </p>
          </div>
        `,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.text();
      throw new Error(`Resend failed: ${response.statusText} - ${errorData}`);
    }
  } catch (error) {
    console.error("Resend integration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

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

    // Validate request method
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
        details: 'Only POST requests are supported'
      });
    }

    // Validate request body
    const validation = emailSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: validation.error.errors[0]?.message || 'Invalid email address'
      });
    }

    const { email } = validation.data;

    // Add to HubSpot
    const hubspotResult = await addToHubSpot(email);
    console.log("HubSpot result:", hubspotResult);
    
    // Send welcome email via Resend
    const resendResult = await sendWelcomeEmail(email);
    console.log("Resend result:", resendResult);

    if (hubspotResult.success && resendResult.success) {
      res.json({
        success: true,
        message: "Successfully subscribed to newsletter",
        hubspot: hubspotResult,
        resend: resendResult,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Newsletter subscription partial failure",
        details: {
          hubspot: hubspotResult,
          resend: resendResult,
        },
      });
    }

  } catch (error) {
    console.error('Newsletter API handler error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
