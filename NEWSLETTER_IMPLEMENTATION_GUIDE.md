# Newsletter Subscription Implementation Guide

## Overview
This guide contains everything needed to implement a newsletter subscription feature on a separate website using the same Resend and HubSpot accounts as the WellSmith website.

## API Endpoint
**URL**: `https://www.wellsmith.com/api/newsletter/subscribe`  
**Method**: `POST`  
**Content-Type**: `application/json`

## Request Format
```json
{
  "email": "user@example.com"
}
```

## Response Format

### Success Response (200)
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "hubspot": {
    "success": true,
    "contactId": "12345"
  },
  "resend": {
    "success": true
  }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Frontend Implementation

### HTML Form
```html
<form id="newsletter-form">
  <input type="email" id="email" placeholder="Enter your email" required>
  <button type="submit">Subscribe</button>
</form>
<div id="message"></div>
```

### JavaScript Implementation
```javascript
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const messageDiv = document.getElementById('message');
  const button = e.target.querySelector('button');
  
  // Show loading state
  button.disabled = true;
  button.textContent = 'Subscribing...';
  messageDiv.innerHTML = '';
  
  try {
    const response = await fetch('https://www.wellsmith.com/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.trim() }),
    });

    // Always get response text first to avoid parsing issues
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      console.error('HTTP error response:', responseText);
      throw new Error(`Server error (${response.status}): Please try again later`);
    }

    // Try to parse as JSON, but handle failures gracefully
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed response data:', data);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.log('Response was not valid JSON:', responseText);
      throw new Error('Server response error - please try again');
    }

    // Check if we got a valid success response
    if (data && typeof data === 'object' && data.success === true) {
      messageDiv.innerHTML = '<div style="color: green;">Successfully subscribed! Check your email for a welcome message.</div>';
      document.getElementById('email').value = '';
    } else {
      const errorMessage = data?.error || data?.message || 'Subscription failed';
      console.error('Subscription failed:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    messageDiv.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
  } finally {
    button.disabled = false;
    button.textContent = 'Subscribe';
  }
});
```

### React Implementation
```jsx
import { useState } from 'react';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('https://www.wellsmith.com/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Server error (${response.status}): Please try again later`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Server response error - please try again');
      }

      if (data && typeof data === 'object' && data.success === true) {
        setMessage('Successfully subscribed! Check your email for a welcome message.');
        setMessageType('success');
        setEmail('');
      } else {
        throw new Error(data?.error || data?.message || 'Subscription failed');
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        disabled={isLoading}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && (
        <div style={{ color: messageType === 'success' ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </form>
  );
}
```

## Backend Integration Details

### HubSpot Integration
- **Account**: Uses existing WellSmith HubSpot account
- **Properties Set**:
  - `email`: User's email address
  - `hs_analytics_source`: "wellsmith"
  - `hs_email_optout`: false
  - `lifecyclestage`: "subscriber"
  - `hs_analytics_source_data_1`: "newsletter_signup"
  - `createdate`: Current timestamp
- **Behavior**: Creates new contact or updates existing contact

### Resend Integration
- **Account**: Uses existing WellSmith Resend account
- **Sender**: `kayce@smithhealthwellness.com` (verified domain)
- **Welcome Email**: Professional HTML template with WellSmith logo
- **Subject**: "Welcome to WellSmith! 🎉"

## Email Template Features
- **Logo**: WellSmith logo image at the top
- **Branding**: Professional design with brand colors (#00C0C0)
- **Content**: Welcome message and newsletter benefits
- **Signature**: Kayce Smith credentials
- **Footer**: Unsubscribe information and links

## Error Handling
The API handles various error scenarios:
- Invalid email format
- Missing environment variables
- HubSpot API failures
- Resend API failures
- Network errors

## Success Criteria
- **Primary**: User receives welcome email (Resend success)
- **Secondary**: Contact created in HubSpot (optional)
- **User Experience**: Clear success/error messages

## CORS Configuration
The API is configured to accept requests from any origin:
```javascript
cors({
  origin: true, // Allow all origins
  credentials: true,
})
```

## Testing
Test the integration with:
```bash
curl -X POST https://www.wellsmith.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Security Considerations
- Email validation on both frontend and backend
- Rate limiting (implemented by Vercel)
- No sensitive data exposure in error messages
- HTTPS required for all requests

## Monitoring
- Check Vercel function logs for API issues
- Monitor HubSpot for contact creation
- Monitor Resend dashboard for email delivery
- Frontend console logs for debugging

## Support
For issues or questions about this implementation, refer to the WellSmith development team or check the Vercel function logs for detailed error information.
