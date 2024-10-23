// Ruta: /api/users
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Ajusta según tu estructura de archivos

const prisma = new PrismaClient();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

export async function POST(req: NextRequest) {
  const { name, email, role, avatar } = await req.json();
  try {
    const user = await prisma.users.create({
      data: { name, email, role, avatar },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Error creating user- ${error}` }, { status: 500 });
  }
}

export async function GET() {
    try {
      const users = await prisma.users.findMany();
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: `Error fetching users ${error}` }, { status: 500 });
    }
  }