import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const company = await prisma.company.findUnique({
      where: { id: parseInt(id) },
    });

    if (!company) {
      return NextResponse.json({ error: 'Compañía no encontrada' }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo la compañía' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name, logo, description } = await req.json();
    
    try {
      const updatedCompany = await prisma.company.update({
        where: { id: parseInt(id) },
        data: { name, logo, description },
      });
  
      return NextResponse.json(updatedCompany);
    } catch (error) {
      return NextResponse.json({ error: 'Error actualizando la compañía' }, { status: 500 });
    }
  }

  export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
      await prisma.company.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({ message: 'Compañía eliminada con éxito' });
    } catch (error) {
      return NextResponse.json({ error: 'Error eliminando la compañía' }, { status: 500 });
    }
  }