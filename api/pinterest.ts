import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handlePinterest } from '../server/routes/pinterest';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request/response to Express format.
  // `query` matters: handlePinterest reads req.query.board, and omitting it
  // throws before the handler's own try/catch can respond.
  const expressReq = {
    method: req.method,
    body: req.body,
    headers: req.headers,
    query: req.query ?? {},
    params: {},
    url: req.url,
  } as any;

  const expressRes = {
    json: (data: any) => res.json(data),
    status: (code: number) => ({
      json: (data: any) => res.status(code).json(data),
      send: (data: any) => res.status(code).send(data),
    }),
    send: (data: any) => res.send(data),
    setHeader: (name: string, value: any) => res.setHeader(name, value),
  } as any;

  try {
    await handlePinterest(expressReq, expressRes);
  } catch (err: any) {
    // Never surface a raw FUNCTION_INVOCATION_FAILED: the client can render a
    // useful message from a JSON error, but not from a 500 HTML page.
    res.status(502).json({
      error: `Pinterest feed unavailable: ${err?.message || 'unknown error'}`,
    });
  }
}
