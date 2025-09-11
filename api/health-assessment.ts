import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleHealthAssessment } from '../server/routes/health-assessment';

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

  await handleHealthAssessment(expressReq, expressRes);
}
