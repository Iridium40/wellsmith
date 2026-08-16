import type { VercelRequest, VercelResponse } from '@vercel/node';

/*
 * Self-contained on purpose: Vercel does not bundle sources from outside
 * api/, so importing handleDemo from server/routes/demo.ts failed to resolve
 * at runtime and the function died with ERR_MODULE_NOT_FOUND.
 */
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: 'Hello from Express server' });
}
