export const crearCurso = async (prisma) => {
  const nuevoCurso = await prisma.curso.create({
    data: {
      nombre: "Curso Github principiante",
    },
  });
  console.log("Se inscribio el siguiente Curso:", nuevoCurso);
};

export const obtenerCursos = async (prisma) => {
  const cursosEncontrados = await prisma.curso.findMany();
  console.log("Cursos encontrados:");
  console.table(cursosEncontrados);
};
