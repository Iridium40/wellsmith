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
    // Try to create contact directly first (simpler approach)
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
            hs_analytics_source: "EMAIL_MARKETING",
            lifecyclestage: "subscriber",
          },
        }),
      }
    );

    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log("HubSpot contact created successfully:", createData);
      return { success: true, contactId: createData.id };
    } else {
      const errorData = await createResponse.text();
      console.error("HubSpot create error:", errorData);
      
      // If contact already exists, try to update it
      if (createResponse.status === 409) {
        console.log("Contact already exists, attempting to update...");
        
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

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.results && searchData.results.length > 0) {
            const contactId = searchData.results[0].id;
            console.log("Found existing contact, updating:", contactId);
            
            // Update existing contact with minimal properties
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
                    hs_analytics_source: "EMAIL_MARKETING",
                    lifecyclestage: "subscriber",
                  },
                }),
              }
            );

            if (updateResponse.ok) {
              console.log("HubSpot contact updated successfully");
              return { success: true, contactId };
            } else {
              const updateErrorData = await updateResponse.text();
              console.error("HubSpot update error:", updateErrorData);
              throw new Error(`HubSpot update failed: ${updateResponse.statusText} - ${updateErrorData}`);
            }
          }
        }
      }
      
      throw new Error(`HubSpot create failed: ${createResponse.statusText} - ${errorData}`);
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
        from: "WellSmith <kayce@smithhealthwellness.com>",
        to: [email],
        subject: "Welcome to WellSmith! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://wellsmith.com/logo.png" alt="WellSmith" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
            </div>
            
            <!-- Welcome Content -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00C0C0; font-size: 32px; margin-bottom: 20px; font-weight: 300;">Welcome!</h1>
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                Thank you for subscribing to our newsletter. You'll receive health tips, recipes, and coaching insights delivered to your inbox.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 30px;">
                We're excited to be part of your wellness journey!
              </p>
            </div>
            
            <!-- Signature -->
            <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
              <p style="font-size: 16px; color: #333; margin: 0;">
                Best regards,<br>
                <strong style="color: #00C0C0;">Kayce Smith</strong><br>
                <em style="color: #666;">Independent OPTAVIA Certified Health Coach</em>
              </p>
            </div>
            
            <!-- Footer -->
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            <div style="text-align: center;">
              <p style="font-size: 12px; color: #666; margin: 0;">
                You can unsubscribe at any time by clicking the link in our emails or contacting us directly.
              </p>
              <p style="font-size: 12px; color: #666; margin: 10px 0 0 0;">
                <a href="https://wellsmith.com" style="color: #00C0C0; text-decoration: none;">wellsmith.com</a> | 
                <a href="https://wellsmith.com/privacy" style="color: #00C0C0; text-decoration: none;">Privacy Policy</a>
              </p>
            </div>
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

    // Consider it successful if Resend works (user gets welcome email)
    // HubSpot is nice to have but not critical for the user experience
    if (resendResult.success) {
      res.json({
        success: true,
        message: "Successfully subscribed to newsletter",
        hubspot: hubspotResult,
        resend: resendResult,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Newsletter subscription failed",
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
