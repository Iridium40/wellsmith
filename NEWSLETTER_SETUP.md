# Newsletter Subscription Setup Guide

## Overview
The newsletter subscription feature is now fully integrated with HubSpot for contact management and Resend for email delivery. Users can subscribe from multiple locations on the website.

## Features Implemented

### 1. Newsletter Component (`NewsletterSignup.tsx`)
- ✅ **Multiple Variants**: Default, compact, and inline layouts
- ✅ **Form Validation**: Email validation with user feedback
- ✅ **Loading States**: Visual feedback during submission
- ✅ **Success States**: Confirmation message after subscription
- ✅ **Error Handling**: Graceful error handling with toast notifications

### 2. HubSpot Integration
- ✅ **Contact Creation**: New contacts added to HubSpot CRM
- ✅ **Duplicate Handling**: Updates existing contacts if email already exists
- ✅ **Custom Properties**: 
  - `email: [user_email]`
  - `hs_analytics_source: "wellsmith"`
  - `hs_email_optout: "false"`
  - `lifecyclestage: "subscriber"`
  - `hs_analytics_source_data_1: "newsletter_signup"`
  - `createdate: [ISO_timestamp]`

### 3. Resend Email Integration
- ✅ **Welcome Email**: Professional HTML email sent immediately
- ✅ **Branded Design**: Matches WellSmith branding
- ✅ **Call-to-Actions**: Links to story and booking pages
- ✅ **Unsubscribe Links**: Compliance with email best practices

### 4. API Endpoint (`/api/newsletter/subscribe`)
- ✅ **Validation**: Zod schema validation for email format
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **Dual Integration**: Both HubSpot and Resend integration
- ✅ **Graceful Degradation**: Works even if one service fails

## Environment Variables Required

Create a `.env` file in your project root with:

```bash
# HubSpot Integration
HUBSPOT_PRIVATE_APP_TOKEN=***REMOVED-HUBSPOT-TOKEN***
HUBSPOT_PRIVATE_CLIENT_SECRET=***REMOVED-AUDIENCE-ID***

# Resend Email Service
RESEND_API_KEY=***REMOVED-RESEND-KEY***

# Optional: Custom email sender
NEWSLETTER_FROM_EMAIL=kayce@smithhelthwellness.com
```

## Newsletter Locations

### 1. Homepage (`/`)
- **Location**: Bottom of page, full-width section
- **Variant**: Default (card layout)
- **Title**: "Stay Connected with Your Health Journey"
- **Description**: "Get weekly tips, recipes, and motivation delivered to your inbox."

### 2. Footer (All Pages)
- **Location**: Above copyright section
- **Variant**: Compact (inline form)
- **Title**: "Stay Updated"
- **Description**: "Get health tips and recipes delivered to your inbox."

## API Usage

### Subscribe Endpoint
```typescript
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Response
```typescript
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "contactId": "hubspot_contact_id"
}
```

## HubSpot Contact Properties

The integration automatically sets these properties:

- **email**: User's email address
- **hs_analytics_source**: `"wellsmith"` (tracks traffic source)
- **hs_email_optout**: `"false"` (ensures email marketing is enabled)
- **lifecyclestage**: `"subscriber"` (sets contact lifecycle stage)
- **hs_analytics_source_data_1**: `"newsletter_signup"` (tracks signup method)
- **createdate**: ISO timestamp (when contact was created)

## Welcome Email Content

The welcome email includes:
- ✅ **Professional HTML Design**: Branded with WellSmith colors
- ✅ **Personal Greeting**: From Kayce Smith
- ✅ **Value Proposition**: What subscribers will receive
- ✅ **Call-to-Actions**: Links to story and booking pages
- ✅ **Social Links**: Instagram and website links
- ✅ **Compliance**: Unsubscribe and privacy policy links

## Testing

### Local Testing
1. Set up environment variables
2. Run `npm run dev`
3. Navigate to homepage or any page
4. Test newsletter signup form
5. Check browser console for any errors
6. Verify email received

### Production Testing
1. Deploy with environment variables set in Vercel
2. Test newsletter signup on live site
3. Check HubSpot for new contacts
4. Verify welcome emails are sent

## Customization Options

### Newsletter Component Props
```typescript
interface NewsletterSignupProps {
  title?: string;           // Custom title
  description?: string;     // Custom description
  placeholder?: string;     // Email input placeholder
  buttonText?: string;      // Submit button text
  className?: string;       // Additional CSS classes
  variant?: "default" | "compact" | "inline"; // Layout variant
}
```

### Email Customization
Edit the HTML template in `server/routes/newsletter.ts`:
- Update sender email address
- Modify email content and styling
- Add/remove call-to-action links
- Update branding elements

## Monitoring & Analytics

### HubSpot Analytics
- Track subscription rates in HubSpot dashboard
- Monitor contact engagement
- Set up automated follow-up sequences

### Resend Analytics
- Monitor email delivery rates
- Track open and click rates
- Set up bounce handling

## Troubleshooting

### Common Issues
1. **Environment Variables**: Ensure all required variables are set
2. **API Keys**: Verify HubSpot and Resend API keys are valid
3. **Email Domain**: Update sender email domain in Resend
4. **CORS**: Ensure API endpoint is accessible from frontend

### Error Logging
Check server logs for:
- HubSpot API errors
- Resend API errors
- Validation errors
- Network connectivity issues

## Next Steps

### Potential Enhancements
1. **Email Templates**: Create multiple email templates for different user segments
2. **Segmentation**: Add interest categories (GLP-1, recipes, general wellness)
3. **Automation**: Set up HubSpot workflows for follow-up sequences
4. **Analytics**: Add conversion tracking for newsletter signups
5. **A/B Testing**: Test different signup form designs and copy

The newsletter subscription feature is now fully functional and ready for production use! 🎯
