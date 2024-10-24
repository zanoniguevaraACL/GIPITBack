
import { swaggerUi, swaggerSpec } from '../../lib/swagger'; 
import { NextResponse } from 'next/server';

// Servimos el archivo JSON de la especificación
export async function GET() {
  return NextResponse.json(swaggerSpec);
}

// Servimos la interfaz visual de Swagger UI
export const handler = swaggerUi.setup(swaggerSpec);
