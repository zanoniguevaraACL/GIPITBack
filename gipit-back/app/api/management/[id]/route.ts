import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const management = await prisma.management.findUnique({
      where: { id: parseInt(id) },
    });

    if (!management) {
      return NextResponse.json({ error: 'Compañía no encontrada' }, { status: 404 });
    }

    return NextResponse.json(management);
  } catch (error) {
    return NextResponse.json({ error: `Error obteniendo la compañía - ${error}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { company_id,name, description } = await req.json();
    
    try {
      const updatedmanagement = await prisma.management.update({
        where: { id: parseInt(id) },
        data: { company_id, name, description },
      });
  
      return NextResponse.json(updatedmanagement);
    } catch (error) {
      return NextResponse.json({ error: `Error actualizando la compañía - ${error}` }, { status: 500 });
    }
  }

  export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
      await prisma.management.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({ message: 'Compañía eliminada con éxito' });
    } catch (error) {
      return NextResponse.json({ error: `Error eliminando la compañía- ${error}` }, { status: 500 });
    }
  }