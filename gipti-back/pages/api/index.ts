import { NextApiRequest, NextApiResponse } from 'next';
import { swaggerUi, specs } from '../../swagger';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
}

export const config = {
  api: {
    bodyParser: false,
  },
};