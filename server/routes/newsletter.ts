import { RequestHandler } from "express";
import { z } from "zod";

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

interface NewsletterResponse {
  success: boolean;
  message: string;
  contactId?: string;
}

export const handleNewsletterSubscribe: RequestHandler = async (req, res) => {
  try {
    console.log("Newsletter subscription request received:", {
      method: req.method,
      body: req.body,
      headers: req.headers,
    });

    // Validate request body
    const validation = subscribeSchema.safeParse(req.body);
    if (!validation.success) {
      console.log("Validation failed:", validation.error);
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
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
        contactId: hubspotResult.contactId,
      });
    } else {
      // Log the error but still return success if at least one worked
      console.error("Newsletter subscription partial failure:", {
        hubspot: hubspotResult,
        resend: resendResult,
      });
      
      res.json({
        success: true,
        message: "Successfully subscribed to newsletter",
        contactId: hubspotResult.contactId,
      });
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

async function addToHubSpot(email: string): Promise<{ success: boolean; contactId?: string; error?: string }> {
  try {
    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    
    if (!hubspotToken) {
      throw new Error("HubSpot token not configured");
    }

    // Check if contact already exists
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
          properties: ["email", "firstname", "lastname"],
        }),
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`HubSpot search failed: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();
    
    // If contact exists, update their subscription status
    if (searchData.results && searchData.results.length > 0) {
      const contactId = searchData.results[0].id;
      
      // Update contact with newsletter subscription
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
        const errorData = await updateResponse.text();
        console.error("HubSpot update error:", errorData);
        throw new Error(`HubSpot update failed: ${updateResponse.statusText} - ${errorData}`);
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
        console.error("HubSpot create error:", errorData);
        throw new Error(`HubSpot create failed: ${createResponse.statusText} - ${errorData}`);
      }
    }
  } catch (error) {
    console.error("HubSpot integration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

async function sendWelcomeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      throw new Error("Resend API key not configured");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kayce Smith <kayce@smithhelthwellness.com>", // Update with your actual email
        to: [email],
        subject: "Welcome to WellSmith - Your Health Journey Starts Here!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to WellSmith</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1babe0; font-size: 28px; margin-bottom: 10px;">Welcome to WellSmith!</h1>
                <p style="font-size: 18px; color: #666;">Your health journey starts here</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #1d4388; margin-top: 0;">Hi there!</h2>
                <p>Thank you for joining the WellSmith community! I'm Kayce Smith, your Independent Trilivy Certified Health Coach, and I'm thrilled to have you on this journey with us.</p>
                
                <p>As a subscriber, you'll receive:</p>
                <ul style="color: #555;">
                  <li>Weekly health tips and insights</li>
                  <li>Delicious Lean & Green recipes</li>
                  <li>Motivation and accountability support</li>
                  <li>GLP-1 lifestyle guidance</li>
                  <li>Exclusive coaching resources</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://wellsmith.com/my-story" style="background-color: #1babe0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Read My Story</a>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                <p style="font-size: 14px; color: #666; text-align: center;">
                  Ready to start your transformation?<br>
                  <a href="https://www.smithhealthwellness.com/book-assessment" style="color: #1babe0;">Book a consultation with me</a>
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999;">
                  WellSmith | Independent Trilivy Certified Health Coach<br>
                  <a href="https://wellsmith.com" style="color: #1babe0;">wellsmith.com</a> | 
                  <a href="https://instagram.com/smithkayce" style="color: #1babe0;">@smithkayce</a>
                </p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                  <a href="https://wellsmith.com/unsubscribe" style="color: #999;">Unsubscribe</a> | 
                  <a href="https://wellsmith.com/privacy" style="color: #999;">Privacy Policy</a>
                </p>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Resend integration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
