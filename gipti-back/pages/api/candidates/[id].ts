import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {

    case 'GET':
      const candidate = await prisma.candidate.findUnique({
        where: { id: Number(id) },
      });
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      res.status(200).json(candidate);
      break;

    case 'PUT':
      const { name, phone, email, address } = req.body;
      const updatedCandidate = await prisma.candidate.update({
        where: { id: Number(id) },
        data: { name, phone, email, address },
      });
      res.status(200).json(updatedCandidate);
      break;


    case 'DELETE':
      await prisma.candidate.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
