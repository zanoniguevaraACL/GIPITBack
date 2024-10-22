import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Obtener todas las jefaturas (GET)
export async function GET() {
  try {
    const managements = await prisma.management.findMany();
    return NextResponse.json(managements);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching managements' }, { status: 500 });
  }
}

// Crear una nueva jefatura (POST)
export async function POST(req: NextRequest) {
  const { company_id, name, description } = await req.json();
  try {
    const management = await prisma.management.create({
      data: { company_id, name, description },
    });
    return NextResponse.json(management, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating management' }, { status: 500 });
  }
}

// Actualizar una jefatura (PUT)
export async function PUT(req: NextRequest) {
  const { id, name, description } = await req.json();
  try {
    const management = await prisma.management.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });
    return NextResponse.json(management);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating management' }, { status: 500 });
  }
}

// Eliminar una jefatura (DELETE)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await prisma.management.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Management deleted' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting management' }, { status: 500 });
  }
}
