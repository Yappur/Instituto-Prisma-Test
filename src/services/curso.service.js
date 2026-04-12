export const crearCurso = async (prisma) => {
  const nuevoCurso = await prisma.curso.create({
    data: {
      nombre: "Curso typeScript",
    },
  });
  console.log("Se inscribio el siguiente Curso:", nuevoCurso);
};

export const obtenerCursos = async (prisma) => {
  const cursosEncontrados = await prisma.curso.findMany();
  console.log("Cursos encontrados:");
  console.table(cursosEncontrados);
};

export const ActualizarNombreCurso = async (
  prisma,
  nombreAnterior,
  nuevoNombre,
) => {
  try {
    const cursoActualizado = await prisma.curso.update({
      // .update indica para actualizar un parametro

      where: { nombre: nombreAnterior },
      data: { nombre: nuevoNombre },
    });
    console.log("Nombre de curso actualizado", cursoActualizado);
  } catch (error) {
    if (error.code === "P2025") {
      console.error("Error: No se encontro un curso con este Nombre");
    } else {
      console.error("Ocurrio un error", error);
    }
  }
};

//Eliminar curso

export const eliminarCursoPorId = async (prisma, id) => {
  try {
    const cursoEliminado = await prisma.curso.delete({
      where: { id: id },
    });

    console.log("Curso eliminado:", cursoEliminado);
  } catch (error) {
    if (error.code === "P2025") {
      console.error("Error: No se encontró un curso con ese ID");
    } else {
      console.error("Ocurrió un error:", error);
    }
  }
};
