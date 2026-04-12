// Inscribir a un alumno a un curso
export const inscribirAlumno = async (prisma) => {
  const inscripcion = await prisma.alumno.update({
    where: { email: "jose@gmail.com" },
    data: {
      cursos: {
        connect: [
          { nombre: "Curso Prisma avanzado" },
          { nombre: "Curso Github principiante" },
          { nombre: "Curso typeScript" },
          { nombre: "Curso Ingles" },
          { nombre: "Curso javaScript" },
          { nombre: "Curso SQL" },
        ],
      },
    },
  });

  // La Data sera un objeto que tendra nuestros cursos y haremos la conexion con "Connect"
  console.log(inscripcion);
};

// Funcion que se encarga de darme todos los datos de los alumnos inscriptos

export const alumnosEnCurso = async (prisma) => {
  const alumnosData = await prisma.alumno.findMany({
    where: {
      cursos: {
        some: {}, // Estamos indicando que cursos tenga almenos 1 curso inscripto | con some estamos diciendo que almenos exista un curso en el alumno que estemos seleccionando
      },
    },
    include: {
      cursos: true, // estamos indicando que incluya en los resultados los datos del curso al que esta inscripto, en este caso la respuesta sera cursos: [ [Object], [Object] ]
    },
    orderBy: {
      id: "asc", // ordenamos por id de forma ascendente
    },
  });
  console.log("Alumnos inscritos en al menos un curso:");
  console.dir(alumnosData, { depth: null }); // con esto desglosariamos los objetos para ver los cursos
};
