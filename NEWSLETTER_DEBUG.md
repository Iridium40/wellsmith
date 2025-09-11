# Newsletter Debug Guide

## Issue Analysis
The error shows:
- `405 Method Not Allowed` - API endpoint not responding correctly
- `r is not a function` - JavaScript error in frontend
- `Unexpected end of JSON input` - Response parsing issue

## Debugging Steps Applied

### 1. Server-Side Debugging
Added logging to newsletter handler:
```typescript
console.log("Newsletter subscription request received:", {
  method: req.method,
  body: req.body,
  headers: req.headers,
});
```

### 2. Client-Side Debugging
Added logging to NewsletterSignup component:
```typescript
console.log("Making newsletter subscription request...");
console.log("Response status:", response.status);
console.log("Response headers:", response.headers);
```

### 3. CORS Configuration
Updated CORS settings:
```typescript
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
}));
```

### 4. Email Address Update
Updated Resend sender email:
```typescript
from: "Kayce Smith <kayce@smithhelthwellness.com>"
```

## Testing Commands

### Test API Endpoint Directly
```bash
curl -X POST http://localhost:8080/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Expected Response
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "contactId": "hubspot_contact_id"
}
```

## Troubleshooting Steps

### 1. Check Browser Console
- Open browser dev tools
- Look for console logs from newsletter component
- Check for CORS errors
- Verify request/response details

### 2. Check Server Logs
- Look for newsletter subscription request logs
- Verify HubSpot and Resend API calls
- Check for validation errors

### 3. Environment Variables
Ensure these are set:
```bash
HUBSPOT_PRIVATE_APP_TOKEN=***REMOVED-HUBSPOT-TOKEN***
HUBSPOT_PRIVATE_CLIENT_SECRET=***REMOVED-AUDIENCE-ID***
RESEND_API_KEY=***REMOVED-RESEND-KEY***
```

### 4. Network Tab
- Check if request is being made
- Verify request method (POST)
- Check request headers
- Verify response status and body

## Common Issues & Solutions

### Issue: 405 Method Not Allowed
**Cause**: API route not registered or wrong HTTP method
**Solution**: Verify route registration in server/index.ts

### Issue: CORS Error
**Cause**: Cross-origin request blocked
**Solution**: CORS configuration updated

### Issue: JSON Parse Error
**Cause**: Server returning non-JSON response
**Solution**: Check server error handling

### Issue: "r is not a function"
**Cause**: JavaScript bundling issue
**Solution**: Rebuild application

## Next Steps
1. Deploy with debugging enabled
2. Test newsletter signup on live site
3. Check browser console for logs
4. Verify HubSpot contact creation
5. Confirm welcome email delivery

The debugging logs will help identify the exact issue! 🔍
