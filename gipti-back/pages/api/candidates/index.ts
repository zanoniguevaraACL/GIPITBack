import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/candidates:
 *   get:
 *     summary: Retrieve a list of candidates
 *     description: Retrieve a list of candidates from the database.
 *     responses:
 *       200:
 *         description: A list of candidates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 *   post:
 *     summary: Create a new candidate
 *     description: Create a new candidate in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: The created candidate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 */

/**
 * @swagger
 * /api/candidates/{id}:
 *   get:
 *     summary: Retrieve a single candidate
 *     description: Retrieve a single candidate by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The candidate ID
 *     responses:
 *       200:
 *         description: A single candidate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *   put:
 *     summary: Update a candidate
 *     description: Update a candidate by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       200:
 *         description: The updated candidate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *   delete:
 *     summary: Delete a candidate
 *     description: Delete a candidate by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The candidate ID
 *     responses:
 *       204:
 *         description: No content.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const candidates = await prisma.candidate.findMany();
      res.status(200).json(candidates);
      break;
    case 'POST':
      const { name, phone, email, address } = req.body;
      const newCandidate = await prisma.candidate.create({
        data: { name, phone, email, address },
      });
      res.status(201).json(newCandidate);
      break;
    case 'GET': // Retrieve single candidate
      const { id } = req.query;
      const candidate = await prisma.candidate.findUnique({
        where: { id: Number(id) },
      });
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      res.status(200).json(candidate);
      break;
    case 'PUT':
      const updateId = Number(req.query.id);
      const updateData = req.body;
      const updatedCandidate = await prisma.candidate.update({
        where: { id: updateId },
        data: updateData,
      });
      res.status(200).json(updatedCandidate);
      break;
    case 'DELETE':
      const deleteId = Number(req.query.id);
      await prisma.candidate.delete({
        where: { id: deleteId },
      });
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
    