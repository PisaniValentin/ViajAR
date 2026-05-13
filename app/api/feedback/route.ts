import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contacto, comentario } = body;

    if (!contacto || !comentario) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    // Iniciamos la conexión a la base de datos usando la variable de entorno
    // El "!" le dice a TypeScript que estamos seguros de que la variable existe
    const sql = neon(process.env.DATABASE_URL!);

    // Asegurarnos de que la tabla existe
    await sql`
      CREATE TABLE IF NOT EXISTS feedbacks (
        id SERIAL PRIMARY KEY,
        contacto VARCHAR(255) NOT NULL,
        comentario TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insertar el nuevo feedback
    await sql`
      INSERT INTO feedbacks (contacto, comentario) 
      VALUES (${contacto}, ${comentario});
    `;

    return NextResponse.json(
      { message: "Feedback guardado con éxito" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al guardar feedback:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
