import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      const company = await prisma.company.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(company);
      break;
    case 'PUT':
      const { name, logo, description } = req.body;
      const updatedCompany = await prisma.company.update({
        where: { id: Number(id) },
        data: { name, logo, description },
      });
      res.status(200).json(updatedCompany);
      break;
    case 'DELETE':
      await prisma.company.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
