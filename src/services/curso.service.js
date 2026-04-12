export const crearCurso = async (prisma) => {
  const nuevoCurso = await prisma.curso.create({
    data: {
      nombre: "Curso typeScript",
    },
  });
  console.log("Se inscribio el siguiente Curso:", nuevoCurso);
};

export const crearCursos = async (prisma) => {
  const cursosData = await prisma.curso.createMany({
    data: [
      { nombre: "Curso typeScript" },
      { nombre: "Curso JavaScript" },
      { nombre: "Curso Node.js" },
      { nombre: "Curso SQL" },
      { nombre: "Curso Prisma avanzado" },
      { nombre: "Curso Github principiante" },
      { nombre: "Curso Ingles" },
    ],
  });
  console.log("Cursos creados:", cursosData);
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

// Obtener los datos completos de los cursos, incluyendo el profesor asignado y los alumnos inscritos

export const datosCursoCompleto = async (prisma, nombreCurso) => {
  const datosCurso = await prisma.curso.findUnique({
    // findUnique para encontrar un curso especifico por nombre
    where: { nombre: nombreCurso },
    include: {
      profesor: true, // incluir los datos del profesor asignado al curso
      alumnos: {
        select: { // include trae relaciones completas. Entonces elejimos select permite elegir campos escalares de la relación (nombre, apellido) dentro de alumnos.
          nombre: true,
          apellido: true,
        },
      },
    },
  });

  // console.log("Datos completos del curso:", datosCurso);

  if (!datosCurso) {
    console.log(`No se encontró un curso con el nombre "${nombreCurso}"`);
    return;
  }

  console.log(`Curso: ${nombreCurso}`);
  console.log(
    `Profesor: ${datosCurso.profesor ? datosCurso.profesor.nombre + " " + datosCurso.profesor.apellido : "No asignado"}`,
  );
  console.log("Alumnos inscritos:");
  console.table(datosCurso.alumnos);
};
