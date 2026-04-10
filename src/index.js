// npm init -y
// git init
// npm install prisma -D
// npm install dotenv -D
// npm install @prisma/client
// npm install @prisma/adapter-pg
// npm install pg

// Ya despues de eso podemos usar npx prisma init para empezar a configurar nuestro proyecto,
// esto nos va a crear una carpeta llamada prisma con un archivo schema.prisma y un .env en la raiz del proyecto

// npx prisma generate - crea carpeta generated

// En https://www.prisma.io/docs/prisma-orm/quickstart/postgresql encontramos el codigo inicial para inicializar el prisma Client

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const connectionString = `${process.env.DATABASE_URL}`; // Nuesta conexion con la base de datos

const adapter = new PrismaPg({ connectionString }); // PrismaPg es el adaptador de prisma para poder conectarnos con la BD
const prisma = new PrismaClient({ adapter }); // pasamos la config a nuestro prismaClient

async function main() {
  console.log("Conexion Exitosa, el adaptador PG esta funcionando");
}

// invocamos el main y si algo falla el catch
main()
  .catch((e) => {
    console.error("ocurrio un error:", e); // mensaje de error
    process.exit(1); // nuestro codigo de error
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Conexion Cerrada");
  }); // de esta forma cerramos el programa y nos desconectamos
