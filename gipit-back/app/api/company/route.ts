
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Obtener todas las jefaturas (GET)
export async function GET() {
  try {
    const managements = await prisma.company.findMany();
    return NextResponse.json(managements);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching managements' }, { status: 500 });
  }
}

// Crear una nueva jefatura (POST)
export async function POST(req: NextRequest) {
  const { company_id, name, description } = await req.json();
  try {
    const company = await prisma.company.create({
      data: { name, description },
    });
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating company' }, { status: 500 });
  }
}
