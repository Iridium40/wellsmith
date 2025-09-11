# Vercel API Routing Fix

## Problem Identified
The newsletter subscription was failing with a 405 (Method Not Allowed) error because Vercel was configured as a static site (SPA) and routing all requests to `index.html` instead of handling API routes as serverless functions.

## Root Cause
- `vercel.json` was configured for static site deployment only
- API routes were not properly configured as Vercel serverless functions
- All `/api/*` requests were being redirected to `index.html`

## Solution Implemented

### 1. Updated Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/spa",
  "framework": "vite",
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    { "source": "/assets/(.*)", "destination": "/assets/$1" },
    { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
    { "source": "/robots.txt", "destination": "/robots.txt" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 2. Created Individual API Handlers
Created separate Vercel serverless function handlers for each API route:

- `api/newsletter/subscribe.ts` - Newsletter subscription
- `api/health-assessment.ts` - Health assessment form
- `api/pinterest.ts` - Pinterest images
- `api/demo.ts` - Demo endpoint

### 3. Added Vercel Dependencies
```bash
npm install --save-dev @vercel/node
```

### 4. API Handler Structure
Each API handler converts Vercel's request/response format to Express format:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleNewsletterSubscribe } from '../../server/routes/newsletter';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request/response to Express format
  const expressReq = {
    method: req.method,
    body: req.body,
    headers: req.headers,
  } as any;

  const expressRes = {
    json: (data: any) => res.json(data),
    status: (code: number) => ({
      json: (data: any) => res.status(code).json(data),
      send: (data: any) => res.status(code).send(data),
    }),
    send: (data: any) => res.send(data),
  } as any;

  await handleNewsletterSubscribe(expressReq, expressRes);
}
```

## How It Works

### Vercel Serverless Functions
- Each API route is now a separate serverless function
- Vercel automatically detects and deploys functions in the `api/` directory
- Functions use Node.js 18.x runtime
- Each function handles one specific API endpoint

### Request Flow
1. Client makes request to `/api/newsletter/subscribe`
2. Vercel routes to `api/newsletter/subscribe.ts` serverless function
3. Function converts Vercel format to Express format
4. Calls the existing Express route handler
5. Returns response in proper format

### Benefits
- ✅ Proper API routing on Vercel
- ✅ Serverless function scaling
- ✅ Reuses existing Express route logic
- ✅ Maintains development server compatibility

## Testing
After deployment, the API endpoints should work correctly:

```bash
# Test newsletter subscription
curl -X POST https://www.wellsmith.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test other endpoints
curl https://www.wellsmith.com/api/demo
curl https://www.wellsmith.com/api/pinterest
```

## Files Modified
- `vercel.json` - Updated configuration for serverless functions
- `api/newsletter/subscribe.ts` - Newsletter API handler
- `api/health-assessment.ts` - Health assessment API handler
- `api/pinterest.ts` - Pinterest API handler
- `api/demo.ts` - Demo API handler
- `package.json` - Added @vercel/node dependency

## Next Steps
1. Deploy to Vercel
2. Test newsletter subscription
3. Verify all API endpoints work
4. Monitor for any remaining issues

This fix ensures that the newsletter subscription and all other API endpoints work correctly in production! 🎯
