import type { VercelRequest, VercelResponse } from '@vercel/node';

/*
 * Inlined rather than importing handleDemo from server/routes/demo.ts.
 *
 * The original import died at runtime with ERR_MODULE_NOT_FOUND. The cause was
 * the specifier, not the bundling: this package is "type": "module", so Node
 * resolves relative imports literally and an extensionless one never resolves.
 * Cross-directory imports work fine when they carry the .js extension that the
 * TypeScript compiles to — see api/newsletter/subscribe.ts.
 *
 * For a one-line handler the copy is simpler than the import; that is now a
 * choice rather than a constraint.
 */
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: 'Hello from Express server' });
}
