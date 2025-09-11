# Vercel Module Import Fix

## Problem Identified
The error message revealed the exact issue:
```
"Cannot find module '/var/task/server/routes/newsletter' imported from /var/task/api/newsletter/subscribe.js"
```

## Root Cause
Vercel serverless functions can't import from the `server/` directory because:
- The `server/` directory is not included in the Vercel deployment
- Serverless functions run in isolation with only the `api/` directory available
- Dynamic imports from outside the function directory fail

## Solution Applied

### 1. **Self-Contained API Handler**
Created a complete, self-contained newsletter API handler in `api/newsletter/subscribe.ts` that includes:
- ✅ Email validation using Zod
- ✅ HubSpot integration (search, create, update contacts)
- ✅ Resend integration (welcome email sending)
- ✅ Proper error handling and logging

### 2. **No External Dependencies**
- ✅ Removed import from `../../server/routes/newsletter`
- ✅ Included all necessary code directly in the API handler
- ✅ Uses only standard Node.js APIs and external services

### 3. **Complete Functionality**
The API handler now includes:

#### **Email Validation**
```typescript
const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});
```

#### **HubSpot Integration**
- Search for existing contacts
- Update existing contacts with newsletter properties
- Create new contacts with proper properties
- Error handling for all HubSpot operations

#### **Resend Integration**
- Send welcome email with HTML template
- Proper error handling
- Professional email design

#### **Response Handling**
- Success response when both HubSpot and Resend work
- Partial failure response when one service fails
- Detailed error logging for debugging

## Key Features

### 1. **Environment Variable Validation**
```typescript
if (!hubspotToken || !resendKey) {
  return res.status(500).json({
    success: false,
    error: 'Server configuration error',
    details: 'Missing required environment variables'
  });
}
```

### 2. **Request Validation**
```typescript
if (req.method !== 'POST') {
  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
    details: 'Only POST requests are supported'
  });
}
```

### 3. **Comprehensive Error Handling**
- Network errors
- API errors
- Validation errors
- Configuration errors

## Expected Behavior

### **Success Case**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "hubspot": { "success": true, "contactId": "12345" },
  "resend": { "success": true }
}
```

### **Partial Failure Case**
```json
{
  "success": false,
  "error": "Newsletter subscription partial failure",
  "details": {
    "hubspot": { "success": true, "contactId": "12345" },
    "resend": { "success": false, "error": "API error" }
  }
}
```

### **Complete Failure Case**
```json
{
  "success": false,
  "error": "Internal server error",
  "details": "Specific error message"
}
```

## Files Modified
- `api/newsletter/subscribe.ts` - Complete rewrite with self-contained functionality

## Next Steps
1. **Deploy Changes** - Push to trigger Vercel deployment
2. **Test Newsletter** - Try subscribing with a test email
3. **Verify Integration** - Check HubSpot and Resend for successful operations
4. **Monitor Logs** - Check Vercel function logs for any remaining issues

## Benefits
- ✅ No more module import errors
- ✅ Self-contained serverless function
- ✅ Complete HubSpot and Resend integration
- ✅ Proper error handling and logging
- ✅ Professional welcome email template

The newsletter subscription should now work end-to-end without any module import issues! 🎯
